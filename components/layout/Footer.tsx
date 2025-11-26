import Link from 'next/link';
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const links = [
    {href: '/privacy', label: t('privacy_title')},
    {href: '/termini', label: t('terms_title')}
  ];

  return (
    <footer className="mt-10 border-t border-primary-100 bg-white">
      <div className="container-page grid gap-6 py-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-lg font-semibold text-primary-700">Alguer House</p>
          <p className="mt-2 text-sm text-primary-600">Lungomare Dante 12, Alghero (SS)</p>
          <p className="text-sm text-primary-600">+39 079 123456 • info@alguer.house</p>
          <p className="mt-4 text-sm">{t('footer_cta')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-primary-700 underline-offset-4 hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
