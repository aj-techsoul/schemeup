CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT DEFAULT 'Valued Citizen',
  email TEXT UNIQUE DEFAULT 'user@schemeup.org',
  age INTEGER DEFAULT 24,
  gender TEXT DEFAULT 'All',
  occupation TEXT DEFAULT 'Student',
  income_bracket TEXT DEFAULT 'Under 2.5 Lakhs',
  state TEXT DEFAULT 'All India',
  category TEXT DEFAULT 'General',
  interests TEXT DEFAULT 'scholarship,funding,grant,job',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS schemes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  offered_by TEXT,
  eligibility_min_age INTEGER DEFAULT 0,
  eligibility_max_age INTEGER DEFAULT 100,
  eligibility_occupations TEXT DEFAULT 'All',
  eligibility_income TEXT DEFAULT 'All',
  eligibility_category TEXT DEFAULT 'All',
  eligibility_state TEXT DEFAULT 'All India',
  benefit_amount TEXT,
  keywords TEXT,
  source_url TEXT,
  application_deadline TEXT DEFAULT 'Rolling / Open',
  scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS saved_schemes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  scheme_id INTEGER NOT NULL,
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, scheme_id)
);

CREATE TABLE IF NOT EXISTS scrape_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_name TEXT,
  url TEXT,
  status TEXT,
  schemes_found INTEGER,
  scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial default user if not exists
INSERT OR IGNORE INTO users (id, name, email, age, gender, occupation, income_bracket, state, category, interests)
VALUES (1, 'Beautiful Rosa & Lino', 'user@schemeup.org', 24, 'All', 'Student', 'Under 2.5 Lakhs', 'All India', 'General', 'scholarship,grant,funding,job,rule');
