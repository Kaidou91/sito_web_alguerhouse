import {NextResponse} from 'next/server';

export async function GET() {
  return NextResponse.json([{id: 'bk_1', status: 'CONFIRMED'}]);
}

export async function PUT(request: Request) {
  const data = await request.json();
  return NextResponse.json({updated: true, ...data});
}
