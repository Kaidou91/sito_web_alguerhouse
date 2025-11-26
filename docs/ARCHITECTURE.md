# Alguer House Experience – Architettura e Piano di Implementazione

## 1. Panoramica architetturale
- **Frontend**: Next.js (App Router) + TypeScript, Tailwind + shadcn/ui, next-intl per i18n (IT default, EN/DE/FR). SSR/ISR per contenuti statici; streaming per ricerca disponibilità.
- **API**: Route handlers Next.js con protezione middleware Auth (NextAuth, ruoli admin/editor). Stripe server-side per PaymentIntents, estendibile a PayPal. Endpoints per booking, pagamenti, notifiche, PDF.
- **DB**: PostgreSQL con Prisma. Storage immagini su R2/Supabase. Cache opzionale su Upstash Redis per ricerche.
- **Email/SMS**: Resend/SendGrid per email templated multilingua, Twilio per SMS/WhatsApp (fase 2). PDF generato via Playwright/Puppeteer da template HTML.
- **Hosting**: Vercel (frontend/API), DB su Neon/Supabase (EU), storage R2/Supabase. CI/CD GitHub Actions per lint/test/migrate/deploy.

## 2. Schema Prisma proposto
```prisma
model Role {
  id          String   @id @default(cuid())
  name        String   @unique // admin | editor
  description String?
  users       User[]
}

model User {
  id         String   @id @default(cuid())
  email      String   @unique
  password   String?
  name       String?
  phone      String?
  roleId     String
  role       Role     @relation(fields: [roleId], references: [id])
  bookings   Booking[]
  auditLogs  AuditLog[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model RoomType {
  id            String     @id @default(cuid())
  code          String     @unique
  name          Json       // multilingua
  description   Json?
  capacityAdults Int
  capacityKids   Int
  bedConfig     String
  basePrice     Decimal    @db.Decimal(10,2)
  inventory     Int        // numero di unità
  amenities     String[]
  images        String[]
  ratePlans     RatePlan[]
  seasons       Season[]   @relation("SeasonRoomTypes")
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
}

model Room {
  id          String   @id @default(cuid())
  roomNumber  String   @unique
  roomTypeId  String
  roomType    RoomType @relation(fields: [roomTypeId], references: [id])
  status      RoomStatus @default(ACTIVE)
  notes       String?
  closures    Closure[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum RoomStatus {
  ACTIVE
  MAINTENANCE
  BLOCKED
}

model Season {
  id          String   @id @default(cuid())
  name        Json
  startDate   DateTime
  endDate     DateTime
  seasonType  SeasonType // HIGH | MID | LOW
  roomTypes   RoomType[] @relation("SeasonRoomTypes")
  ratePlans   RatePlan[]
}

enum SeasonType {
  HIGH
  MID
  LOW
}

model RatePlan {
  id               String    @id @default(cuid())
  code             String    @unique
  name             Json
  description      Json?
  roomTypeId       String
  roomType         RoomType  @relation(fields: [roomTypeId], references: [id])
  seasonId         String?
  season           Season?   @relation(fields: [seasonId], references: [id])
  pricePerNight    Decimal   @db.Decimal(10,2)
  currency         String    @default("EUR")
  refundable       Boolean   @default(true)
  cancelBeforeDays Int?      // finestra cancellazione
  paymentPolicy    PaymentPolicy @default(DEPOSIT_30)
  minNights        Int       @default(1)
  maxNights        Int?
  arrivalDays      String[]  // es: ["FRI","SAT"]
  checkInTime      String    // HH:mm
  checkOutTime     String    // HH:mm
  taxes            Tax[]     @relation("RatePlanTaxes")
  extras           Extra[]   @relation("RatePlanExtras")
  restrictions     Restriction[]
  coupons          Coupon[]  @relation("RatePlanCoupons")
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
}

enum PaymentPolicy {
  DEPOSIT_30
  FULL_PREPAY
  PREAUTH
}

model Restriction {
  id           String   @id @default(cuid())
  ratePlanId   String
  ratePlan     RatePlan @relation(fields: [ratePlanId], references: [id])
  minAdvanceDays Int?
  maxAdvanceDays Int?
  closedToArrival Boolean @default(false)
  closedToDeparture Boolean @default(false)
  blockedDates   DateRange[] @db.Json
}

model Extra {
  id            String   @id @default(cuid())
  code          String   @unique
  name          Json
  description   Json?
  price         Decimal  @db.Decimal(10,2)
  unit          ExtraUnit
  perNight      Boolean  @default(false)
  perPerson     Boolean  @default(false)
  ratePlans     RatePlan[] @relation("RatePlanExtras")
}

enum ExtraUnit {
  STAY
  NIGHT
  PERSON
}

model Tax {
  id            String   @id @default(cuid())
  name          Json
  description   Json?
  percentage    Decimal? @db.Decimal(5,2)
  flatAmount    Decimal? @db.Decimal(10,2)
  perPerson     Boolean  @default(false)
  perNight      Boolean  @default(false)
  ratePlans     RatePlan[] @relation("RatePlanTaxes")
}

model Coupon {
  id            String   @id @default(cuid())
  code          String   @unique
  description   Json?
  discountPct   Decimal? @db.Decimal(5,2)
  discountFlat  Decimal? @db.Decimal(10,2)
  startDate     DateTime
  endDate       DateTime
  maxUses       Int?
  usedCount     Int      @default(0)
  ratePlans     RatePlan[] @relation("RatePlanCoupons")
}

model Closure {
  id        String   @id @default(cuid())
  roomId    String
  room      Room     @relation(fields: [roomId], references: [id])
  startDate DateTime
  endDate   DateTime
  reason    String?
}

model Booking {
  id             String    @id @default(cuid())
  code           String    @unique
  roomTypeId     String
  roomType       RoomType  @relation(fields: [roomTypeId], references: [id])
  roomId         String?
  room           Room?     @relation(fields: [roomId], references: [id])
  ratePlanId     String
  ratePlan       RatePlan  @relation(fields: [ratePlanId], references: [id])
  userId         String?
  user           User?     @relation(fields: [userId], references: [id])
  checkIn        DateTime
  checkOut       DateTime
  adults         Int
  children       Int
  status         BookingStatus @default(PENDING)
  paymentStatus  PaymentStatus @default(PENDING)
  totalAmount    Decimal   @db.Decimal(10,2)
  depositAmount  Decimal   @db.Decimal(10,2)
  balanceAmount  Decimal   @db.Decimal(10,2)
  currency       String    @default("EUR")
  taxBreakdown   Json
  extrasSelected Json
  couponCode     String?
  notes          String?
  guestFirstName String
  guestLastName  String
  guestEmail     String
  guestPhone     String
  auditLogs      AuditLog[]
  payments       Payment[]
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  NO_SHOW
}

enum PaymentStatus {
  PENDING
  AUTHORIZED
  CAPTURED
  REFUNDED
  PARTIAL_REFUND
  FAILED
}

model Payment {
  id            String   @id @default(cuid())
  bookingId     String
  booking       Booking  @relation(fields: [bookingId], references: [id])
  provider      PaymentProvider
  intentId      String?
  amount        Decimal  @db.Decimal(10,2)
  currency      String   @default("EUR")
  status        PaymentStatus
  method        String?
  capturedAt    DateTime?
  refundedAt    DateTime?
  metadata      Json?
  createdAt     DateTime @default(now())
}

enum PaymentProvider {
  STRIPE
  PAYPAL
}

model AuditLog {
  id         String   @id @default(cuid())
  userId     String?
  user       User?    @relation(fields: [userId], references: [id])
  bookingId  String?
  booking    Booking? @relation(fields: [bookingId], references: [id])
  action     String
  details    Json?
  createdAt  DateTime @default(now())
}

model ContentBlock {
  id        String   @id @default(cuid())
  page      PageKey
  section   String
  locale    String  // it | en | de | fr
  title     String?
  subtitle  String?
  body      Json?
  media     String[]
  seoTitle  String?
  seoDesc   String?
  slug      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum PageKey {
  HOME
  ROOMS
  SERVICES
  EXPLORE
  GALLERY
  FAQ
  CONTACTS
  BOOKING
  LEGAL_PRIVACY
  LEGAL_TERMS
}
```

## 3. Flusso di prenotazione
1. **Search**: utenti selezionano date, ospiti, lingua. API `/api/search` calcola disponibilità usando RoomType inventory, closures e RatePlan + Restriction + Season. Cache opzionale.
2. **Select room**: mostra card camere con prezzi per soggiorno, opzioni cancellazione, extra selezionabili e coupon.
3. **Guest data**: form con nome, cognome, email, telefono (obbligatori) + note. Validazione per check-in/out, min/max notti, arrivalDays.
4. **Checkout**:
   - Calcolo totale: notti * prezzo + extra + tassa di soggiorno; applica coupon.
   - PaymentIntent Stripe (o ordine PayPal fase 2) con opzione **30% acconto** o **full** secondo `paymentPolicy` del RatePlan. Pre-autorizzazione possibile (PREAUTH) con capture manuale.
   - Salvataggio Booking con stato `PENDING` e Payment `PENDING`.
5. **Conferma**:
   - Webhook Stripe aggiorna pagamento a `AUTHORIZED/CAPTURED`; booking → `CONFIRMED` se successo.
   - Genera PDF ricevuta/fattura (HTML template + Playwright) e invia email multilingua a guest e admin tramite Resend/SendGrid. Notifiche SMS/WhatsApp (fase 2) via Twilio.
6. **Modifica/Cancellazione**: API autenticata per admin; update stato booking, innesca rimborsi Stripe se necessario e invia notifiche.

## 4. Struttura Next.js proposta
```
app/
  layout.tsx                // include ThemeProvider, next-intl, font, metadata
  page.tsx                  // Home
  camere/page.tsx
  servizi/page.tsx
  esplora/page.tsx
  gallery/page.tsx
  faq/page.tsx
  contatti/page.tsx
  prenota/page.tsx          // search UI + wizard booking
  privacy/page.tsx
  termini/page.tsx
  api/
    search/route.ts         // disponibilità
    booking/route.ts        // crea booking + PaymentIntent
    booking/[id]/route.ts   // GET/PUT per admin
    payments/stripe/webhook/route.ts
    content/[page]/route.ts // CMS headless per contenuti
lib/
  i18n/
    locales/{it,en,de,fr}.json
  prisma.ts
  pricing.ts                // calcolo tariffa e tasse
  pdf.ts                    // template html
  email/templates.ts        // conferma, reminder, post-stay
components/
  ui/... (shadcn)
  layout/Header, Footer, LocaleSwitcher, CTA
  booking/SearchForm, AvailabilityGrid, ExtrasSelector, Summary, PaymentWidget

admin/
  layout.tsx (protected)
  bookings/page.tsx
  camere/page.tsx
  rateplans/page.tsx
  stagioni/page.tsx
  contenuti/page.tsx
  impostazioni/page.tsx
```

## 5. Backend admin protetto (principali route)
- Autenticazione NextAuth (email/password + magic link). Middleware `middleware.ts` per proteggere `/admin/*`.
- Route handlers
  - `POST /api/admin/room-types`, `PUT /api/admin/room-types/:id`, `DELETE /api/admin/room-types/:id`
  - `POST /api/admin/rate-plans`, `POST /api/admin/seasons`, `POST /api/admin/closures`
  - `POST /api/admin/extras`, `POST /api/admin/coupons`, `POST /api/admin/taxes`
  - `GET/PUT /api/admin/bookings/:id` + `POST /api/admin/bookings/export`
  - `POST /api/admin/content` per blocchi multilingua
- Middleware di ruolo: solo admin può cancellare, editor può modificare contenuti.
- AuditLog creato ad ogni mutation.

## 6. Palette, font, UI
- **Palette (campionata da tideway-apartment.lodgify.com – tonalità blu/teal & sabbia)**
  - Primary: `#0E5B71`
    - Scale: 50 `#E6F2F5`, 100 `#CCE6EB`, 200 `#99CDD7`, 300 `#66B4C3`, 400 `#339CAF`, 500 `#0E5B71`, 600 `#0C5062`, 700 `#0A4554`, 800 `#083A45`, 900 `#062F37`
  - Secondary: `#E8D6BA`
    - 50 `#F9F3E8`, 100 `#F3E6D1`, 200 `#E7CD9E`, 300 `#DCB56B`, 400 `#D19C38`, 500 `#B58324`, 600 `#94691D`, 700 `#735016`, 800 `#52360F`, 900 `#321D08`
  - Accent: `#F4A261`
    - 50 `#FFF3E8`, 100 `#FFE7D1`, 200 `#FECFA3`, 300 `#FDB775`, 400 `#FB9F47`, 500 `#F4A261`, 600 `#D17E3F`, 700 `#AD5B2E`, 800 `#8A371D`, 900 `#66140C`
- **Font**: Preferenza per `"Lora"` (serif) + `"Montserrat"` (sans) via Google Fonts per match con stile Lodgify. Alternative fallback: `"Playfair Display"`, `"Inter"`.

## 7. Testi multilingua (placeholder)
- Architettura `locales/*.json` con chiavi condivise (hero, CTA, rooms, servizi, esplora, contatti, gallery, faq, booking, footer, legal). Esempio:
```json
{
  "cta_book": "Prenota",
  "nav_rooms": "Camere",
  "hero_title": "Soggiorna ad Alghero con vista mare",
  "hero_subtitle": "Esperienza boutique a pochi passi dal centro storico",
  "booking_checkin": "Check-in",
  "booking_checkout": "Check-out"
}
```
Versioni EN/DE/FR con traduzioni placeholder coerenti.

## 8. SEO, Analytics, Legal
- Metadata per ogni pagina via `generateMetadata`; OG tags e JSON-LD `Hotel` + `LocalBusiness` con indirizzo Alghero.
- GA4 con Consent Mode v2: script in `_app`/layout con tag manager id da env.
- Banner cookie (es. CookieYes) integrato in layout.
- Pagine legali: `/privacy`, `/termini` con contenuti multilingua configurabili via CMS `ContentBlock`.

## 9. Seed iniziale (da aggiungere in `prisma/seed.ts`)
- 4 RoomType: "Suite Mare", "Junior Suite Giardino", "Camera Comfort", "Studio Urbano" con capacità, bedConfig, amenities placeholder, immagini stock e basePrice differenti per stagione.
- Stagioni: Alta (luglio-agosto), Media (maggio-giugno-settembre), Bassa (resto). RatePlan collegati con min/max notti e arrivi consentiti.
- Tassa di soggiorno flat per notte per adulto; Extra: culla, late checkout, parcheggio.
- Coupon: "WELCOME10" 10%.

## 10. Roadmap implementativa
1. **Bootstrap**: crea app Next.js con App Router, Tailwind, shadcn/ui, next-intl; configura font e palette Tailwind.
2. **DB & Auth**: Prisma schema, migrazioni, NextAuth con ruoli; seed dati.
3. **UI pubblica**: pagine statiche + sezioni hero/rooms/servizi/esplora/gallery/faq/contatti/prenota; componenti booking wizard.
4. **Booking engine**: API search/pricing, booking creation, Stripe PaymentIntent, webhook, email+PDF base.
5. **Admin**: CRUD principali con form shadcn, tabelle bookings, content editor; audit log.
6. **Integrazioni**: GA4, sitemap/robots, cookie banner; successivamente PayPal, Twilio, iCal/Calendar.

## 11. Avvio locale (proposto)
1. `npm install` (una volta creato il progetto Next.js).
2. Copia `.env.example` in `.env.local` con chiavi: DB_URL, NEXTAUTH_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_KEY, GA_MEASUREMENT_ID, etc.
3. `npx prisma migrate dev` per creare lo schema.
4. `npm run dev` e apri `http://localhost:3000`.
5. Avvia ngrok per webhook Stripe se necessario: `ngrok http 3000` e configura endpoint webhook.

## 12. Ambiguità da chiarire
- Nome finale brand (per email/PDF). Ora usiamo "Alguer House Experience".
- Dettagli fiscali (P.IVA, indirizzo esatto) per fatture.
- Policy cancellazione precise e tassa soggiorno reale del comune.
```
