-- 1. Create Translation Tables
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS intents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS personas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL
);

-- 2. Create Junction Tables for Many-to-Many Relationships
CREATE TABLE IF NOT EXISTS website_intents (
  website_id INTEGER,
  intent_id INTEGER,
  PRIMARY KEY (website_id, intent_id),
  FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE,
  FOREIGN KEY (intent_id) REFERENCES intents(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS website_personas (
  website_id INTEGER,
  persona_id INTEGER,
  PRIMARY KEY (website_id, persona_id),
  FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE,
  FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE CASCADE
);

-- 3. Create Recommended Websites Table (replaces featured concept entirely)
CREATE TABLE IF NOT EXISTS recommended_websites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  website_id INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE
);

-- 4. Alter Websites Table to add category_id (Foreign Key to categories)
-- SQLite requires adding columns one by one
-- We use a pragmatic approach: if the column exists, this will fail safely or we ignore.
ALTER TABLE websites ADD COLUMN category_id INTEGER REFERENCES categories(id);

-- 5. Reset all click metrics to 0 as requested
UPDATE websites SET click_count = 0;
