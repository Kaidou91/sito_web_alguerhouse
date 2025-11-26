import Link from 'next/link';

export default function ContattiPage() {
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">Contatti</h1>
      <div className="card mt-6 p-5">
        <p className="text-primary-700">info@alguer.house</p>
        <p className="text-primary-700">+39 079 123456</p>
        <p className="text-sm text-primary-600">Scrivici per richieste tailor-made o collaborazione.</p>
        <div className="mt-4 flex gap-3">
          <Link href="mailto:info@alguer.house" className="btn-primary">
            Email
          </Link>
          <Link href="https://wa.me/39333111222" className="btn-secondary">
            WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
