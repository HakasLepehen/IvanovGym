import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const AuthGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isLoggedIn) {
    router.navigate(['login']);
  }
  return authService.isLoggedIn;
}
