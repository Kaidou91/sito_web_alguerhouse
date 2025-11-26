import createMiddleware from 'next-intl/middleware';
import {defaultLocale, locales} from './lib/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
});

export const config = {
  matcher: [
    '/',
    '/(it|en|de|fr)/:path*',
    '/((?!api|_next|.*\\..*).*)'
  ]
};
