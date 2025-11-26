const faqs = [
  {q: 'È prevista la tassa di soggiorno?', a: 'Sì, applicata per notte per adulto secondo regolamento comunale.'},
  {q: 'Posso cancellare gratis?', a: 'Sono disponibili rate plan flessibili con cancellazione gratuita fino a 7 giorni.'},
  {q: 'Offrite navetta?', a: 'Transfer privato su richiesta con partner locale.'}
];

export default function FAQPage() {
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">FAQ</h1>
      <div className="mt-6 grid gap-3">
        {faqs.map((item) => (
          <div key={item.q} className="card p-5">
            <p className="text-lg font-semibold text-primary-800">{item.q}</p>
            <p className="text-sm text-primary-600">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
