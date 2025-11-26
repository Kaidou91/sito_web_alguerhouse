import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({id: 'coupon_1', ...data}, {status: 201});
}
