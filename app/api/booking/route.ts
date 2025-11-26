import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const booking = {
    ...body,
    id: 'bk_123',
    status: 'PENDING',
    paymentStatus: 'PENDING'
  };
  return NextResponse.json(booking, {status: 201});
}
