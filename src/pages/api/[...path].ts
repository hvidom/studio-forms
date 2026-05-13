// src/pages/api/[...path].ts
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import api from '@/lib/api';

export const ALL: APIRoute = async ({ request }) => {
  return api.fetch(request, env);
};
