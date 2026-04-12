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

app.get('/api/websites', async (c) => {
  const q = c.req.query('q');
  const category = c.req.query('category');
  const intent = c.req.query('intent');
  const persona = c.req.query('persona');
  const pageParam = c.req.query('page');
  
  const page = parseInt(pageParam || '1', 10);
  const limit = 20;
  const offset = (page > 0 ? page - 1 : 0) * limit;

  let query = 'SELECT * FROM websites WHERE is_active = 1';
  const params: any[] = [];
  
  if (q) {
    query += ' AND (name LIKE ? OR short_description LIKE ?)';
    params.push(`%${q}%`, `%${q}%`);
  }
  
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (intent) {
    const intents = intent.split(',');
    query += ` AND (${intents.map(() => 'intent_tags LIKE ?').join(' OR ')})`;
    params.push(...intents.map(i => `%${i.trim()}%`));
  }

  if (persona) {
    const personas = persona.split(',');
    query += ` AND (${personas.map(() => 'persona_tags LIKE ?').join(' OR ')})`;
    params.push(...personas.map(p => `%${p.trim()}%`));
  }
  
  // Custom sorting and pagination natively
  query += ` ORDER BY click_count DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);
  
  try {
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    if (!results || results.length === 0) {
      return c.json({ data: [] }, 200);
    }
    return c.json({ data: results });
  } catch (error: any) {
    return c.json({ error: 'Database querying failure: ' + error.message }, 500);
  }
});

app.get('/api/websites/:slug', async (c) => {
  const slug = c.req.param('slug');
  if (!slug) return c.json({ error: 'Missing slug parameter' }, 400);

  try {
    const result = await c.env.DB.prepare('SELECT * FROM websites WHERE slug = ? AND is_active = 1')
      .bind(slug)
      .first();
      
    if (!result) return c.json({ error: 'Resource not found' }, 404);
    
    return c.json(result);
  } catch(error: any) {
    return c.json({ error: 'Database fetching failure: ' + error.message }, 500);
  }
});

app.post('/api/suggest', async (c) => {
  try {
    const body = await c.req.json();
    if (!body || !body.website_name) return c.json({ error: 'Invalid payload: Website name is required' }, 400);

    const result = await c.env.DB.prepare('INSERT INTO suggested_tools (website_name) VALUES (?)')
      .bind(body.website_name)
      .run();

    return c.json({ success: true }, 201);
  } catch (error: any) {
    return c.json({ error: 'Database mutation failure: ' + error.message }, 500);
  }
});

app.post('/api/click', async (c) => {
  try {
    const body = await c.req.json();
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
