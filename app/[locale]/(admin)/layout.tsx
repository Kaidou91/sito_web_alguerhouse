import {ReactNode} from 'react';

export default function AdminLayout({children}: {children: ReactNode}) {
  return (
    <div className="container-page section">
      <div className="mb-6 rounded-2xl bg-primary-800 p-6 text-white">
        <p className="text-lg font-semibold">Area riservata</p>
        <p className="text-sm opacity-90">Accesso protetto via NextAuth con ruoli admin/editor.</p>
      </div>
      {children}
    </div>
  );
}
