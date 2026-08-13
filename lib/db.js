import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'schemeup.db');
const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');

let db;

function getDb() {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    
    // Ensure tables exist
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      db.exec(schemaSql);
    }
  }
  return db;
}

export function getUserProfile(userId = 1) {
  const sqlite = getDb();
  let user = sqlite.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  if (!user) {
    user = {
      id: 1,
      name: 'Beautiful Rosa & Lino',
      email: 'user@schemeup.org',
      age: 24,
      gender: 'All',
      occupation: 'Student',
      income_bracket: 'Under 2.5 Lakhs',
      state: 'All India',
      category: 'General',
      interests: 'scholarship,grant,funding,job'
    };
  }
  return user;
}

export function updateUserProfile(user) {
  const sqlite = getDb();
  const stmt = sqlite.prepare(`
    UPDATE users SET
      name = ?,
      age = ?,
      gender = ?,
      occupation = ?,
      income_bracket = ?,
      state = ?,
      category = ?,
      interests = ?
    WHERE id = ?
  `);
  
  stmt.run(
    user.name || 'Beautiful Rosa & Lino',
    user.age || 24,
    user.gender || 'All',
    user.occupation || 'Student',
    user.income_bracket || 'Under 2.5 Lakhs',
    user.state || 'All India',
    user.category || 'General',
    user.interests || 'scholarship,grant,funding,job',
    user.id || 1
  );

  return getUserProfile(user.id || 1);
}

export function getAllSchemes(query = '', category = 'All', userId = 1) {
  const sqlite = getDb();
  const user = getUserProfile(userId);
  
  let sql = `
    SELECT s.*, 
      (SELECT COUNT(*) FROM saved_schemes ss WHERE ss.scheme_id = s.id AND ss.user_id = ?) as is_saved
    FROM schemes s 
    WHERE s.status = 'Active'
  `;
  const params = [user.id];

  if (category && category !== 'All') {
    sql += ` AND s.category = ?`;
    params.push(category);
  }

  if (query && query.trim() !== '') {
    sql += ` AND (s.title LIKE ? OR s.description LIKE ? OR s.keywords LIKE ? OR s.offered_by LIKE ?)`;
    const searchPattern = `%${query.trim()}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  sql += ` ORDER BY s.id DESC`;

  const rows = sqlite.prepare(sql).all(...params);

  // Calculate Match Score for logged in user based on profile attributes
  const matchedSchemes = rows.map(scheme => {
    let score = 50; // base score

    // Occupation match
    if (scheme.eligibility_occupations === 'All' || scheme.eligibility_occupations.includes(user.occupation)) {
      score += 20;
    }

    // Age eligibility
    if (user.age >= scheme.eligibility_min_age && user.age <= scheme.eligibility_max_age) {
      score += 15;
    }

    // Income eligibility
    if (scheme.eligibility_income === 'All' || scheme.eligibility_income.includes(user.income_bracket)) {
      score += 10;
    }

    // Category / Gender match
    if (scheme.eligibility_category === 'All' || scheme.eligibility_category.includes(user.category)) {
      score += 5;
    }

    // Cap match score between 40% and 99%
    score = Math.min(99, Math.max(40, score));

    return {
      ...scheme,
      match_score: score
    };
  });

  // Sort by match_score descending if no specific text search query, otherwise return search results
  if (!query) {
    matchedSchemes.sort((a, b) => b.match_score - a.match_score);
  }

  return {
    schemes: matchedSchemes,
    user
  };
}

export function toggleSaveScheme(userId = 1, schemeId) {
  const sqlite = getDb();
  const existing = sqlite.prepare('SELECT id FROM saved_schemes WHERE user_id = ? AND scheme_id = ?').get(userId, schemeId);
  
  if (existing) {
    sqlite.prepare('DELETE FROM saved_schemes WHERE user_id = ? AND scheme_id = ?').run(userId, schemeId);
    return false; // unsaved
  } else {
    sqlite.prepare('INSERT INTO saved_schemes (user_id, scheme_id) VALUES (?, ?)').run(userId, schemeId);
    return true; // saved
  }
}

export function getScrapeLogs() {
  const sqlite = getDb();
  return sqlite.prepare('SELECT * FROM scrape_logs ORDER BY scraped_at DESC LIMIT 10').all();
}
