import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthApiService } from '../../auth/services/auth.api-service';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const isAdmin = inject(AuthApiService).isAdmin();

  if (isAdmin)
    return true;

  return inject(Router).createUrlTree(['/']);
};
