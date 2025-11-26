# Alguer House Experience

Documentazione iniziale per l'implementazione del sito di prenotazioni multilingua per una guest house ad Alghero.

- Architettura e piano: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Tecnologie previste: Next.js (App Router) con TypeScript, Tailwind + shadcn/ui, Prisma + PostgreSQL, Stripe, next-intl.
- Pagine pubbliche previste: Home, Camere, Servizi, Esplora Alghero, Gallery, FAQ, Contatti, Prenota, Privacy & Cookie, Termini & Cancellazioni.
- Admin protetto con CRUD per camere, tariffe, stagioni, prenotazioni, contenuti multilingua e notifiche.

Per i passi di avvio locale e dettagli su schema Prisma, flusso booking, palette, font e seed iniziale, vedere il documento in `docs/ARCHITECTURE.md`.

## Avvio locale rapido
1. Copia il file degli esempi ambiente sia in `.env` (usato da Prisma) che in `.env.local` (usato da Next.js) e compila i valori (es. `DATABASE_URL`, `NEXTAUTH_SECRET`, Stripe, Resend, GA4). Per `DATABASE_URL` sostituisci utente, password, host, porta e nome del database del tuo server PostgreSQL in esecuzione, ad esempio:
   ```bash
   cp .env.example .env
   cp .env.example .env.local
   # esempio locale: postgresql://postgres:password@localhost:5432/alguerhouse
   ```
2. Installa le dipendenze: `npm install`.
3. Assicurati che PostgreSQL sia avviato e raggiungibile all'host/porta indicati nella variabile `DATABASE_URL`.
4. Esegui le migrazioni Prisma: `npx prisma migrate dev`.
5. Avvia il server di sviluppo: `npm run dev` e apri `http://localhost:3000`.
