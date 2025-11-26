const images = [
  'https://images.unsplash.com/photo-1501117716987-c8e1ecb210af',
  'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
];

export default function GalleryPage() {
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">Gallery</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {images.map((src) => (
          <div key={src} className="relative h-56 overflow-hidden rounded-xl shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Alguer House" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
