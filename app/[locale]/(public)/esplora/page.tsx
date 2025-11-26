const highlights = [
  {title: 'Centro storico', desc: 'Bastioni, cattedrale, boutique artigiane'},
  {title: 'Spiagge e mare', desc: 'Maria Pia, Lazzaretto, escursioni in barca'},
  {title: 'Enogastronomia', desc: 'Cantine locali, agriturismi, chef a domicilio'}
];

export default function EsploraPage() {
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">Esplora Alghero</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="card p-5">
            <p className="text-lg font-semibold text-primary-800">{item.title}</p>
            <p className="text-sm text-primary-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
