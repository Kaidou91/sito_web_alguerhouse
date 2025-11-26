import {useTranslations} from 'next-intl';

const rooms = [
  {name: 'Suite Mare', details: 'Vista mare, balcone, 50 mq'},
  {name: 'Junior Suite Giardino', details: 'Patio, 35 mq, desk'},
  {name: 'Camera Comfort', details: 'Letto queen, 25 mq'},
  {name: 'Studio Urbano', details: 'Monolocale con angolo cucina'}
];

export default function CamerePage() {
  const t = useTranslations();
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">{t('nav_rooms')}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rooms.map((room) => (
          <div key={room.name} className="card p-5">
            <p className="text-xl font-semibold text-primary-800">{room.name}</p>
            <p className="text-sm text-primary-600">{room.details}</p>
            <p className="mt-3 text-primary-700">Politiche flessibili, extra personalizzabili e pagamento sicuro.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
