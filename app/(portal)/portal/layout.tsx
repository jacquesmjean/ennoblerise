import type { Metadata } from 'next';
import { display, body } from '@/lib/fonts';
import PortalShell from '@/components/portal/PortalShell';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Operations Portal | EnnobleRise Global Trust',
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        <PortalShell>{children}</PortalShell>
      </body>
    </html>
  );
}
