import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import passport from 'passport';

// Auth middleware -  to check if the API key is valid
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    passport.authenticate('headerapikey', { session: false, failureRedirect: '/api/unauthorized' }, (value) => {
      if (value) {
        next();
      } else {
        throw new UnauthorizedException('Invalide API Key');
      }
    })(req, res, next);
  }
}
