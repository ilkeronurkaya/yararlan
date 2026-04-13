const fs = require('fs');

const CATEGORIES = [
  'İçerik Üretimi', 'Video & Reels', 'Görsel/Tasarım', 'Araştırma & Analiz',
  'Kod & Geliştirme', 'Veri & Dashboard', 'Pazarlama & Growth', 
  'Otomasyon & Agent', 'Ses & Müzik', 'Sunum & Doküman'
];

const INTENTS = [
  'Para Kazan', 'Viral İçerik', 'Zamandan Kazan', 
  'Otomatikleştir', 'Skill Up / Öğren', 'Growth Hack'
];

const PERSONAS = [
  'Developer', 'Designer', 'Content Creator', 
  'Founder / Girişimci', 'Marketer', 'Öğrenci'
];

const SPECIAL_TOOLS = [
    { name: 'FB Menu', url: 'https://fbmenu.com', category: 'Otomasyon & Agent', intent: 'Otomatikleştir,Para Kazan', persona: 'Founder / Girişimci,Marketer', desc: 'Manage your automated menus and funnels intelligently over FB platforms.' },
    { name: 'Inflera', url: 'https://inflera.com', category: 'Pazarlama & Growth', intent: 'Growth Hack,Viral İçerik', persona: 'Marketer,Content Creator', desc: 'Infuencer discovery and dynamic marketing growth engine.' },
    { name: 'AI Skill Score', url: 'https://aiskillscore.com', category: 'Araştırma & Analiz', intent: 'Skill Up / Öğren', persona: 'Öğrenci,Developer', desc: 'Test and measure your capabilities inside AI ecosystems.' },
    { name: 'TokeAtlas', url: 'https://tokeatlas.com', category: 'Veri & Dashboard', intent: 'Para Kazan', persona: 'Founder / Girişimci', desc: 'Real-time interactive mappings of analytical metrics globally.' },
];

const REAL_TOOLS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com', category: 'Araştırma & Analiz' },
    { name: 'Midjourney', url: 'https://midjourney.com', category: 'Görsel/Tasarım' },
    { name: 'Notion AI', url: 'https://notion.so', category: 'Sunum & Doküman' },
    { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'Kod & Geliştirme' },
    { name: 'Jasper', url: 'https://jasper.ai', category: 'İçerik Üretimi' },
    { name: 'Runway', url: 'https://runwayml.com', category: 'Video & Reels' },
    { name: 'Suno', url: 'https://suno.com', category: 'Ses & Müzik' },
    { name: 'Zapier', url: 'https://zapier.com', category: 'Otomasyon & Agent' },
    { name: 'Tableau AI', url: 'https://tableau.com', category: 'Veri & Dashboard' },
    { name: 'Copy.ai', url: 'https://copy.ai', category: 'Pazarlama & Growth' },
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
    return shuffled.slice(0, Math.floor(Math.random() * max) + 1).join(',');
}

let sql = `
-- Yararlan Bulk Seed Migration
DELETE FROM websites;
DELETE FROM sqlite_sequence WHERE name='websites';

`;

let idCounter = 1;

// 1. Insert Special Tools
for (const tool of SPECIAL_TOOLS) {
    const slug = generateSlug(tool.name);
    const purpose = 'Advanced Toolchain';
    sql += `INSERT INTO websites (id, name, slug, url, short_description, purpose, category, intent_tags, persona_tags, click_count, is_active, is_featured) VALUES (${idCounter}, '${tool.name}', '${slug}', '${tool.url}', '${tool.desc}', '${purpose}', '${tool.category}', '${tool.intent}', '${tool.persona}', 9999, 1, 1);\n`;
    idCounter++;
}

// 2. Insert Real Tools
for (const tool of REAL_TOOLS) {
    const slug = generateSlug(tool.name);
    const purpose = 'Industry Leader';
    const desc = `${tool.name} is a powerful solution tailored for ${tool.category.toLowerCase()} processes using artificial intelligence.`;
    const intent = getRandomItems(INTENTS, 2);
    const persona = getRandomItems(PERSONAS, 3);
    const clicks = Math.floor(Math.random() * 50000) + 1000;
    sql += `INSERT INTO websites (id, name, slug, url, short_description, purpose, category, intent_tags, persona_tags, click_count, is_active, is_featured) VALUES (${idCounter}, '${tool.name}', '${slug}', '${tool.url}', '${desc}', '${purpose}', '${tool.category}', '${intent}', '${persona}', ${clicks}, 1, 0);\n`;
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
        
        let desc = `An incredibly advanced AI tool revolutionizing the way you handle ${category.toLowerCase()}. Try ${name} today.`;
        if (i % 3 === 0) desc = `Enhance your productivity with ${name}. Perfect for seamless ${category.toLowerCase()} automation.`;
        
        const purpose = i % 2 === 0 ? 'Productivity Engine' : 'Creative Studio';
        const intent = getRandomItems(INTENTS, 2);
        const persona = getRandomItems(PERSONAS, 2);
        const clicks = Math.floor(Math.random() * 5000) + 50;

        // Escape quotes
        nameEscaped = name.replace(/'/g, "''");
        descEscaped = desc.replace(/'/g, "''");
        
        sql += `INSERT INTO websites (id, name, slug, url, short_description, purpose, category, intent_tags, persona_tags, click_count, is_active, is_featured) VALUES (${idCounter}, '${nameEscaped}', '${slug}', '${url}', '${descEscaped}', '${purpose}', '${category}', '${intent}', '${persona}', ${clicks}, 1, 0);\n`;
        idCounter++;
    }
}

fs.writeFileSync('seed_tools.sql', sql);
console.log('✅ Generated seed_tools.sql with', idCounter - 1, 'items.');
