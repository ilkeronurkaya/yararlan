import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';

async function fetchProductHuntFeed() {
  try {
    const response = await fetch('https://www.producthunt.com/feed');
    const xml = await response.text();
    const result = await xml2js.parseStringPromise(xml);
    
    // The feed is Atom format
    const entries = result.feed.entry || [];
    const tools: any[] = [];

    entries.forEach((entry: any) => {
      // Typically title is format: Tool Name - Description
      const rawTitle = entry.title[0];
      const link = entry.link[0].$.href;
      // Strip HTML from content
      let content = entry.content[0]._ || '';
      content = content.replace(/<[^>]*>?/gm, '').trim();
      
      // AI pseudo-categorization based on title and content keywords
      let category_id = 1; // Default to 'İçerik Üretimi' (1)
      const lowerText = (rawTitle + ' ' + content).toLowerCase();
      
      if (lowerText.includes('video') || lowerText.includes('film') || lowerText.includes('youtube')) {
        category_id = 2; // Video & Reels
      } else if (lowerText.includes('design') || lowerText.includes('image') || lowerText.includes('photo')) {
        category_id = 3; // Görsel Tasarım
      } else if (lowerText.includes('code') || lowerText.includes('dev') || lowerText.includes('api') || lowerText.includes('github') || lowerText.includes('programming')) {
        category_id = 5; // Kodlama
      } else if (lowerText.includes('data') || lowerText.includes('analytics') || lowerText.includes('dashboard')) {
        category_id = 6; // Veri & Dashboard
      } else if (lowerText.includes('marketing') || lowerText.includes('seo') || lowerText.includes('sales')) {
        category_id = 7; // Pazarlama
      } else if (lowerText.includes('automate') || lowerText.includes('agent') || lowerText.includes('workflow')) {
        category_id = 8; // Otomasyon
      } else if (lowerText.includes('audio') || lowerText.includes('music') || lowerText.includes('sound') || lowerText.includes('voice')) {
        category_id = 9; // Ses & Müzik
      } else if (lowerText.includes('presentation') || lowerText.includes('slide')) {
        category_id = 10; // Sunum
      }
      
      const slug = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      tools.push({
        name: rawTitle.substring(0, 50),
        slug: slug.substring(0, 50),
        url: link,
        short_description: content.substring(0, 200),
        category_id: category_id
      });
    });

    console.log(`Successfully fetched ${tools.length} products from ProductHunt RSS!`);
    
    // Generate SQL query
    let sqlOutput = `-- Auto-generated SQL Seed from ProductHunt Top Tools\n\n`;
    sqlOutput += `INSERT INTO websites (category_id, name, slug, url, short_description, purpose, pricing_type, turkish_support, rating_score, click_count, is_active)\nVALUES\n`;
    
    const values = tools.map(t => {
      // Escape single quotes for SQL
      const n = t.name.replace(/'/g, "''");
      const s = t.slug.replace(/'/g, "''");
      const u = t.url.replace(/'/g, "''");
      const desc = t.short_description.replace(/'/g, "''");
      return `(${t.category_id}, '${n}', '${s}', '${u}', '${desc}', 'Daily Discovery', 'Free', 0, 8.5, ROUND(ABS(RANDOM() % 5000) + 1000), 1)`;
    });

    sqlOutput += values.join(',\n') + ';\n';

    const buildPath = path.join(__dirname, '../api-worker/ph-seed.sql');
    fs.writeFileSync(buildPath, sqlOutput);
    console.log(`Saved SQL migration file to: ${buildPath}`);
    console.log(`Run: cd api-worker && npx wrangler d1 execute DB --local --file=ph-seed.sql`);

  } catch (error) {
    console.error("Failed to scrape ProductHunt feed:", error);
  }
}

fetchProductHuntFeed();
