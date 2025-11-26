export default function AdminContenutiPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-primary-800">Contenuti</h1>
      <p className="text-sm text-primary-700">Blocchi multilingua per sezioni publiche e legali.</p>
      <div className="card p-5 text-sm text-primary-700">
        <p>API: POST /api/admin/content</p>
        <p>Gestione SEO title/description e media per pagina.</p>
      </div>
    </div>
  );
}
