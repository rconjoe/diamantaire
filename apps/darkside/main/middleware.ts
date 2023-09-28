import { darksideMiddleware } from '@diamantaire/darkside/core';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest, event: NextFetchEvent): Promise<NextMiddlewareResult> {
  const response = NextResponse.next();

  return darksideMiddleware(request, response, event);
}
