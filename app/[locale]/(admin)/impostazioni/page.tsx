export default function AdminImpostazioniPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-primary-800">Impostazioni</h1>
      <p className="text-sm text-primary-700">Stripe keys, email provider, SMS (fase 2), GA4, webhooks.</p>
      <div className="card p-5 text-sm text-primary-700">
        <p>Autorizzazioni basate su ruolo (admin/editor) con NextAuth.</p>
        <p>Audit log per ogni azione critiche.</p>
      </div>
    </div>
  );
}
