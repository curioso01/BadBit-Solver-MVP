'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/use-locale';
import { useAppStore } from '@/store/app-store';
import { Select } from '@/components/ui/select';
import { saveStoredPreferences } from '@/lib/config/preferences';
import type { Locale } from '@/types/i18n';

export const Topbar = (): JSX.Element => {
  const { dictionary } = useLocale();
  const locale = useAppStore((s) => s.locale);
  const getPreferences = useAppStore((s) => s.getPreferences);
  const setPreference = useAppStore((s) => s.setPreference);

  const updateLocale = (value: string): void => {
    setPreference('locale', value as typeof locale);
    const updated = { ...getPreferences(), locale: value as Locale };
    saveStoredPreferences(updated);
  };

  return (
    <header className="glass m-4 rounded-2xl p-3 flex items-center justify-between">
      <div className="font-semibold tracking-wide">BADBIT SOLVER</div>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/dashboard">{dictionary.nav.dashboard}</Link>
        <Link href="/import">{dictionary.nav.import}</Link>
        <Link href="/hands">{dictionary.nav.hands}</Link>
        <Link href="/settings">{dictionary.nav.settings}</Link>
      </nav>
      <Select value={locale} onChange={(e) => updateLocale(e.target.value)} className="w-40">
        <option value="pt-BR">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </Select>
    </header>
  );
};
