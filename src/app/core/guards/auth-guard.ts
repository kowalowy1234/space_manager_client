import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isSignedIn = inject(AuthService).isSignedIn();
  return isSignedIn;
};
