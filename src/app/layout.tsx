import './globals.css';
import { Providers } from '@/components/providers';
import { Topbar } from '@/components/layout/topbar';

export const metadata = {
  title: 'BADBIT SOLVER',
  description: 'Premium poker study platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Topbar />
          <main className="px-4 pb-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
