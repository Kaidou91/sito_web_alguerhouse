import './globals.css';
import {Lora, Montserrat} from 'next/font/google';
import {ReactNode} from 'react';

const lora = Lora({subsets: ['latin'], variable: '--font-lora'});
const montserrat = Montserrat({subsets: ['latin'], variable: '--font-montserrat'});

export const metadata = {
  title: 'Alguer House Experience',
  description: 'Boutique guest house ad Alghero con motore di prenotazione integrato'
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="it" className={`${lora.variable} ${montserrat.variable}`}>
      <body className="bg-secondary-50 text-primary-900">{children}</body>
    </html>
  );
}
