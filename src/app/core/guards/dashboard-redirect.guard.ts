import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { MapRoutes } from '../../map-routes';
import { AuthService } from '../services/auth.service';
export const dashboardRedirectGuard: CanActivateChildFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigateByUrl(MapRoutes.dashboard);
    return false;
  }
  return true;
};
