import routing from './routing';
import {getMessagesForLocale} from '@/lib/i18n';

export default async function getRequestConfig() {
  return {
    ...routing,
    locale: routing.defaultLocale,
    messages: getMessagesForLocale(routing.defaultLocale)
  };
}
