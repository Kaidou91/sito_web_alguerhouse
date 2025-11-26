'use client';

import {useEffect, useState} from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('alguer-cookie-consent');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('alguer-cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md rounded-2xl bg-primary-800 p-4 text-white shadow-lg">
      <p className="text-sm">Usiamo cookie per migliorare la tua esperienza e misurare le visite (GA4 con Consent Mode v2).</p>
      <button onClick={accept} className="mt-3 rounded-full bg-secondary-400 px-4 py-2 text-sm font-semibold text-primary-900">
        Accetta
      </button>
    </div>
  );
}
