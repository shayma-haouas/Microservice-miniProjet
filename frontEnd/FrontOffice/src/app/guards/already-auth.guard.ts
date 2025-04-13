import { CanActivateFn } from '@angular/router';

export const alreadyAuthGuard: CanActivateFn = (route, state) => {
  return true;
};
