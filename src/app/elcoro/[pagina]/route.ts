import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ pagina: string }> }
) {
  const { pagina } = await params;
  const safeName = pagina.replace(/[^a-zA-Z0-9_-]/g, '');

  try {
    const filePath = join(process.cwd(), 'public', 'elcoro', `${safeName}.html`);
    const html = await readFile(filePath, 'utf-8');
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return new NextResponse('Página no encontrada en /elcoro', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
