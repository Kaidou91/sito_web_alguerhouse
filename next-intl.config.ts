import routing from './i18n/routing';
import {getMessagesForLocale} from './lib/i18n';

export const {locales, defaultLocale, localePrefix} = routing;

export default async function getRequestConfig() {
  return {
    ...routing,
    locale: routing.defaultLocale,
    messages: getMessagesForLocale(routing.defaultLocale)
  };
}
