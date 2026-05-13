// src/lib/api.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getDb } from '@/db/client';
import { contacts } from '@/db/schema';

// Matches the bindings in worker-configuration.d.ts
type Bindings = {
  d1_prod: D1Database;
};

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const api = new Hono<{ Bindings: Bindings }>();

// POST /api/contact
api.post(
  '/contact',
  zValidator('json', contactSchema),
  async (c) => {
    const data = c.req.valid('json');
    const db = getDb(c.env.d1_prod);

    try {
      const results = await db
        .insert(contacts)
        .values(data)
        .returning({ id: contacts.id });

      const result = results[0];

      if (!result) {
        return c.json({ success: false, error: 'Insert returned no data' }, 500);
      }

      return c.json({ success: true, id: result.id }, 201);
    } catch (err) {
      console.error('[contact] insert failed:', err);
      return c.json({ success: false, error: 'Failed to save submission' }, 500);
    }
  }
);

// GET /api/contact — list all (useful for admin/debug)
api.get('/contact', async (c) => {
  const db = getDb(c.env.d1_prod);
  const rows = await db.select().from(contacts).orderBy(contacts.id);
  return c.json({ success: true, data: rows });
});

export default api;
