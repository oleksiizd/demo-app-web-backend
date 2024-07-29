import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '@/features/auth/decorators';
import { UserRole } from '@/features/auth/enums';
import { IRequestWithUser } from '@/features/auth/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<IRequestWithUser>();
    if (!user) {
      // user is not even authenticated
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
