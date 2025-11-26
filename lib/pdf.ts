export function bookingReceiptTemplate(data: {guest: string; bookingCode: string}) {
  return `
    <html>
      <body style="font-family: Montserrat, sans-serif; padding: 24px;">
        <h1>Ricevuta di prenotazione</h1>
        <p>Ospite: ${data.guest}</p>
        <p>Codice: ${data.bookingCode}</p>
        <p>Generata da template HTML pronto per Playwright/Puppeteer.</p>
      </body>
    </html>
  `;
}
