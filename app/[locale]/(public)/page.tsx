import Link from 'next/link';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

import SearchForm from '@/components/booking/SearchForm';
import AvailabilityGrid, {AvailabilityItem} from '@/components/booking/AvailabilityGrid';
import ExtrasSelector from '@/components/booking/ExtrasSelector';
import Summary from '@/components/booking/Summary';
import PaymentWidget from '@/components/booking/PaymentWidget';

const mockRooms: AvailabilityItem[] = [
  {
    id: 'suite-mare',
    name: 'Suite Mare',
    description: '50 mq, balcone sul golfo, colazione inclusa',
    price: '€ 320 / notte',
    refundable: true
  },
  {
    id: 'junior-giardino',
    name: 'Junior Suite Giardino',
    description: '35 mq, patio privato, smart working desk',
    price: '€ 240 / notte',
    refundable: true
  }
];

const mockExtras = [
  {id: 'late', name: 'Late checkout', price: '€ 40', perNight: false},
  {id: 'parking', name: 'Parcheggio custodito', price: '€ 20', perNight: true}
];

export default function HomePage() {
  const t = useTranslations();
  const search = {checkIn: '2024-07-10', checkOut: '2024-07-15', guests: 2};

  return (
    <div>
      <section className="hero">
        <div className="container-page grid gap-8 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="badge">Boutique Guest House</p>
            <h1 className="mt-4 text-4xl font-bold text-primary-800 md:text-5xl">{t('hero_title')}</h1>
            <p className="mt-4 text-lg text-primary-700">{t('hero_subtitle')}</p>
            <div className="mt-6 flex gap-4">
              <Link href="/prenota" className="btn-primary">
                {t('cta_book')}
              </Link>
              <Link href="/esplora" className="btn-secondary">
                {t('cta_discover')}
              </Link>
            </div>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-xl">
            <Image src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad" alt="Terrazza vista mare" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="text-3xl font-semibold text-primary-800">{t('section_rooms_title')}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {mockRooms.map((room) => (
              <div key={room.id} className="card p-5">
                <p className="text-xl font-semibold text-primary-800">{room.name}</p>
                <p className="text-sm text-primary-600">{room.description}</p>
                <p className="mt-3 text-lg font-bold text-primary-700">{room.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-primary-800">{t('section_booking_title')}</h2>
            <p className="mt-2 text-primary-700">Wizard semplificato per ricerca disponibilità, extra e pagamento sicuro.</p>
            <div className="mt-4 space-y-4">
              <SearchForm />
              <AvailabilityGrid rooms={mockRooms} search={search} />
              <ExtrasSelector extras={mockExtras} />
            </div>
          </div>
          <div className="space-y-4">
            <Summary search={search} />
            <PaymentWidget />
          </div>
        </div>
      </section>
    </div>
  );
}
