// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import { siteConfig } from './src/site.config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
const SITE = import.meta.env.PROD ? siteConfig.url : 'http://localhost:4321';
// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  output: 'server', // Ensures Server-Side Rendering (SSR) is active so you can query D1
  site: SITE,
  server: {
    port: 4321,
  },
  integrations: [react(), sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});
