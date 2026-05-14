import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';

/**
 * Returns a Drizzle client bound to the D1 database.
 *
 * In development:  Astro's cloudflare adapter `platformProxy` option makes
 *                  `locals.runtime.env.d1_prod` available automatically via
 *                  the wrangler local D1 instance.
 *
 * In production:  The real Cloudflare D1 binding is injected by the runtime.
 *
 * Always pass `locals.runtime.env` from your Astro page / API route.
 */
export function getDb(env: Cloudflare.Env) {
  return drizzle(env.d1_prod, { schema });
}
