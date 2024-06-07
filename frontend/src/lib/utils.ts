import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// cookie ye gelen jwt yi decoded eder
// export function getCookie(cname: string) {
//   const name = cname + '=';
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return '';
// }
// // jwt de ki is admin bilgisini döner
// export function getIsAdmin() {
//   if (document.cookie) {
//     const jwt = getCookie('jwt');
//     const user = JSON.parse(atob(jwt.split('.')[1]));
//     console.log(user);
//     return Boolean(user?.isAdmin);
//   }
//   return false;
// }
