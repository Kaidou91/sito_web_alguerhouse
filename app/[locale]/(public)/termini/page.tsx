import {useTranslations} from 'next-intl';

export default function TerminiPage() {
  const t = useTranslations();
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">{t('terms_title')}</h1>
      <div className="card mt-6 p-5 text-sm text-primary-700">
        <p>Politiche di cancellazione, penali, acconti 30% o pre-autorizzazione, condizioni di soggiorno.</p>
        <p className="mt-3">Testi gestibili via CMS interno `/api/content/[page]`.</p>
      </div>
    </div>
  );
}
