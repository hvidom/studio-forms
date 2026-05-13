// src/pages/api/users.ts
import type { APIRoute } from 'astro';
import { flattenError } from 'zod';
import { env } from 'cloudflare:workers';
import { getDb } from '@/db';
import { users } from '@/db/schema';
import { userPayloadSchema } from '@/lib/userPayloadSchema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const d1 = env.d1_prod;
    if (!d1) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'D1 binding d1_prod is missing. Check wrangler.jsonc and run wrangler types.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = getDb(d1);
    const parsed = userPayloadSchema.safeParse(await request.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, error: flattenError(parsed.error) }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const data = parsed.data;

    // Insert into D1 via Drizzle
    const newUser = await db.insert(users).values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      city: data.city || null,
      zipcode: data.zipcode || null,
    }).returning(); // .returning() gives you back the inserted row

    return new Response(
      JSON.stringify({ success: true, user: newUser }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
