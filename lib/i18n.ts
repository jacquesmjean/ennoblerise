export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import es from '@/messages/es.json';

const dictionaries = { en, fr, es } as const;

export type Dict = typeof en;

export function getDict(locale: string): Dict {
  return (dictionaries as Record<string, Dict>)[locale] ?? dictionaries.en;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
