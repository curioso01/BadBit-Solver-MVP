import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Topbar } from '@/components/layout/topbar';

export const metadata: Metadata = {
  title: 'BADBIT SOLVER',
  description: 'Premium poker study platform'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>
          <Topbar />
          <main className="px-4 pb-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
