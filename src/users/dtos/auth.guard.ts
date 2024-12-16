import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    const requestedUserId = parseInt(request.params.id, 10);

    try {
      const decoded = this.jwtService.verify(token);
      console.log('Decoded Token:', decoded);

      request.user = decoded;

      // Verify user ID from token matches requested user ID
      if (
        requestedUserId &&
        parseInt(decoded.userId || decoded.sub, 10) !== requestedUserId
      ) {
        throw new ForbiddenException('Access denied');
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
