import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthApiService } from '../../auth/services/auth.api-service';

export const loginGuard: CanActivateChildFn = (childRoute, state) => {
  const isLoggedIn = inject(AuthApiService).isLoggedIn();


  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url, } });
};
