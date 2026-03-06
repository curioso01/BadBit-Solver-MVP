'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/use-locale';
import { useAppStore } from '@/store/app-store';
import { Select } from '@/components/ui/select';

export const Topbar = (): JSX.Element => {
  const { dictionary } = useLocale();
  const locale = useAppStore((s) => s.locale);
  const setPreference = useAppStore((s) => s.setPreference);

  return (
    <header className="glass m-4 rounded-2xl p-3 flex items-center justify-between">
      <div className="font-semibold tracking-wide">BADBIT SOLVER</div>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/dashboard">{dictionary.nav.dashboard}</Link>
        <Link href="/import">{dictionary.nav.import}</Link>
        <Link href="/hands">{dictionary.nav.hands}</Link>
        <Link href="/settings">{dictionary.nav.settings}</Link>
      </nav>
      <Select value={locale} onChange={(e) => setPreference('locale', e.target.value as typeof locale)} className="w-28">
        <option value="pt-BR">PT-BR</option>
        <option value="en">EN</option>
        <option value="es">ES</option>
      </Select>
    </header>
  );
};
