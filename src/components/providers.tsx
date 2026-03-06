'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';

export const Providers = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const hydrate = useAppStore((s) => s.hydrate);

  useEffect(() => {
    const saved = localStorage.getItem('badbit.preferences');
    if (saved) {
      hydrate(JSON.parse(saved) as Parameters<typeof hydrate>[0]);
    }
  }, [hydrate]);

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
