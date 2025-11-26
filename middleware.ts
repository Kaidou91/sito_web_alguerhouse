import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

import {defaultLocale, locales} from './lib/i18n';

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
});

export default function middleware(request: NextRequest) {
  const {pathname, search, hostname} = request.nextUrl;
  const acceptedLanguages = request.headers.get('accept-language');

  console.info(
    '[middleware] incoming request',
    JSON.stringify({pathname, search, hostname, acceptedLanguages})
  );

  const response = handleI18nRouting(request);

  const redirectLocation = response.headers.get('location');
  console.info(
    '[middleware] response summary',
    JSON.stringify({
      locale: request.nextUrl.locale,
      status: response?.status,
      hasRedirect: Boolean(redirectLocation),
      redirectLocation
    })
  );

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(it|en|de|fr)/:path*',
    '/((?!api|_next|.*\\..*).*)'
  ]
};
