import {NextResponse} from 'next/server';

const blocks: Record<string, unknown> = {
  home: {hero: {title: 'Alguer House', subtitle: 'Esperienza boutique'}},
  privacy: {body: 'Privacy e cookie banner configurabile'},
  termini: {body: 'Politiche di cancellazione'}
};

export async function GET(_: Request, {params}: {params: {page: string}}) {
  return NextResponse.json(blocks[params.page] ?? {});
}
