// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// GitHub Pages project site. For a custom domain: set `site` to it and drop `base`.
export default defineConfig({
  site: 'https://haswelldev.github.io',
  base: '/guides',
  trailingSlash: 'always',
  integrations: [mdx()],
});
