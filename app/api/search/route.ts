import {NextResponse} from 'next/server';
import {calculatePrice} from '@/lib/pricing';

export async function POST(request: Request) {
  const payload = await request.json();
  const total = calculatePrice({
    nights: 3,
    basePrice: 180,
    guests: payload.guests ?? 2,
    extras: [],
    taxes: []
  });

  return NextResponse.json({
    search: payload,
    rooms: [
      {id: 'suite-mare', name: 'Suite Mare', price: total, refundable: true},
      {id: 'comfort', name: 'Camera Comfort', price: total - 60, refundable: false}
    ]
  });
}
