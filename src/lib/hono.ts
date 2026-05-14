import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getDb } from './db';
import { contacts } from '../db/schema';
import { randomUUID } from 'node:crypto';

// ---------------------------------------------------------------------------
// Validation schema (shared with the React form via Zod)
// ---------------------------------------------------------------------------
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// Hono app – type-safe bindings so `c.env` is fully typed
// ---------------------------------------------------------------------------
type Bindings = Cloudflare.Env;

const app = new Hono<{ Bindings: Bindings }>();

// POST /api/contact  – save a contact form submission
app.post('/api/contact', zValidator('json', contactSchema), async (c) => {
  const { name, email, message } = c.req.valid('json');

  try {
    const db = getDb(c.env);

    await db.insert(contacts).values({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('[contact] insert failed:', err);
    return c.json(
      { success: false, message: 'Failed to save your message. Please try again.' },
      500
    );
  }
});

// GET /api/contacts  – list all submissions (handy for admin / testing)
app.get('/api/contacts', async (c) => {
  try {
    const db = getDb(c.env);
    const rows = await db.select().from(contacts).orderBy(contacts.createdAt);
    return c.json({ success: true, data: rows });
  } catch (err) {
    console.error('[contacts] select failed:', err);
    return c.json({ success: false, message: 'Failed to fetch contacts.' }, 500);
  }
});

// Health-check
app.get('/api/health', (c) => c.json({ ok: true }));

export { app };
