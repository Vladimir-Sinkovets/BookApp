import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const isAdmin = inject(AuthService).isAdmin();

  if (isAdmin)
    return true;

  return inject(Router).createUrlTree(['/']);
};
