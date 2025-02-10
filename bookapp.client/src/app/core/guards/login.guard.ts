import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

export const loginGuard: CanActivateChildFn = (childRoute, state) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();


  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url, } });
};
