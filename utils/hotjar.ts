// Utility to identify user in Hotjar
// Usage: import and call identifyUserInHotjar(userData) after login/signup or on app start
import type { UserData } from '~/types/home';

export function identifyUserInHotjar(userData: UserData | undefined) {
  if (
    typeof window !== 'undefined' &&
    typeof window.hj === 'function' &&
    userData && userData.id
  ) {
    window.hj('identify', String(userData.id), {
      email: userData.email || null,
      name: userData.name || null,
    });
  }
}
