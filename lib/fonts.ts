import { Fraunces, Karla } from 'next/font/google';

export const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz'],
  display: 'swap',
});

export const body = Karla({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
