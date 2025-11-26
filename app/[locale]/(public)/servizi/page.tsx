import {ShieldCheck, Wifi, Coffee} from 'lucide-react';
import {useTranslations} from 'next-intl';

const services = [
  {icon: Wifi, title: 'Wi-Fi fibra & Smart TV'},
  {icon: ShieldCheck, title: 'Self check-in smart lock'},
  {icon: Coffee, title: 'Breakfast box artigianale'}
];

export default function ServiziPage() {
  const t = useTranslations();
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">{t('nav_services')}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {services.map(({icon: Icon, title}) => (
          <div key={title} className="card p-5">
            <Icon className="h-8 w-8 text-primary-600" />
            <p className="mt-3 text-lg font-semibold text-primary-800">{title}</p>
            <p className="text-sm text-primary-600">Disponibili extra: culla, transfer, degustazioni, late checkout.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
