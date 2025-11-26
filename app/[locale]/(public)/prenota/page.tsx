import AvailabilityGrid, {AvailabilityItem} from '@/components/booking/AvailabilityGrid';
import ExtrasSelector from '@/components/booking/ExtrasSelector';
import PaymentWidget from '@/components/booking/PaymentWidget';
import SearchForm, {SearchPayload} from '@/components/booking/SearchForm';
import Summary from '@/components/booking/Summary';

const rooms: AvailabilityItem[] = [
  {id: 'comfort', name: 'Comfort', description: 'Letto queen, balcone', price: '€ 180 / notte', refundable: true},
  {id: 'studio', name: 'Studio Urbano', description: 'Angolo cucina, city view', price: '€ 150 / notte', refundable: false}
];

const extras = [
  {id: 'culla', name: 'Culla', price: '€ 15', perNight: true},
  {id: 'degustazione', name: 'Degustazione vini', price: '€ 60', perNight: false}
];

export default function PrenotaPage() {
  const search: SearchPayload = {checkIn: '2024-08-01', checkOut: '2024-08-05', guests: 2};
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">Prenota</h1>
      <div className="mt-4 grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <SearchForm onSearch={() => null} />
          <AvailabilityGrid rooms={rooms} search={search} />
          <ExtrasSelector extras={extras} />
        </div>
        <div className="space-y-4">
          <Summary search={search} />
          <PaymentWidget />
        </div>
      </div>
    </div>
  );
}
