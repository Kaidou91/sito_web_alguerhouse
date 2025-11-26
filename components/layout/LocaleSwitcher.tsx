'use client';

import {usePathname, useRouter} from 'next/navigation';
import {ChangeEvent} from 'react';
import {locales} from '@/lib/i18n';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split('/')[1] || 'it';

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as (typeof locales)[number])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push('/' + segments.join('/'));
  };

  return (
    <select
      aria-label="Language switcher"
      onChange={handleChange}
      value={currentLocale}
      className="rounded-full border border-primary-100 bg-white px-3 py-2 text-sm shadow-sm"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
