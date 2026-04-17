import { Hono } from 'hono';
import { cors } from 'hono/cors';

export interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.use('/api/*', cors({
  origin: 'https://yararlan.com',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

const getBaseSelect = () => `
SELECT 
  w.id, w.name, w.slug, w.url, w.short_description, w.purpose, w.click_count, w.is_active,
  w.turkish_support, w.pricing_type, w.rating_score, w.monthly_visits, w.tags,
  JSON_OBJECT('id', c.id, 'slug', c.slug, 'name_tr', c.name_tr, 'name_en', c.name_en, 'name_es', c.name_es) as category,
  (SELECT JSON_GROUP_ARRAY(JSON_OBJECT('id', i.id, 'slug', i.slug, 'name_tr', i.name_tr, 'name_en', i.name_en, 'name_es', i.name_es)) 
   FROM website_intents wi JOIN intents i ON wi.intent_id = i.id WHERE wi.website_id = w.id) as intents,
  (SELECT JSON_GROUP_ARRAY(JSON_OBJECT('id', p.id, 'slug', p.slug, 'name_tr', p.name_tr, 'name_en', p.name_en, 'name_es', p.name_es)) 
   FROM website_personas wp JOIN personas p ON wp.persona_id = p.id WHERE wp.website_id = w.id) as personas
FROM websites w
LEFT JOIN categories c ON w.category_id = c.id
`;

app.get('/api/websites', async (c) => {
  const q = c.req.query('q');
  const category_id = c.req.query('category_id');
  const intent_id = c.req.query('intent_id');
  const persona_id = c.req.query('persona_id');
  const pageParam = c.req.query('page');
  
  const page = parseInt(pageParam || '1', 10);
  const limit = 20;
  const offset = (page > 0 ? page - 1 : 0) * limit;

  let query = getBaseSelect() + ' WHERE w.is_active = 1 ';
  const params: any[] = [];
  
  if (q) {
    query += ' AND (w.name LIKE ? OR w.short_description LIKE ?)';
    params.push(`%${q}%`, `%${q}%`);
  }
  
  if (category_id) {
    query += ' AND w.category_id = ?';
    params.push(category_id);
  }

  if (intent_id) {
    const intentIds = intent_id.split(',').map(id => parseInt(id, 10));
    const placeholders = intentIds.map(() => '?').join(',');
    query += ` AND w.id IN (SELECT website_id FROM website_intents WHERE intent_id IN (${placeholders}))`;
    params.push(...intentIds);
  }

  if (persona_id) {
    const personaIds = persona_id.split(',').map(id => parseInt(id, 10));
    const placeholders = personaIds.map(() => '?').join(',');
    query += ` AND w.id IN (SELECT website_id FROM website_personas WHERE persona_id IN (${placeholders}))`;
    params.push(...personaIds);
  }
  
  query += ` ORDER BY w.click_count DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);
  
  try {
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    if (!results || results.length === 0) {
      return c.json({ data: [] }, 200);
    }

    // Safely parse JSON strings back into objects (SQLite returns JSON as strings)
    const data = results.map((row: any) => ({
      ...row,
      category: row.category ? JSON.parse(row.category) : null,
      intents: row.intents ? JSON.parse(row.intents) : [],
      personas: row.personas ? JSON.parse(row.personas) : [],
    }));

    return c.json({ data });
  } catch (error: any) {
    return c.json({ error: 'Database querying failure: ' + error.message }, 500);
  }
});

app.get('/api/websites/:slug', async (c) => {
  const slug = c.req.param('slug');
  if (!slug) return c.json({ error: 'Missing slug parameter' }, 400);

  try {
    const query = getBaseSelect() + ' WHERE w.slug = ? AND w.is_active = 1';
    const row: any = await c.env.DB.prepare(query).bind(slug).first();
      
    if (!row) return c.json({ error: 'Resource not found' }, 404);
    
    row.category = row.category ? JSON.parse(row.category) : null;
    row.intents = row.intents ? JSON.parse(row.intents) : [];
    row.personas = row.personas ? JSON.parse(row.personas) : [];

    return c.json(row);
  } catch(error: any) {
    return c.json({ error: 'Database fetching failure: ' + error.message }, 500);
  }
});

app.get('/api/recommended', async (c) => {
  try {
    const query = `
      SELECT rw.id as rec_id, rw.created_at, rw.is_active as rec_active, w.* 
      FROM recommended_websites rw
      JOIN (${getBaseSelect()}) w ON rw.website_id = w.id
      WHERE rw.is_active = 1
      ORDER BY rw.created_at DESC
    `;
    const { results } = await c.env.DB.prepare(query).all();
    
    if (!results) return c.json({ data: [] }, 200);

    const data = results.map((row: any) => ({
      ...row,
      category: row.category ? JSON.parse(row.category) : null,
      intents: row.intents ? JSON.parse(row.intents) : [],
      personas: row.personas ? JSON.parse(row.personas) : [],
    }));

    return c.json({ data });
  } catch(error: any) {
    return c.json({ error: 'Database fetching failure: ' + error.message }, 500);
  }
});

app.post('/api/recommended', async (c) => {
  try {
    const body: any = await c.req.json();
    if (!body || !body.website_id) return c.json({ error: 'website_id is required' }, 400);

    // Get the oldest active recommended site and deactivate it
    await c.env.DB.prepare(`
      UPDATE recommended_websites 
      SET is_active = 0 
      WHERE id IN (
        SELECT id FROM recommended_websites 
        WHERE is_active = 1 
        ORDER BY created_at ASC 
        LIMIT 1
      )
    `).run();

    // Insert the new recommended site
    await c.env.DB.prepare('INSERT INTO recommended_websites (website_id, is_active) VALUES (?, 1)')
      .bind(body.website_id)
      .run();

    return c.json({ success: true }, 201);
  } catch (error: any) {
    return c.json({ error: 'Database mutation failure: ' + error.message }, 500);
  }
});

app.post('/api/suggest', async (c) => {
  try {
    const body: any = await c.req.json();
    if (!body || !body.website_name) return c.json({ error: 'Invalid payload: Website name is required' }, 400);

    await c.env.DB.prepare('INSERT INTO suggested_tools (website_name) VALUES (?)')
      .bind(body.website_name)
      .run();

    return c.json({ success: true }, 201);
  } catch (error: any) {
    return c.json({ error: 'Database mutation failure: ' + error.message }, 500);
  }
});

app.post('/api/click', async (c) => {
  try {
    const body: any = await c.req.json();
    if (!body || !body.slug) return c.json({ error: 'Invalid payload: Slug is required' }, 400);

    const result = await c.env.DB.prepare('UPDATE websites SET click_count = click_count + 1 WHERE slug = ? AND is_active = 1')
      .bind(body.slug)
      .run();

    if (result.meta?.changes === 0) {
        return c.json({ error: 'Resource not found or inactive' }, 404);
    }

    return c.json({ success: true }, 200);
  } catch (error: any) {
    return c.json({ error: 'Database mutation failure: ' + error.message }, 500);
  }
});

app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
})

export default app;
