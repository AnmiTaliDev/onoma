import { register } from 'node:module';
import { writeFileSync } from 'node:fs';

register('./resolve-extensions.mjs', import.meta.url);

const { DEFAULT_SEED, themeCss } = await import('../src/lib/theme.js');

writeFileSync(new URL('../src/styles/theme.css', import.meta.url), themeCss(DEFAULT_SEED));
