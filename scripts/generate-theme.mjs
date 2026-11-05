import { register } from 'node:module';
import { writeFileSync } from 'node:fs';

register('./resolve-extensions.mjs', import.meta.url);

const { Hct, MaterialDynamicColors, SchemeTonalSpot, argbFromHex, customColor, hexFromArgb } =
  await import('@material/material-color-utilities');

const SEED = '#6750A4';

const GENDER_COLORS = [
  { name: 'female', value: argbFromHex('#C2185B'), blend: true },
  { name: 'male', value: argbFromHex('#1565C0'), blend: true },
  { name: 'unisex', value: argbFromHex('#8A7A00'), blend: true },
];

const ROLES = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'outline',
  'outlineVariant',
  'inverseSurface',
  'inverseOnSurface',
  'inversePrimary',
  'surfaceTint',
  'shadow',
  'scrim',
];

function kebab(name) {
  return name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

function schemeVariables(isDark) {
  const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(SEED)), isDark, 0);
  const colors = new MaterialDynamicColors();
  const lines = ROLES.map(
    (role) => `--md-sys-color-${kebab(role)}: ${hexFromArgb(colors[role]().getArgb(scheme))};`,
  );

  for (const custom of GENDER_COLORS) {
    const { color, light, dark } = customColor(argbFromHex(SEED), custom);
    const group = isDark ? dark : light;
    lines.push(
      `--gender-${color.name}: ${hexFromArgb(group.color)};`,
      `--gender-on-${color.name}: ${hexFromArgb(group.onColor)};`,
      `--gender-${color.name}-container: ${hexFromArgb(group.colorContainer)};`,
      `--gender-on-${color.name}-container: ${hexFromArgb(group.onColorContainer)};`,
    );
  }

  return lines.join('\n  ');
}

const css = `:root {\n  ${schemeVariables(false)}\n}\n\n:root[data-theme='dark'] {\n  ${schemeVariables(true)}\n}\n`;

writeFileSync(new URL('../src/styles/theme.css', import.meta.url), css);
