import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextMiddlewareResult } from 'next/dist/server/web/types';

import { darksideMiddleware } from '@diamantaire/darkside/core';

export function middleware(
  request: NextRequest,
  event: NextFetchEvent
): NextMiddlewareResult {
  const response = NextResponse.next();
  return darksideMiddleware(request, response, event);
}
