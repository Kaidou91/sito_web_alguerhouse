import {SearchPayload} from './SearchForm';

export default function Summary({search}: {search: SearchPayload}) {
  return (
    <div className="card p-6">
      <p className="text-lg font-semibold text-primary-800">Riepilogo</p>
      <div className="mt-3 text-sm text-primary-700">
        <p>
          Date: {search.checkIn || '—'} → {search.checkOut || '—'}
        </p>
        <p>Ospiti: {search.guests}</p>
        <p className="mt-2 text-primary-600">Totale stimato: € 820 (tasse incluse)</p>
      </div>
    </div>
  );
}
