import {NextIntlClientProvider} from 'next-intl';
import {ReactNode} from 'react';
import {getMessagesForLocale} from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import {HotelJsonLd} from '@/components/layout/SeoStructuredData';

export const metadata = {
  title: 'Alguer House Experience',
  description: 'Sito ufficiale della guest house con prenotazione diretta'
};

export default function LocaleLayout({children, params}: {children: ReactNode; params: {locale: string}}) {
  const messages = getMessagesForLocale(params.locale);

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <body className="min-h-screen bg-secondary-50 text-primary-900">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <HotelJsonLd />
      </body>
    </NextIntlClientProvider>
  );
}
