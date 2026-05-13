// src/pages/api/[...path].ts
import type { APIRoute } from 'astro';
import api from '@/lib/api';

// Forward every /api/* request to Hono
export const ALL: APIRoute = async ({ request, locals }) => {
  // Hono needs the env bindings (D1, etc.) — pass via executionCtx
  return api.fetch(request, locals.runtime.env);
};
