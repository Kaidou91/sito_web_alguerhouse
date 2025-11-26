'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from '@/components/ui/NavigationMenu';

export default function Header() {
  const t = useTranslations();
  const navItems = [
    {href: '/camere', label: t('nav_rooms')},
    {href: '/servizi', label: t('nav_services')},
    {href: '/esplora', label: t('nav_explore')},
    {href: '/gallery', label: t('nav_gallery')},
    {href: '/faq', label: t('nav_faq')},
    {href: '/contatti', label: t('nav_contact')},
    {href: '/prenota', label: t('nav_booking')}
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-primary-100 bg-white/90 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <Link href="/" className="text-xl font-bold text-primary-700">
          Alguer House
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="hidden gap-4 text-sm font-semibold md:flex">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} className="rounded-full px-3 py-2 transition hover:bg-primary-50">
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-3">
          <Link href="/prenota" className="btn-primary text-sm">
            {t('cta_book')}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
