DROP TABLE IF EXISTS websites;

CREATE TABLE websites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    logo_url TEXT,
    short_description TEXT NOT NULL,
    long_description TEXT,
    category TEXT NOT NULL,
    tags TEXT, -- JSON string
    pricing_model TEXT CHECK(pricing_model IN ('free', 'freemium', 'paid')),
    language TEXT DEFAULT 'tr',
    is_featured BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    click_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_websites_slug ON websites(slug);
CREATE INDEX idx_websites_category ON websites(category);
CREATE INDEX idx_websites_click_count ON websites(click_count);
CREATE INDEX idx_websites_is_featured ON websites(is_featured);
CREATE INDEX idx_websites_search ON websites(name, short_description);
