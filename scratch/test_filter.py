import urllib.request
import json

base_url = "http://localhost:8080/api/schemes"

def test_query(category="All", q=""):
    url = f"{base_url}?category={category}&q={q}"
    req = urllib.request.urlopen(url)
    data = json.loads(req.read().decode('utf-8'))
    schemes = data.get('schemes', [])
    print(f"=== Filter [Category: '{category}', Query: '{q}'] ===")
    print(f"Total Results Returned: {len(schemes)}")
    for s in schemes:
        print(f" - [{s['category']}] ID {s['id']}: {s['title']} | Match: {s['match_score']}%")
    print()

if __name__ == "__main__":
    test_query(category="All", q="")
    test_query(category="Scholarships", q="")
    test_query(category="Jobs", q="")
    test_query(category="All", q="loan")
    test_query(category="Grants", q="")
