-- Replace obsolete tools with modern alternatives as per Master Plan

-- 1. Replace Zapier Central -> Zapier AI Agents
UPDATE websites SET name = 'Zapier AI Agents', slug = 'zapier-ai-agents', short_description = 'Yapay zeka asistanları ile binlerce uygulamada karmaşık otomasyon görevlerini otomatikleştirin.', url = 'https://zapier.com/ai' WHERE slug = 'zapier-central';

-- 2. Demote Tome (We'll just set it to inactive instead of deleting)
UPDATE websites SET is_active = 0 WHERE slug = 'tome';

-- 3. Replace Jasper -> (Demote Jasper, we'll keep it active but not featured)
UPDATE websites SET category_id = 1 WHERE slug = 'jasper'; -- It's already there

-- 4. Mutiny -> Framer AI
UPDATE websites SET name = 'Framer AI', slug = 'framer-ai', short_description = 'Sadece yazılı bir prompt vererek saniyeler içinde etkileyici, SEO uyumlu ve tamamen responsive web siteleri oluşturun.', url = 'https://framer.com/ai' WHERE slug = 'mutiny';

-- 5. Tableau AI Pulse -> Power BI Copilot
UPDATE websites SET name = 'Power BI Copilot', slug = 'power-bi-copilot', short_description = 'Microsoft veritabanlarınızdaki verileri anında özetleyip, doğal dille sorarak grafikler oluşturan kurumsal AI.', url = 'https://powerbi.microsoft.com/' WHERE slug = 'tableau-ai-pulse';

-- 6. Add new tools (Cursor, v0, Bolt.new, Perplexity, You.com)
-- Cursor and v0 are already in the DB (IDs 20, 23).
-- We'll add Bolt.new and Windsurf (Windsurf is already 22).

INSERT OR IGNORE INTO websites (name, slug, url, short_description, purpose, category_id, click_count, is_active, pricing_type, rating_score, turkish_support) VALUES
('Bolt.new', 'bolt-new', 'https://bolt.new', 'Tarayıcı üzerinden tam donanımlı projeler geliştiren, AI tabanlı bulut IDE.', 'AI Web Dev', 5, 0, 1, 'Freemium', 9.5, 0),
('Elicit', 'elicit', 'https://elicit.com', 'Akademik makaleleri analiz edip, verileri sentezleyen araştırmacı asistanı.', 'Academic', 4, 0, 1, 'Paid', 9.1, 0),
('You.com', 'you-com', 'https://you.com', 'Programlama, arama ve çok modlu modeller arasında anında geçiş yapabilen AI motoru.', 'AI Search', 4, 0, 1, 'Freemium', 8.8, 1),
('Midjourney', 'midjourney', 'https://midjourney.com', 'Tartışmasız en kaliteli prompt tabanlı görsel üretim yapay zekası (Discord üzerinden çalışır).', 'AI Art', 3, 0, 1, 'Paid', 9.9, 0),
('CrewAI', 'crew-ai', 'https://crewai.com', 'Birden çok AI ajanını bir takım gibi çalıştırarak karmaşık görevleri yapmalarını sağlayan framework.', 'Auto Agents', 8, 0, 1, 'Free', 8.9, 0);

