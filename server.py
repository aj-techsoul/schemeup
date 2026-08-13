import http.server
import socketserver
import ssl
import json
import sqlite3
import os
from urllib.parse import urlparse, parse_qs

PORT = 8443
HTTP_PORT = int(os.environ.get('PORT', 8080))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'schemeup.db')

print(f"[SchemeUp Server] Serving from {BASE_DIR}")
print(f"[SchemeUp Server] SQLite DB Path: {DB_PATH}")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

class SchemeUpHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and PWA caching headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        query_params = parse_qs(parsed_path.query)

        # API: /api/schemes
        if path == '/api/schemes':
            self.handle_get_schemes(query_params)
            return
        
        # API: /api/user
        if path == '/api/user':
            self.handle_get_user()
            return

        # Default static file serving
        return super().do_GET()

    def do_POST(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length) if content_length > 0 else b'{}'
        
        try:
            body = json.loads(body_bytes.decode('utf-8'))
        except Exception:
            body = {}

        if path == '/api/user':
            self.handle_update_user(body)
            return

        if path == '/api/bookmarks':
            self.handle_toggle_bookmark(body)
            return

        if path == '/api/scrape':
            self.handle_trigger_scrape()
            return

        self.send_response(404)
        self.end_headers()

    def handle_get_schemes(self, params):
        query = params.get('q', [''])[0].strip()
        category = params.get('category', ['All'])[0]
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        user_row = cursor.execute("SELECT * FROM users WHERE id = 1").fetchone()
        user = dict(user_row) if user_row else {
            "id": 1, "name": "Beautifull Lino & Sweetypie Rosa", "occupation": "Student",
            "age": 24, "income_bracket": "Under 2.5 Lakhs", "category": "General"
        }

        sql = """
            SELECT s.*,
              (SELECT COUNT(*) FROM saved_schemes ss WHERE ss.scheme_id = s.id AND ss.user_id = ?) as is_saved
            FROM schemes s WHERE s.status = 'Active'
        """
        sql_params = [user['id']]

        if category != 'All':
            sql += " AND s.category = ?"
            sql_params.append(category)

        if query:
            sql += " AND (s.title LIKE ? OR s.description LIKE ? OR s.keywords LIKE ?)"
            pattern = f"%{query}%"
            sql_params.extend([pattern, pattern, pattern])

        sql += " ORDER BY s.id DESC"

        rows = cursor.execute(sql, sql_params).fetchall()

        results = []
        for r in rows:
            scheme = dict(r)
            score = 50
            
            occ_list = [o.strip() for o in scheme.get('eligibility_occupations', 'All').split(',')]
            if scheme['eligibility_occupations'] == 'All' or user['occupation'] in occ_list:
                score += 20
                
            if scheme['eligibility_min_age'] <= user['age'] <= scheme['eligibility_max_age']:
                score += 15
                
            inc_list = [i.strip() for i in scheme.get('eligibility_income', 'All').split(',')]
            if scheme['eligibility_income'] == 'All' or user['income_bracket'] in inc_list:
                score += 10
                
            cat_list = [c.strip() for c in scheme.get('eligibility_category', 'All').split(',')]
            if scheme['eligibility_category'] == 'All' or user['category'] in cat_list:
                score += 5

            scheme['match_score'] = min(99, max(40, score))
            results.append(scheme)

        if not query:
            results.sort(key=lambda x: x['match_score'], reverse=True)

        conn.close()

        response_data = {
            "success": True,
            "user": user,
            "schemes": results
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

    def handle_get_user(self):
        conn = get_db_connection()
        user_row = conn.execute("SELECT * FROM users WHERE id = 1").fetchone()
        conn.close()
        
        user = dict(user_row) if user_row else {}
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"success": True, "user": user}).encode('utf-8'))

    def handle_update_user(self, body):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE users SET
                name = ?, age = ?, occupation = ?, income_bracket = ?, category = ?, state = ?
            WHERE id = 1
        """, (
            body.get('name', 'Beautifull Lino & Sweetypie Rosa'),
            body.get('age', 24),
            body.get('occupation', 'Student'),
            body.get('income_bracket', 'Under 2.5 Lakhs'),
            body.get('category', 'General'),
            body.get('state', 'All India')
        ))
        conn.commit()
        updated = dict(cursor.execute("SELECT * FROM users WHERE id = 1").fetchone())
        conn.close()

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"success": True, "user": updated}).encode('utf-8'))

    def handle_toggle_bookmark(self, body):
        scheme_id = body.get('schemeId')
        conn = get_db_connection()
        cursor = conn.cursor()
        
        existing = cursor.execute("SELECT id FROM saved_schemes WHERE user_id = 1 AND scheme_id = ?", (scheme_id,)).fetchone()
        if existing:
            cursor.execute("DELETE FROM saved_schemes WHERE user_id = 1 AND scheme_id = ?", (scheme_id,))
            is_saved = False
        else:
            cursor.execute("INSERT INTO saved_schemes (user_id, scheme_id) VALUES (1, ?)", (scheme_id,))
            is_saved = True
            
        conn.commit()
        conn.close()

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"success": True, "isSaved": is_saved}).encode('utf-8'))

    def handle_trigger_scrape(self):
        from scraper.scraper import run_scraper
        result = run_scraper()
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"success": True, "result": result}).encode('utf-8'))

class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

def run():
    print(f"[SchemeUp Server] Starting HTTP server on http://localhost:{HTTP_PORT}...")
    handler = SchemeUpHandler
    with ThreadedHTTPServer(("", HTTP_PORT), handler) as httpd:
        print(f"[SchemeUp Server] Server running at http://localhost:{HTTP_PORT}/")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[SchemeUp Server] Server stopped.")

if __name__ == '__main__':
    run()
