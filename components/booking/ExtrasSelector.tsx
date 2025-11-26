'use client';

import {useState} from 'react';

export type ExtraItem = {id: string; name: string; price: string; perNight?: boolean};

export default function ExtrasSelector({extras}: {extras: ExtraItem[]}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="card p-6">
      <p className="text-lg font-semibold text-primary-800">Extra opzionali</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {extras.map((extra) => (
          <label key={extra.id} className="flex cursor-pointer items-center justify-between rounded-lg border border-primary-100 px-3 py-2">
            <div>
              <p className="font-medium text-primary-700">{extra.name}</p>
              <p className="text-xs text-primary-500">{extra.perNight ? 'per notte' : 'per soggiorno'}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-primary-800">{extra.price}</span>
              <input type="checkbox" checked={selected.includes(extra.id)} onChange={() => toggle(extra.id)} />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
