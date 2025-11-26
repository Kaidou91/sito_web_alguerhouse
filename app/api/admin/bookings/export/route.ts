import {NextResponse} from 'next/server';

export async function POST() {
  return NextResponse.json({exported: true, url: 'https://example.com/export.csv'});
}
