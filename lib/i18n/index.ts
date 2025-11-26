import it from './locales/it.json';
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';

export const locales = ['it', 'en', 'de', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'it';

const messagesMap: Record<Locale, Record<string, string>> = {
  it,
  en,
  de,
  fr
};

export function getMessagesForLocale(locale: string | undefined) {
  if (locale && locales.includes(locale as Locale)) {
    return messagesMap[locale as Locale];
  }
  return messagesMap[defaultLocale];
}
