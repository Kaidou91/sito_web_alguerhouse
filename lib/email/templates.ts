export const emailTemplates = {
  bookingConfirmed: ({guest, code}: {guest: string; code: string}) => ({
    subject: `Prenotazione confermata ${code}`,
    html: `<p>Ciao ${guest}, la tua prenotazione ${code} è confermata.</p>`
  }),
  preStayReminder: ({guest, code}: {guest: string; code: string}) => ({
    subject: `Reminder check-in per ${code}`,
    html: `<p>${guest}, ti aspettiamo ad Alguer House.</p>`
  })
};
