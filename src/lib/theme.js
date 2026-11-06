import {
  Hct,
  MaterialDynamicColors,
  SchemeTonalSpot,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';

export const DEFAULT_SEED = '#6750A4';

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

function schemeVariables(seed, isDark) {
  const source = argbFromHex(seed);
  const scheme = new SchemeTonalSpot(Hct.fromInt(source), isDark, 0);
  const colors = new MaterialDynamicColors();
  return ROLES.map(
    (role) => `--md-sys-color-${kebab(role)}: ${hexFromArgb(colors[role]().getArgb(scheme))};`,
  ).join('\n  ');
}

export function themeCss(seed, root = ':root') {
  return `${root} {\n  ${schemeVariables(seed, false)}\n}\n\n${root}[data-theme='dark'] {\n  ${schemeVariables(seed, true)}\n}\n`;
}
