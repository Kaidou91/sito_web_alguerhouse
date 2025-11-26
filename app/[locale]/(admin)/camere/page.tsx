export default function AdminCamerePage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-primary-800">Camere</h1>
      <p className="text-sm text-primary-700">CRUD RoomType e inventory singole camere.</p>
      <div className="card p-5 text-sm text-primary-700">
        <p>API: POST/PUT/DELETE /api/admin/room-types</p>
        <p>Gestione immagini R2/Supabase e amenities.</p>
      </div>
    </div>
  );
}
