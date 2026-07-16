// @ts-check
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://onoma.anmitali.dev',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
