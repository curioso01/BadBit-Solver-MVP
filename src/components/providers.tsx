'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { loadStoredPreferences } from '@/lib/config/preferences';

const InnerProviders = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const applyPreferences = useAppStore((s) => s.applyPreferences);
  const theme = useAppStore((s) => s.theme);
  const { setTheme } = useTheme();

  useEffect(() => {
    const saved = loadStoredPreferences();
    if (saved) applyPreferences(saved);
  }, [applyPreferences]);

  useEffect(() => {
    setTheme(theme);
  }, [setTheme, theme]);

  return <>{children}</>;
};

export const Providers = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <InnerProviders>{children}</InnerProviders>
  </ThemeProvider>
);
