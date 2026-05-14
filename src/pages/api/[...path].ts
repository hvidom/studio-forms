// src/pages/api/[...path].ts
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import api from '@/lib/api';

export const ALL: APIRoute = async ({ request }) => {
  return api.fetch(request, env);
};


/**
 * src/pages/api/[...hono].ts
 *
 * Astro catch-all route that delegates every /api/* request to the Hono app.
 * The trick is forwarding `locals.runtime.env` as Hono bindings so that
 * `c.env.d1_prod` is the real D1 binding in both dev and prod.
 */
import { app } from '@/lib/hono';

export const prerender = false;

const handler: APIRoute = async ({ request, locals }) => {
  // Inject Cloudflare bindings into Hono's execution context
  return app.fetch(request, locals.runtime.env);
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
