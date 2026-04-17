
-- Yararlan Bulk Seed V2 Migration
DROP TABLE IF EXISTS website_intents;
DROP TABLE IF EXISTS website_personas;
DROP TABLE IF EXISTS recommended_websites;
DROP TABLE IF EXISTS websites;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS intents;
DROP TABLE IF EXISTS personas;

CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, name_tr TEXT NOT NULL, name_en TEXT NOT NULL, name_es TEXT NOT NULL, name_zh TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS intents (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, name_tr TEXT NOT NULL, name_en TEXT NOT NULL, name_es TEXT NOT NULL, name_zh TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS personas (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, name_tr TEXT NOT NULL, name_en TEXT NOT NULL, name_es TEXT NOT NULL, name_zh TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS websites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  short_description TEXT,
  purpose TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  click_count INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS website_intents (
  website_id INTEGER REFERENCES websites(id) ON DELETE CASCADE,
  intent_id INTEGER REFERENCES intents(id) ON DELETE CASCADE,
  PRIMARY KEY (website_id, intent_id)
);

CREATE TABLE IF NOT EXISTS website_personas (
  website_id INTEGER REFERENCES websites(id) ON DELETE CASCADE,
  persona_id INTEGER REFERENCES personas(id) ON DELETE CASCADE,
  PRIMARY KEY (website_id, persona_id)
);

CREATE TABLE IF NOT EXISTS recommended_websites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  website_id INTEGER NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS suggested_tools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  website_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (1, 'icerik-uretimi', 'İçerik Üretimi', 'Content Creation', 'Creación de Contenido', '内容创作');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (2, 'video-reels', 'Video & Reels', 'Video & Reels', 'Video y Reels', '视频和短卷');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (3, 'gorsel-tasarim', 'Görsel/Tasarım', 'Visual/Design', 'Visual/Diseño', '视觉/设计');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (4, 'arastirma-analiz', 'Araştırma & Analiz', 'Research & Analysis', 'Investigación y Analítica', '研究与分析');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (5, 'kod-gelistirme', 'Kod & Geliştirme', 'Code & Development', 'Código y Desarrollo', '代码与开发');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (6, 'veri-dashboard', 'Veri & Dashboard', 'Data & Dashboard', 'Datos y Tablero', '数据与仪表盘');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (7, 'pazarlama-growth', 'Pazarlama & Growth', 'Marketing & Growth', 'Marketing y Crecimiento', '营销与增长');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (8, 'otomasyon-agent', 'Otomasyon & Agent', 'Automation & Agent', 'Automatización y Agente', '自动化与代理');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (9, 'ses-muzik', 'Ses & Müzik', 'Audio & Music', 'Audio y Música', '音频与音乐');
INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (10, 'sunum-dokuman', 'Sunum & Doküman', 'Presentation & Document', 'Presentación y Documento', '演示与文档');
INSERT INTO intents (id, slug, name_tr, name_en, name_es, name_zh) VALUES (1, 'para-kazan', 'Para Kazan', 'Make Money', 'Ganar Dinero', '赚钱');
INSERT INTO intents (id, slug, name_tr, name_en, name_es, name_zh) VALUES (2, 'viral-icerik', 'Viral İçerik', 'Viral Content', 'Contenido Viral', '病毒式内容');
INSERT INTO intents (id, slug, name_tr, name_en, name_es, name_zh) VALUES (3, 'zamandan-kazan', 'Zamandan Kazan', 'Save Time', 'Ahorrar Tiempo', '省时间');
INSERT INTO intents (id, slug, name_tr, name_en, name_es, name_zh) VALUES (4, 'otomatiklestir', 'Otomatikleştir', 'Automate', 'Automatizar', '自动化');
INSERT INTO intents (id, slug, name_tr, name_en, name_es, name_zh) VALUES (5, 'skill-up', 'Skill Up / Öğren', 'Skill Up / Learn', 'Aprender / Mejorar', '学习/进步');
INSERT INTO intents (id, slug, name_tr, name_en, name_es, name_zh) VALUES (6, 'growth-hack', 'Growth Hack', 'Growth Hack', 'Growth Hack', '增长黑客');
INSERT INTO personas (id, slug, name_tr, name_en, name_es, name_zh) VALUES (1, 'developer', 'Developer', 'Developer', 'Desarrollador', '开发人员');
INSERT INTO personas (id, slug, name_tr, name_en, name_es, name_zh) VALUES (2, 'designer', 'Designer', 'Designer', 'Diseñador', '设计师');
INSERT INTO personas (id, slug, name_tr, name_en, name_es, name_zh) VALUES (3, 'content-creator', 'Content Creator', 'Content Creator', 'Creador de Contenido', '内容创作者');
INSERT INTO personas (id, slug, name_tr, name_en, name_es, name_zh) VALUES (4, 'founder', 'Founder / Girişimci', 'Founder / Entrepreneur', 'Fundador / Emprendedor', '创始人/企业家');
INSERT INTO personas (id, slug, name_tr, name_en, name_es, name_zh) VALUES (5, 'marketer', 'Marketer', 'Marketer', 'Comercializador', '营销人员');
INSERT INTO personas (id, slug, name_tr, name_en, name_es, name_zh) VALUES (6, 'ogrenci', 'Öğrenci', 'Student', 'Estudiante', '学生');
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (1, 'ChatGPT', 'chatgpt', 'https://chat.openai.com', 'The most capable general-purpose AI assistant for writing, brainstorming, and logic.', 'General Intelligence', 1, 22573, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (1, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (1, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (1, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (1, 6);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (2, 'Claude', 'claude', 'https://claude.ai', 'Anthropic''s AI agent, exceptional at creative writing, tone matching, and long-context analysis.', 'Creative Writing', 1, 36624, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (2, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (2, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (2, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (2, 4);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (3, 'Jasper', 'jasper', 'https://jasper.ai', 'Enterprise-grade AI copilot targeted specifically for brand marketing and professional blog writing.', 'Marketing Copy', 1, 23930, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (3, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (3, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (3, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (3, 4);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (4, 'Copy.ai', 'copy-ai', 'https://copy.ai', 'Generate sales copy, ads, and email templates efficiently and dynamically.', 'Sales Copywriting', 1, 2811, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (4, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (4, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (4, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (4, 3);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (5, 'Notion AI', 'notion-ai', 'https://notion.so/product/ai', 'Deeply integrated AI for summarizing notes, rewriting documents, and database automation.', 'Workspace AI', 1, 22385, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (5, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (5, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (5, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (5, 6);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (6, 'Runway ML', 'runway-ml', 'https://runwayml.com', 'The industry standard for cinematic AI video generation, editing, and VFX control.', 'Cinematic Gen', 2, 21157, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (6, 2);
INSERT INTO website_intents (website_id, intent_id) VALUES (6, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (6, 2);
INSERT INTO website_personas (website_id, persona_id) VALUES (6, 3);
INSERT INTO recommended_websites (website_id, is_active) VALUES (6, 1);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (7, 'Invideo AI', 'invideo-ai', 'https://invideo.io/ai/', 'Instantly generate faceless YouTube shorts, TikToks, and long-form videos from a single prompt.', 'Short-form Content', 2, 44777, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (7, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (7, 2);
INSERT INTO website_personas (website_id, persona_id) VALUES (7, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (7, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (8, 'Synthesia', 'synthesia', 'https://synthesia.io', 'Create professional videos with lifelike AI avatars and localized voiceovers.', 'Avatar Presentations', 2, 11402, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (8, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (8, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (8, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (8, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (9, 'CapCut AI', 'capcut-ai', 'https://capcut.com', 'TikTok''s native video editor, packed with AI upscaling, smart cutting, and caption generation.', 'Social Editing', 2, 12670, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (9, 2);
INSERT INTO website_intents (website_id, intent_id) VALUES (9, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (9, 3);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (10, 'Opus Clip', 'opus-clip', 'https://opus.pro', 'Automatically repurpose long podcasts into viral, highly-engaging short reels.', 'Content Repurposing', 2, 48924, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (10, 2);
INSERT INTO website_intents (website_id, intent_id) VALUES (10, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (10, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (10, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (11, 'Midjourney', 'midjourney', 'https://midjourney.com', 'Highest-quality and most stylized AI image generation tool running seamlessly via Discord or Web.', 'Art Generation', 3, 29241, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (11, 2);
INSERT INTO website_intents (website_id, intent_id) VALUES (11, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (11, 2);
INSERT INTO website_personas (website_id, persona_id) VALUES (11, 3);
INSERT INTO recommended_websites (website_id, is_active) VALUES (11, 1);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (12, 'Adobe Firefly', 'adobe-firefly', 'https://firefly.adobe.com', 'Commercially safe, deeply-integrated generative fill and vector creation by Adobe.', 'Commercial Design', 3, 3597, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (12, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (12, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (12, 2);
INSERT INTO website_personas (website_id, persona_id) VALUES (12, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (13, 'Leonardo.Ai', 'leonardo-ai', 'https://leonardo.ai', 'Highly controllable image generation platform with custom model training and canvas editing.', 'Asset Creation', 3, 5874, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (13, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (13, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (13, 1);
INSERT INTO website_personas (website_id, persona_id) VALUES (13, 2);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (14, 'Canva Magic Studio', 'canva-magic-studio', 'https://canva.com/magic', 'Accessible, user-friendly suite of AI graphic tools for quick social media and poster designs.', 'Quick Graphics', 3, 4871, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (14, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (14, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (14, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (14, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (15, 'Krea AI', 'krea-ai', 'https://krea.ai', 'Real-time rendering and aggressive AI upscaling tailored for dynamic design workflows.', 'Real-time Upscaling', 3, 34464, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (15, 2);
INSERT INTO website_intents (website_id, intent_id) VALUES (15, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (15, 2);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (16, 'Perplexity', 'perplexity', 'https://perplexity.ai', 'A conversational search engine that cites real-time sources without hallucinations.', 'Factual Research', 4, 31125, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (16, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (16, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (16, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (16, 6);
INSERT INTO recommended_websites (website_id, is_active) VALUES (16, 1);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (17, 'NotebookLM', 'notebooklm', 'https://notebooklm.google.com', 'Upload your own documents to create a deeply grounded, fully cited, expert answering engine.', 'Source Grounding', 4, 11426, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (17, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (17, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (17, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (17, 4);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (18, 'Consensus', 'consensus', 'https://consensus.app', 'AI search engine built specifically for parsing and summarizing peer-reviewed academic papers.', 'Academic Research', 4, 42017, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (18, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (18, 6);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (19, 'ChatPDF', 'chatpdf', 'https://chatpdf.com', 'Quickly query, summarize, and extract unstructured data from highly dense PDF documents.', 'Document Analysis', 4, 13461, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (19, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (19, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (19, 4);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (20, 'Cursor', 'cursor', 'https://cursor.sh', 'An AI-first code editor (forked from VSCode) with unmatched whole-codebase awareness and code generation.', 'AI IDE', 5, 48984, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (20, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (20, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (20, 1);
INSERT INTO recommended_websites (website_id, is_active) VALUES (20, 1);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (21, 'GitHub Copilot', 'github-copilot', 'https://github.com/features/copilot', 'The most widely adopted autocomplete and chat coding assistant embedded in major IDEs.', 'Syntax Autocomplete', 5, 29618, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (21, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (21, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (21, 1);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (22, 'Windsurf', 'windsurf', 'https://codeium.com/windsurf', 'Flow-based, context-aware AI IDE offering high-speed enterprise coding capabilities.', 'Agentic Development', 5, 10752, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (22, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (22, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (22, 1);
INSERT INTO website_personas (website_id, persona_id) VALUES (22, 4);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (23, 'Vercel v0', 'vercel-v0', 'https://v0.dev', 'Generate functional, beautiful React UI components and layouts using simple text prompts.', 'UI Generation', 5, 8342, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (23, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (23, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (23, 1);
INSERT INTO website_personas (website_id, persona_id) VALUES (23, 2);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (24, 'Julius AI', 'julius-ai', 'https://julius.ai', 'A powerful AI data analyst that can ingest CSVs, build interactive charts, and run Python statistical models.', 'Data Analysis', 6, 5492, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (24, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (24, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (24, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (24, 6);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (25, 'Tableau AI (Pulse)', 'tableau-ai-pulse', 'https://tableau.com', 'Delivers personalized data insights directly within enterprise dashboards using generative AI.', 'Enterprise Analytics', 6, 50774, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (25, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (25, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (25, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (25, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (26, 'Akkio', 'akkio', 'https://akkio.com', 'Predictive generative AI explicitly designed for agencies and marketers analyzing ad spend datasets.', 'Predictive Modeling', 6, 19017, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (26, 6);
INSERT INTO website_intents (website_id, intent_id) VALUES (26, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (26, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (27, 'Apollo AI', 'apollo-ai', 'https://apollo.io', 'B2B sales and marketing intelligence heavily augmented by AI writing and lead scoring.', 'Lead Generation', 7, 21153, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (27, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (27, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (27, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (27, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (28, 'Surfer SEO', 'surfer-seo', 'https://surferseo.com', 'NLP-powered SEO analysis that optimizes your written content for top Google search rankings.', 'Search Optimization', 7, 35730, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (28, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (28, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (28, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (28, 3);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (29, 'Mutiny', 'mutiny', 'https://mutinyhq.com', 'No-code AI platform optimizing B2B website conversions dynamically based on visitor data.', 'Conversion Rate', 7, 42168, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (29, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (29, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (29, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (29, 4);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (30, 'Zapier Central', 'zapier-central', 'https://zapier.com/central', 'Create AI bots capable of triggering thousands of complex Zapier app actions autonomously.', 'Workflow Automation', 8, 39850, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (30, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (30, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (30, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (30, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (31, 'Make', 'make', 'https://make.com', 'Visual workflow automation platform enhanced by complex AI-driven routing and data parsing.', 'Visual Automation', 8, 46497, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (31, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (31, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (31, 1);
INSERT INTO website_personas (website_id, persona_id) VALUES (31, 4);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (32, 'AutoGPT / AgentGPT', 'autogpt-agentgpt', 'https://agentgpt.reworkd.ai', 'Deploy autonomous agents that chain thoughts and execute broad goals directly on the web.', 'Autonomous Agents', 8, 9919, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (32, 4);
INSERT INTO website_intents (website_id, intent_id) VALUES (32, 6);
INSERT INTO website_personas (website_id, persona_id) VALUES (32, 1);
INSERT INTO website_personas (website_id, persona_id) VALUES (32, 4);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (33, 'Relevance AI', 'relevance-ai', 'https://relevanceai.com', 'Build highly-customizable AI workforces composed of specialized sub-agents.', 'AI Teams', 8, 19901, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (33, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (33, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (33, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (33, 1);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (34, 'Suno', 'suno', 'https://suno.com', 'Incredible AI model generating full musical tracks, including realistic vocals, from a text prompt.', 'Music Generation', 9, 49589, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (34, 2);
INSERT INTO website_personas (website_id, persona_id) VALUES (34, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (34, 2);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (35, 'ElevenLabs', 'elevenlabs', 'https://elevenlabs.io', 'The undisputed leader in hyper-realistic text-to-speech, voice cloning, and audio dubbing.', 'Voice Synthesis', 9, 41472, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (35, 2);
INSERT INTO website_intents (website_id, intent_id) VALUES (35, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (35, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (35, 2);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (36, 'Descript', 'descript', 'https://descript.com', 'Edit audio and podcasts by simply modifying the text transcript. Integrates Studio Sound enhancement.', 'Audio Editing', 9, 38696, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (36, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (36, 2);
INSERT INTO website_personas (website_id, persona_id) VALUES (36, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (36, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (37, 'Gamma', 'gamma', 'https://gamma.app', 'Generate breathtaking slide decks, webpages, and documents purely from a prompt outline.', 'Slide Generation', 10, 19718, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (37, 3);
INSERT INTO website_intents (website_id, intent_id) VALUES (37, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (37, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (37, 5);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (38, 'Tome', 'tome', 'https://tome.app', 'Storytelling-focused AI presentation builder optimized for founders, pitch decks, and creatives.', 'Pitch Decks', 10, 40771, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (38, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (38, 4);
INSERT INTO website_personas (website_id, persona_id) VALUES (38, 6);
INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (39, 'Beautiful.ai', 'beautiful-ai', 'https://beautiful.ai', 'AI layout engine that automatically aligns, maps, and structures your presentations fluidly.', 'Layout Automation', 10, 32567, 1);
INSERT INTO website_intents (website_id, intent_id) VALUES (39, 3);
INSERT INTO website_personas (website_id, persona_id) VALUES (39, 5);
INSERT INTO website_personas (website_id, persona_id) VALUES (39, 4);
