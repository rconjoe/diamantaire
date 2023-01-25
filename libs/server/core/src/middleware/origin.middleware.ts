/**
 * @file Origin middleware
 * @module middleware/origin
 */

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CROSS_DOMAIN, isProdEnv } from '@diamantaire/shared/constants';
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * @class OriginMiddleware
 * @classdesc verification request origin and referer
 */
@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next) {
    // production only
    if (isProdEnv) {
      const { origin, referer } = request.headers;
      const isAllowed = (field) => !field || field.includes(CROSS_DOMAIN.allowedReferer);
      const isAllowedOrigin = isAllowed(origin);
      const isAllowedReferer = isAllowed(referer);

      if (!isAllowedOrigin && !isAllowedReferer) {
        return response.status(HttpStatus.UNAUTHORIZED).jsonp({
          status: 'error',
          message: 'anonymous request',
          error: null,
        });
      }
    }

    return next();
  }
}
