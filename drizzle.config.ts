import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  strict: true,
  verbose: true,
  ...(isProd
    ? {
        driver: 'd1-http',
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID!,
          token: process.env.CLOUDFLARE_D1_TOKEN!,
        },
      }
    : {
        dbCredentials: {
          url: 'file:./src/db/local.db', // matches repo convention
        },
      }),
});

/// drizzle.config.ts
/// import { defineConfig } from 'drizzle-kit';

/// export default defineConfig({
/// schema: './src/db/schema.ts',
/// out: './drizzle',
///dialect: 'sqlite',
/// dbCredentials: {
///   url: 'file:./src/db/local.db', // This creates the file right here!
///  },
/// });
