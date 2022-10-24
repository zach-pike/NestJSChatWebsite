import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  
  canActivate(ctx: ExecutionContext): boolean {
    let req = ctx.switchToHttp().getRequest();

    let token = req.headers["authorization"] || "";

    let user = this.authService.checkJWTBearer(token.replace("Bearer ", ""));

    return user != null;
  }
}