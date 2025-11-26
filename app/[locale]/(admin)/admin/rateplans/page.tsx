export default function AdminRatePlansPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-primary-800">Rate plans</h1>
      <p className="text-sm text-primary-700">Tariffe stagionali, politiche di pagamento e restrizioni.</p>
      <div className="card p-5 text-sm text-primary-700">
        <p>API: POST /api/admin/rate-plans • Relazioni con Seasons e Restriction.</p>
      </div>
    </div>
  );
}
