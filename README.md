# Alguer House Experience

Documentazione iniziale per l'implementazione del sito di prenotazioni multilingua per una guest house ad Alghero.

- Architettura e piano: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Tecnologie previste: Next.js (App Router) con TypeScript, Tailwind + shadcn/ui, Prisma + PostgreSQL, Stripe, next-intl.
- Pagine pubbliche previste: Home, Camere, Servizi, Esplora Alghero, Gallery, FAQ, Contatti, Prenota, Privacy & Cookie, Termini & Cancellazioni.
- Admin protetto con CRUD per camere, tariffe, stagioni, prenotazioni, contenuti multilingua e notifiche.

Per i passi di avvio locale e dettagli su schema Prisma, flusso booking, palette, font e seed iniziale, vedere il documento in `docs/ARCHITECTURE.md`.

## Avvio locale rapido
1. Copia il file degli esempi ambiente: `cp .env.example .env.local` e compila i valori (es. `DATABASE_URL`, `NEXTAUTH_SECRET`, Stripe, Resend, GA4).
2. Installa le dipendenze: `npm install`.
3. Esegui le migrazioni Prisma: `npx prisma migrate dev`.
4. Avvia il server di sviluppo: `npm run dev` e apri `http://localhost:3000`.
