import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  
  canActivate(ctx: ExecutionContext): boolean {
    return true;
  }
}