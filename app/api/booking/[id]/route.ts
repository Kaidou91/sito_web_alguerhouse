import {NextResponse} from 'next/server';

export async function GET(_: Request, {params}: {params: {id: string}}) {
  return NextResponse.json({id: params.id, status: 'PENDING'});
}

export async function PUT(request: Request, {params}: {params: {id: string}}) {
  const body = await request.json();
  return NextResponse.json({id: params.id, ...body});
}
