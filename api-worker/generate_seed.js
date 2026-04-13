const fs = require('fs');

const CATEGORIES = [
  { id: 1, slug: 'icerik-uretimi', tr: 'İçerik Üretimi', en: 'Content Creation', es: 'Creación de Contenido', zh: '内容创作' },
  { id: 2, slug: 'video-reels', tr: 'Video & Reels', en: 'Video & Reels', es: 'Video y Reels', zh: '视频和短卷' },
  { id: 3, slug: 'gorsel-tasarim', tr: 'Görsel/Tasarım', en: 'Visual/Design', es: 'Visual/Diseño', zh: '视觉/设计' },
  { id: 4, slug: 'arastirma-analiz', tr: 'Araştırma & Analiz', en: 'Research & Analysis', es: 'Investigación y Analítica', zh: '研究与分析' },
  { id: 5, slug: 'kod-gelistirme', tr: 'Kod & Geliştirme', en: 'Code & Development', es: 'Código y Desarrollo', zh: '代码与开发' },
  { id: 6, slug: 'veri-dashboard', tr: 'Veri & Dashboard', en: 'Data & Dashboard', es: 'Datos y Tablero', zh: '数据与仪表盘' },
  { id: 7, slug: 'pazarlama-growth', tr: 'Pazarlama & Growth', en: 'Marketing & Growth', es: 'Marketing y Crecimiento', zh: '营销与增长' },
  { id: 8, slug: 'otomasyon-agent', tr: 'Otomasyon & Agent', en: 'Automation & Agent', es: 'Automatización y Agente', zh: '自动化与代理' },
  { id: 9, slug: 'ses-muzik', tr: 'Ses & Müzik', en: 'Audio & Music', es: 'Audio y Música', zh: '音频与音乐' },
  { id: 10, slug: 'sunum-dokuman', tr: 'Sunum & Doküman', en: 'Presentation & Document', es: 'Presentación y Documento', zh: '演示与文档' }
];

const INTENTS = [
  { id: 1, slug: 'para-kazan', tr: 'Para Kazan', en: 'Make Money', es: 'Ganar Dinero', zh: '赚钱' },
  { id: 2, slug: 'viral-icerik', tr: 'Viral İçerik', en: 'Viral Content', es: 'Contenido Viral', zh: '病毒式内容' },
  { id: 3, slug: 'zamandan-kazan', tr: 'Zamandan Kazan', en: 'Save Time', es: 'Ahorrar Tiempo', zh: '省时间' },
  { id: 4, slug: 'otomatiklestir', tr: 'Otomatikleştir', en: 'Automate', es: 'Automatizar', zh: '自动化' },
  { id: 5, slug: 'skill-up', tr: 'Skill Up / Öğren', en: 'Skill Up / Learn', es: 'Aprender / Mejorar', zh: '学习/进步' },
  { id: 6, slug: 'growth-hack', tr: 'Growth Hack', en: 'Growth Hack', es: 'Growth Hack', zh: '增长黑客' }
];

const PERSONAS = [
  { id: 1, slug: 'developer', tr: 'Developer', en: 'Developer', es: 'Desarrollador', zh: '开发人员' },
  { id: 2, slug: 'designer', tr: 'Designer', en: 'Designer', es: 'Diseñador', zh: '设计师' },
  { id: 3, slug: 'content-creator', tr: 'Content Creator', en: 'Content Creator', es: 'Creador de Contenido', zh: '内容创作者' },
  { id: 4, slug: 'founder', tr: 'Founder / Girişimci', en: 'Founder / Entrepreneur', es: 'Fundador / Emprendedor', zh: '创始人/企业家' },
  { id: 5, slug: 'marketer', tr: 'Marketer', en: 'Marketer', es: 'Comercializador', zh: '营销人员' },
  { id: 6, slug: 'ogrenci', tr: 'Öğrenci', en: 'Student', es: 'Estudiante', zh: '学生' }
];

// Production-ready curated list of real tools.
// Category IDs: 1:Content, 2:Video, 3:Visual, 4:Research, 5:Code, 6:Data, 7:Marketing, 8:Automation, 9:Audio, 10:Presentation
const PRODUCTION_TOOLS = [
  // 1: Content Creation
  { name: 'ChatGPT', url: 'https://chat.openai.com', category_id: 1, intents: [3, 5], personas: [3, 6], desc: 'The most capable general-purpose AI assistant for writing, brainstorming, and logic.', purpose: 'General Intelligence' },
  { name: 'Claude', url: 'https://claude.ai', category_id: 1, intents: [3, 5], personas: [3, 4], desc: 'Anthropic\'s AI agent, exceptional at creative writing, tone matching, and long-context analysis.', purpose: 'Creative Writing' },
  { name: 'Jasper', url: 'https://jasper.ai', category_id: 1, intents: [1, 6], personas: [5, 4], desc: 'Enterprise-grade AI copilot targeted specifically for brand marketing and professional blog writing.', purpose: 'Marketing Copy' },
  { name: 'Copy.ai', url: 'https://copy.ai', category_id: 1, intents: [3, 6], personas: [5, 3], desc: 'Generate sales copy, ads, and email templates efficiently and dynamically.', purpose: 'Sales Copywriting' },
  { name: 'Notion AI', url: 'https://notion.so/product/ai', category_id: 1, intents: [3, 4], personas: [4, 6], desc: 'Deeply integrated AI for summarizing notes, rewriting documents, and database automation.', purpose: 'Workspace AI' },
  
  // 2: Video & Reels
  { name: 'Runway ML', url: 'https://runwayml.com', category_id: 2, intents: [2, 3], personas: [2, 3], desc: 'The industry standard for cinematic AI video generation, editing, and VFX control.', purpose: 'Cinematic Gen' },
  { name: 'Invideo AI', url: 'https://invideo.io/ai/', category_id: 2, intents: [1, 2], personas: [3, 5], desc: 'Instantly generate faceless YouTube shorts, TikToks, and long-form videos from a single prompt.', purpose: 'Short-form Content' },
  { name: 'Synthesia', url: 'https://synthesia.io', category_id: 2, intents: [3, 4], personas: [4, 5], desc: 'Create professional videos with lifelike AI avatars and localized voiceovers.', purpose: 'Avatar Presentations' },
  { name: 'CapCut AI', url: 'https://capcut.com', category_id: 2, intents: [2, 3], personas: [3], desc: 'TikTok\'s native video editor, packed with AI upscaling, smart cutting, and caption generation.', purpose: 'Social Editing' },
  { name: 'Opus Clip', url: 'https://opus.pro', category_id: 2, intents: [2, 6], personas: [3, 5], desc: 'Automatically repurpose long podcasts into viral, highly-engaging short reels.', purpose: 'Content Repurposing' },

  // 3: Visual & Design
  { name: 'Midjourney', url: 'https://midjourney.com', category_id: 3, intents: [2, 5], personas: [2, 3], desc: 'Highest-quality and most stylized AI image generation tool running seamlessly via Discord or Web.', purpose: 'Art Generation' },
  { name: 'Adobe Firefly', url: 'https://firefly.adobe.com', category_id: 3, intents: [3, 4], personas: [2, 5], desc: 'Commercially safe, deeply-integrated generative fill and vector creation by Adobe.', purpose: 'Commercial Design' },
  { name: 'Leonardo.Ai', url: 'https://leonardo.ai', category_id: 3, intents: [1, 5], personas: [1, 2], desc: 'Highly controllable image generation platform with custom model training and canvas editing.', purpose: 'Asset Creation' },
  { name: 'Canva Magic Studio', url: 'https://canva.com/magic', category_id: 3, intents: [3, 6], personas: [4, 5], desc: 'Accessible, user-friendly suite of AI graphic tools for quick social media and poster designs.', purpose: 'Quick Graphics' },
  { name: 'Krea AI', url: 'https://krea.ai', category_id: 3, intents: [2, 5], personas: [2], desc: 'Real-time rendering and aggressive AI upscaling tailored for dynamic design workflows.', purpose: 'Real-time Upscaling' },

  // 4: Research & Analysis
  { name: 'Perplexity', url: 'https://perplexity.ai', category_id: 4, intents: [3, 5], personas: [4, 6], desc: 'A conversational search engine that cites real-time sources without hallucinations.', purpose: 'Factual Research' },
  { name: 'NotebookLM', url: 'https://notebooklm.google.com', category_id: 4, intents: [3, 5], personas: [6, 4], desc: 'Upload your own documents to create a deeply grounded, fully cited, expert answering engine.', purpose: 'Source Grounding' },
  { name: 'Consensus', url: 'https://consensus.app', category_id: 4, intents: [5], personas: [6], desc: 'AI search engine built specifically for parsing and summarizing peer-reviewed academic papers.', purpose: 'Academic Research' },
  { name: 'ChatPDF', url: 'https://chatpdf.com', category_id: 4, intents: [3], personas: [6, 4], desc: 'Quickly query, summarize, and extract unstructured data from highly dense PDF documents.', purpose: 'Document Analysis' },

  // 5: Code & Development
  { name: 'Cursor', url: 'https://cursor.sh', category_id: 5, intents: [3, 5], personas: [1], desc: 'An AI-first code editor (forked from VSCode) with unmatched whole-codebase awareness and code generation.', purpose: 'AI IDE' },
  { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category_id: 5, intents: [3, 4], personas: [1], desc: 'The most widely adopted autocomplete and chat coding assistant embedded in major IDEs.', purpose: 'Syntax Autocomplete' },
  { name: 'Windsurf', url: 'https://codeium.com/windsurf', category_id: 5, intents: [3, 5], personas: [1, 4], desc: 'Flow-based, context-aware AI IDE offering high-speed enterprise coding capabilities.', purpose: 'Agentic Development' },
  { name: 'Vercel v0', url: 'https://v0.dev', category_id: 5, intents: [3, 6], personas: [1, 2], desc: 'Generate functional, beautiful React UI components and layouts using simple text prompts.', purpose: 'UI Generation' },

  // 6: Data & Dashboard
  { name: 'Julius AI', url: 'https://julius.ai', category_id: 6, intents: [3, 5], personas: [4, 6], desc: 'A powerful AI data analyst that can ingest CSVs, build interactive charts, and run Python statistical models.', purpose: 'Data Analysis' },
  { name: 'Tableau AI (Pulse)', url: 'https://tableau.com', category_id: 6, intents: [3, 4], personas: [4, 5], desc: 'Delivers personalized data insights directly within enterprise dashboards using generative AI.', purpose: 'Enterprise Analytics' },
  { name: 'Akkio', url: 'https://akkio.com', category_id: 6, intents: [6, 4], personas: [5], desc: 'Predictive generative AI explicitly designed for agencies and marketers analyzing ad spend datasets.', purpose: 'Predictive Modeling' },

  // 7: Marketing & Growth
  { name: 'Apollo AI', url: 'https://apollo.io', category_id: 7, intents: [1, 6], personas: [4, 5], desc: 'B2B sales and marketing intelligence heavily augmented by AI writing and lead scoring.', purpose: 'Lead Generation' },
  { name: 'Surfer SEO', url: 'https://surferseo.com', category_id: 7, intents: [1, 6], personas: [5, 3], desc: 'NLP-powered SEO analysis that optimizes your written content for top Google search rankings.', purpose: 'Search Optimization' },
  { name: 'Mutiny', url: 'https://mutinyhq.com', category_id: 7, intents: [1, 6], personas: [5, 4], desc: 'No-code AI platform optimizing B2B website conversions dynamically based on visitor data.', purpose: 'Conversion Rate' },
  
  // 8: Automation & Agent
  { name: 'Zapier Central', url: 'https://zapier.com/central', category_id: 8, intents: [3, 4], personas: [4, 5], desc: 'Create AI bots capable of triggering thousands of complex Zapier app actions autonomously.', purpose: 'Workflow Automation' },
  { name: 'Make', url: 'https://make.com', category_id: 8, intents: [3, 4], personas: [1, 4], desc: 'Visual workflow automation platform enhanced by complex AI-driven routing and data parsing.', purpose: 'Visual Automation' },
  { name: 'AutoGPT / AgentGPT', url: 'https://agentgpt.reworkd.ai', category_id: 8, intents: [4, 6], personas: [1, 4], desc: 'Deploy autonomous agents that chain thoughts and execute broad goals directly on the web.', purpose: 'Autonomous Agents' },
  { name: 'Relevance AI', url: 'https://relevanceai.com', category_id: 8, intents: [3, 4], personas: [4, 1], desc: 'Build highly-customizable AI workforces composed of specialized sub-agents.', purpose: 'AI Teams' },

  // 9: Audio & Music
  { name: 'Suno', url: 'https://suno.com', category_id: 9, intents: [2], personas: [3, 2], desc: 'Incredible AI model generating full musical tracks, including realistic vocals, from a text prompt.', purpose: 'Music Generation' },
  { name: 'ElevenLabs', url: 'https://elevenlabs.io', category_id: 9, intents: [2, 3], personas: [3, 2], desc: 'The undisputed leader in hyper-realistic text-to-speech, voice cloning, and audio dubbing.', purpose: 'Voice Synthesis' },
  { name: 'Descript', url: 'https://descript.com', category_id: 9, intents: [3, 2], personas: [3, 5], desc: 'Edit audio and podcasts by simply modifying the text transcript. Integrates Studio Sound enhancement.', purpose: 'Audio Editing' },
  
  // 10: Presentation & Document
  { name: 'Gamma', url: 'https://gamma.app', category_id: 10, intents: [3, 5], personas: [4, 5], desc: 'Generate breathtaking slide decks, webpages, and documents purely from a prompt outline.', purpose: 'Slide Generation' },
  { name: 'Tome', url: 'https://tome.app', category_id: 10, intents: [3], personas: [4, 6], desc: 'Storytelling-focused AI presentation builder optimized for founders, pitch decks, and creatives.', purpose: 'Pitch Decks' },
  { name: 'Beautiful.ai', url: 'https://beautiful.ai', category_id: 10, intents: [3], personas: [5, 4], desc: 'AI layout engine that automatically aligns, maps, and structures your presentations fluidly.', purpose: 'Layout Automation' }
];

function generateSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

let sql = `
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

`;

// Seed Dictionaries
for (const c of CATEGORIES) {
    sql += `INSERT INTO categories (id, slug, name_tr, name_en, name_es, name_zh) VALUES (${c.id}, '${c.slug}', '${c.tr}', '${c.en}', '${c.es}', '${c.zh}');\n`;
}
for (const i of INTENTS) {
    sql += `INSERT INTO intents (id, slug, name_tr, name_en, name_es, name_zh) VALUES (${i.id}, '${i.slug}', '${i.tr}', '${i.en}', '${i.es}', '${i.zh}');\n`;
}
for (const p of PERSONAS) {
    sql += `INSERT INTO personas (id, slug, name_tr, name_en, name_es, name_zh) VALUES (${p.id}, '${p.slug}', '${p.tr}', '${p.en}', '${p.es}', '${p.zh}');\n`;
}

let idCounter = 1;

// Insert 10 Featured tools manually by picking some of the best (Cursor, Midjourney, Perplexity, RunWay ML)
const recommendedTools = ['Cursor', 'Midjourney', 'Perplexity', 'Runway ML'];

for (const tool of PRODUCTION_TOOLS) {
    const slug = generateSlug(tool.name);
    
    // Give some realistic organic clicks
    const clicks = Math.floor(Math.random() * 50000) + 1200;
    
    nameEscaped = tool.name.replace(/'/g, "''");
    descEscaped = tool.desc.replace(/'/g, "''");
    purposeEscaped = tool.purpose.replace(/'/g, "''");
    
    sql += `INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (${idCounter}, '${nameEscaped}', '${slug}', '${tool.url}', '${descEscaped}', '${purposeEscaped}', ${tool.category_id}, ${clicks}, 1);\n`;
    
    for (const intent_id of tool.intents) {
        sql += `INSERT INTO website_intents (website_id, intent_id) VALUES (${idCounter}, ${intent_id});\n`;
    }
    for (const persona_id of tool.personas) {
        sql += `INSERT INTO website_personas (website_id, persona_id) VALUES (${idCounter}, ${persona_id});\n`;
    }
    
    if (recommendedTools.includes(tool.name)) {
        sql += `INSERT INTO recommended_websites (website_id, is_active) VALUES (${idCounter}, 1);\n`;
    }
    
    idCounter++;
}

fs.writeFileSync('seed_tools.sql', sql);
console.log('✅ Generated V2 seed_tools.sql with PRODUCTION READY relational schema and', idCounter - 1, 'items.');

