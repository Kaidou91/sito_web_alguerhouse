export default function AdminStagioniPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-primary-800">Stagioni e chiusure</h1>
      <p className="text-sm text-primary-700">Gestisci stagionalità, chiusure camere e restrizioni.</p>
      <div className="card p-5 text-sm text-primary-700">
        <p>API: POST /api/admin/seasons • POST /api/admin/closures</p>
      </div>
    </div>
  );
}
