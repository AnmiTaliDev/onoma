import en from './en';

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, typeof en> = { en };

type Key = keyof typeof en;

export function useTranslations(locale: Locale = defaultLocale) {
  const dict = dictionaries[locale];
  return function t(key: Key, vars?: Record<string, string | number>): string {
    let str: string = dict[key];
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        str = str.replace(`{${name}}`, String(value));
      }
    }
    return str;
  };
}
