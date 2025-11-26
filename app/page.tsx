import {redirect} from 'next/navigation';

import {defaultLocale} from '@/lib/i18n';

export default function IndexRedirect() {
  console.info('[index] redirecting to default locale', {defaultLocale});
  redirect(`/${defaultLocale}`);
}
