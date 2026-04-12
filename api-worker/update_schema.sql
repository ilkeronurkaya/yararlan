CREATE TABLE IF NOT EXISTS suggested_tools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  website_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

UPDATE websites SET is_featured = 0;

INSERT OR IGNORE INTO websites (name, slug, url, short_description, is_featured, is_active, click_count)
VALUES 
('FBMenu', 'fbmenu', 'https://fbmenu.com', 'Haftanın seçkisi aracı.', 1, 1, 0),
('AISkillScore', 'aiskillscore', 'https://aiskillscore.com', 'Haftanın seçkisi aracı.', 1, 1, 0),
('Inflera', 'inflera', 'https://inflera.com', 'Haftanın seçkisi aracı.', 1, 1, 0);

UPDATE websites SET is_featured = 1, is_active = 1 WHERE url LIKE '%fbmenu.com%' OR url LIKE '%aiskillscore.com%' OR url LIKE '%inflera.com%';
