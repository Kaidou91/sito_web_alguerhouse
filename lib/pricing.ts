type PricingInput = {
  nights: number;
  basePrice: number;
  guests: number;
  extras: Array<{price: number; perNight?: boolean}>;
  taxes: Array<{percentage?: number; flatAmount?: number}>;
};

export function calculatePrice(input: PricingInput) {
  const extrasTotal = input.extras.reduce((acc, extra) => acc + extra.price * (extra.perNight ? input.nights : 1), 0);
  const base = input.nights * input.basePrice + extrasTotal;
  const taxes = input.taxes.reduce((acc, tax) => acc + (tax.percentage ? (base * tax.percentage) / 100 : tax.flatAmount ?? 0), 0);
  return Math.round((base + taxes) * 100) / 100;
}
