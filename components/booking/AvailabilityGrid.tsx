import {SearchPayload} from './SearchForm';

export type AvailabilityItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  refundable: boolean;
};

export default function AvailabilityGrid({rooms, search}: {rooms: AvailabilityItem[]; search: SearchPayload}) {
  if (!rooms.length) {
    return <p className="mt-4 text-sm text-primary-600">Nessuna disponibilità per le date selezionate.</p>;
  }

  return (
    <div className="mt-6 grid gap-4">
      {rooms.map((room) => (
        <div key={room.id} className="card flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-primary-800">{room.name}</p>
            <p className="text-sm text-primary-600">{room.description}</p>
            <p className="mt-2 text-xs text-primary-500">
              {search.checkIn} → {search.checkOut}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary-800">{room.price}</p>
            <p className="text-xs text-primary-600">{room.refundable ? 'Cancellazione flessibile' : 'Non rimborsabile'}</p>
            <button className="btn-secondary mt-3">Seleziona</button>
          </div>
        </div>
      ))}
    </div>
  );
}
