import { NextResponse } from 'next/server';

const svgFavicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0f7b5f"/>
  <text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="#ffffff">P</text>
</svg>`;

export function middleware(request) {
  try {
    const { pathname } = request.nextUrl;
    if (pathname === '/favicon.ico') {
      return new NextResponse(svgFavicon, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }
  } catch (err) {
    console.error('favicon middleware error', err);
  }

  return NextResponse.next();
}
