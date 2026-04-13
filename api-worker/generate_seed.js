const fs = require('fs');

const CATEGORIES = [
  { id: 1, slug: 'icerik-uretimi', tr: 'İçerik Üretimi', en: 'Content Creation', es: 'Creación de Contenido' },
  { id: 2, slug: 'video-reels', tr: 'Video & Reels', en: 'Video & Reels', es: 'Video y Reels' },
  { id: 3, slug: 'gorsel-tasarim', tr: 'Görsel/Tasarım', en: 'Visual/Design', es: 'Visual/Diseño' },
  { id: 4, slug: 'arastirma-analiz', tr: 'Araştırma & Analiz', en: 'Research & Analysis', es: 'Investigación y Analítica' },
  { id: 5, slug: 'kod-gelistirme', tr: 'Kod & Geliştirme', en: 'Code & Development', es: 'Código y Desarrollo' },
  { id: 6, slug: 'veri-dashboard', tr: 'Veri & Dashboard', en: 'Data & Dashboard', es: 'Datos y Tablero' },
  { id: 7, slug: 'pazarlama-growth', tr: 'Pazarlama & Growth', en: 'Marketing & Growth', es: 'Marketing y Crecimiento' },
  { id: 8, slug: 'otomasyon-agent', tr: 'Otomasyon & Agent', en: 'Automation & Agent', es: 'Automatización y Agente' },
  { id: 9, slug: 'ses-muzik', tr: 'Ses & Müzik', en: 'Audio & Music', es: 'Audio y Música' },
  { id: 10, slug: 'sunum-dokuman', tr: 'Sunum & Doküman', en: 'Presentation & Document', es: 'Presentación y Documento' }
];

const INTENTS = [
  { id: 1, slug: 'para-kazan', tr: 'Para Kazan', en: 'Make Money', es: 'Ganar Dinero' },
  { id: 2, slug: 'viral-icerik', tr: 'Viral İçerik', en: 'Viral Content', es: 'Contenido Viral' },
  { id: 3, slug: 'zamandan-kazan', tr: 'Zamandan Kazan', en: 'Save Time', es: 'Ahorrar Tiempo' },
  { id: 4, slug: 'otomatiklestir', tr: 'Otomatikleştir', en: 'Automate', es: 'Automatizar' },
  { id: 5, slug: 'skill-up', tr: 'Skill Up / Öğren', en: 'Skill Up / Learn', es: 'Aprender / Mejorar' },
  { id: 6, slug: 'growth-hack', tr: 'Growth Hack', en: 'Growth Hack', es: 'Growth Hack' }
];

const PERSONAS = [
  { id: 1, slug: 'developer', tr: 'Developer', en: 'Developer', es: 'Desarrollador' },
  { id: 2, slug: 'designer', tr: 'Designer', en: 'Designer', es: 'Diseñador' },
  { id: 3, slug: 'content-creator', tr: 'Content Creator', en: 'Content Creator', es: 'Creador de Contenido' },
  { id: 4, slug: 'founder', tr: 'Founder / Girişimci', en: 'Founder / Entrepreneur', es: 'Fundador / Emprendedor' },
  { id: 5, slug: 'marketer', tr: 'Marketer', en: 'Marketer', es: 'Comercializador' },
  { id: 6, slug: 'ogrenci', tr: 'Öğrenci', en: 'Student', es: 'Estudiante' }
];

const SPECIAL_TOOLS = [
  { name: 'FB Menu', url: 'https://fbmenu.com', category_id: 8, intents: [4, 1], personas: [4, 5], desc: 'Manage your automated menus and funnels intelligently over FB platforms.' },
  { name: 'Inflera', url: 'https://inflera.com', category_id: 7, intents: [6, 2], personas: [5, 3], desc: 'Infuencer discovery and dynamic marketing growth engine.' },
  { name: 'AI Skill Score', url: 'https://aiskillscore.com', category_id: 4, intents: [5], personas: [6, 1], desc: 'Test and measure your capabilities inside AI ecosystems.' },
  { name: 'TokeAtlas', url: 'https://tokeatlas.com', category_id: 6, intents: [1], personas: [4], desc: 'Real-time interactive mappings of analytical metrics globally.' },
];

const REAL_TOOLS = [
  { name: 'ChatGPT', url: 'https://chat.openai.com', category_id: 4 },
  { name: 'Midjourney', url: 'https://midjourney.com', category_id: 3 },
  { name: 'Notion AI', url: 'https://notion.so', category_id: 10 },
  { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category_id: 5 },
  { name: 'Jasper', url: 'https://jasper.ai', category_id: 1 },
  { name: 'Runway', url: 'https://runwayml.com', category_id: 2 },
  { name: 'Suno', url: 'https://suno.com', category_id: 9 },
  { name: 'Zapier', url: 'https://zapier.com', category_id: 8 },
  { name: 'Tableau AI', url: 'https://tableau.com', category_id: 6 },
  { name: 'Copy.ai', url: 'https://copy.ai', category_id: 7 },
];

const prefixes = ["Auto", "Smart", "Geni", "Pro", "Quick", "Deep", "Next", "Flow", "Synthe", "Zen", "Hyper", "Vibe", "Cogni"];
const suffixes = ["Bot", "AI", "Gen", "Craft", "Mind", "Flow", "Sync", "Mate", "Base", "ify", "ly", "Forge"];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getRandomItems(arr, max) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * max) + 1).map(i => i.id);
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

CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, name_tr TEXT NOT NULL, name_en TEXT NOT NULL, name_es TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS intents (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, name_tr TEXT NOT NULL, name_en TEXT NOT NULL, name_es TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS personas (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, name_tr TEXT NOT NULL, name_en TEXT NOT NULL, name_es TEXT NOT NULL);

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
    sql += `INSERT INTO categories (id, slug, name_tr, name_en, name_es) VALUES (${c.id}, '${c.slug}', '${c.tr}', '${c.en}', '${c.es}');\n`;
}
for (const i of INTENTS) {
    sql += `INSERT INTO intents (id, slug, name_tr, name_en, name_es) VALUES (${i.id}, '${i.slug}', '${i.tr}', '${i.en}', '${i.es}');\n`;
}
for (const p of PERSONAS) {
    sql += `INSERT INTO personas (id, slug, name_tr, name_en, name_es) VALUES (${p.id}, '${p.slug}', '${p.tr}', '${p.en}', '${p.es}');\n`;
}

let idCounter = 1;

// 1. Insert Special Tools & set as recommended
for (const tool of SPECIAL_TOOLS) {
    const slug = generateSlug(tool.name);
    const purpose = 'Advanced Toolchain';
    sql += `INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (${idCounter}, '${tool.name}', '${slug}', '${tool.url}', '${tool.desc}', '${purpose}', ${tool.category_id}, 0, 1);\n`;
    for (const intent_id of tool.intents) {
        sql += `INSERT INTO website_intents (website_id, intent_id) VALUES (${idCounter}, ${intent_id});\n`;
    }
    for (const persona_id of tool.personas) {
        sql += `INSERT INTO website_personas (website_id, persona_id) VALUES (${idCounter}, ${persona_id});\n`;
    }
    sql += `INSERT INTO recommended_websites (website_id, is_active) VALUES (${idCounter}, 1);\n`;
    idCounter++;
}

// 2. Insert Real Tools
for (const tool of REAL_TOOLS) {
    const slug = generateSlug(tool.name);
    const purpose = 'Industry Leader';
    const cObj = CATEGORIES.find(c => c.id === tool.category_id);
    const desc = `${tool.name} is a powerful solution tailored for ${cObj.en.toLowerCase()} processes using artificial intelligence.`;
    
    sql += `INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (${idCounter}, '${tool.name}', '${slug}', '${tool.url}', '${desc}', '${purpose}', ${tool.category_id}, 0, 1);\n`;
    
    const intentIds = getRandomItems(INTENTS, 2);
    const personaIds = getRandomItems(PERSONAS, 3);
    for (const intent_id of intentIds) {
        sql += `INSERT INTO website_intents (website_id, intent_id) VALUES (${idCounter}, ${intent_id});\n`;
    }
    for (const persona_id of personaIds) {
        sql += `INSERT INTO website_personas (website_id, persona_id) VALUES (${idCounter}, ${persona_id});\n`;
    }
    idCounter++;
}

// 3. Generate 1000 Mock AI tools (100 per category)
for (const category of CATEGORIES) {
    for (let i = 0; i < 100; i++) {
        const pfx = getRandomItem(prefixes);
        const sfx = getRandomItem(suffixes);
        const name = `${pfx}${sfx} ${Math.floor(Math.random() * 10) > 6 ? 'Pro' : ''}`.trim();
        const slug = generateSlug(name) + '-' + Math.floor(Math.random() * 10000);
        const url = `https://${slug}.com`;
        
        let desc = `An incredibly advanced AI tool revolutionizing the way you handle ${category.en.toLowerCase()}. Try ${name} today.`;
        if (i % 3 === 0) desc = `Enhance your productivity with ${name}. Perfect for seamless ${category.en.toLowerCase()} automation.`;
        
        const purpose = i % 2 === 0 ? 'Productivity Engine' : 'Creative Studio';
        
        nameEscaped = name.replace(/'/g, "''");
        descEscaped = desc.replace(/'/g, "''");
        
        sql += `INSERT INTO websites (id, name, slug, url, short_description, purpose, category_id, click_count, is_active) VALUES (${idCounter}, '${nameEscaped}', '${slug}', '${url}', '${descEscaped}', '${purpose}', ${category.id}, 0, 1);\n`;
        
        const intentIds = getRandomItems(INTENTS, 2);
        const personaIds = getRandomItems(PERSONAS, 2);
        for (const intent_id of intentIds) {
            sql += `INSERT INTO website_intents (website_id, intent_id) VALUES (${idCounter}, ${intent_id});\n`;
        }
        for (const persona_id of personaIds) {
            sql += `INSERT INTO website_personas (website_id, persona_id) VALUES (${idCounter}, ${persona_id});\n`;
        }
        idCounter++;
    }
}

fs.writeFileSync('seed_tools.sql', sql);
console.log('✅ Generated V2 seed_tools.sql with relational schema and', idCounter - 1, 'items.');

