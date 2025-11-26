'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';

export type SearchPayload = {
  checkIn: string;
  checkOut: string;
  guests: number;
};

export default function SearchForm({onSearch}: {onSearch?: (payload: SearchPayload) => void}) {
  const t = useTranslations();
  const [form, setForm] = useState<SearchPayload>({checkIn: '', checkOut: '', guests: 2});

  const handleSearch = () => {
    onSearch?.(form);
  };

  return (
    <div className="card p-6">
      <div className="grid gap-4 md:grid-cols-4 md:items-end">
        <div>
          <label className="text-sm font-semibold text-primary-700">{t('booking_checkin')}</label>
          <input
            type="date"
            value={form.checkIn}
            onChange={(e) => setForm({...form, checkIn: e.target.value})}
            className="mt-1 w-full rounded-lg border border-primary-100 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-primary-700">{t('booking_checkout')}</label>
          <input
            type="date"
            value={form.checkOut}
            onChange={(e) => setForm({...form, checkOut: e.target.value})}
            className="mt-1 w-full rounded-lg border border-primary-100 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-primary-700">{t('booking_guests')}</label>
          <input
            type="number"
            min={1}
            value={form.guests}
            onChange={(e) => setForm({...form, guests: Number(e.target.value)})}
            className="mt-1 w-full rounded-lg border border-primary-100 px-3 py-2"
          />
        </div>
        <button className="btn-primary" onClick={handleSearch}>
          {t('booking_submit')}
        </button>
      </div>
    </div>
  );
}
