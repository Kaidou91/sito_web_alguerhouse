export default function AdminBookingsPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-primary-800">Prenotazioni</h1>
      <p className="text-sm text-primary-700">Tabella booking con status, pagamenti, esportazione CSV/PDF.</p>
      <div className="card p-5 text-sm text-primary-700">
        <p>API: GET/PUT /api/admin/bookings/:id • POST /api/admin/bookings/export</p>
        <p>Webhook Stripe aggiorna stato pagamenti.</p>
      </div>
    </div>
  );
}
