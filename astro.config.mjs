// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  output: 'server', // Ensures Server-Side Rendering (SSR) is active so you can query D1
  integrations: [react(), sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});