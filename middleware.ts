import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

import routing from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

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
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
