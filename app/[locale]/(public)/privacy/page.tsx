import {useTranslations} from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations();
  return (
    <div className="container-page section">
      <h1 className="text-3xl font-semibold text-primary-800">{t('privacy_title')}</h1>
      <div className="card mt-6 p-5 text-sm text-primary-700">
        <p>Informativa GDPR, gestione cookie (Consent Mode), trattamento dati per prenotazioni e newsletter.</p>
        <p className="mt-3">Contenuto personalizzabile via blocchi `ContentBlock` multilingua.</p>
      </div>
    </div>
  );
}
