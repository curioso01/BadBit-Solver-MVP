'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/store/app-store';

export default function SettingsPage(): JSX.Element {
  const { setTheme } = useTheme();
  const state = useAppStore();

  useEffect(() => {
    localStorage.setItem('badbit.preferences', JSON.stringify({
      locale: state.locale,
      theme: state.theme,
      currency: state.currency,
      timezone: state.timezone,
      dateFormat: state.dateFormat,
      numberFormat: state.numberFormat
    }));
    setTheme(state.theme);
  }, [setTheme, state]);

  return (
    <Card className="max-w-2xl mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">Configurações</h1>
      <label className="block text-sm">Idioma</label>
      <Select value={state.locale} onChange={(e) => state.setPreference('locale', e.target.value as typeof state.locale)}>
        <option value="pt-BR">pt-BR</option><option value="en">en</option><option value="es">es</option>
      </Select>
      <label className="block text-sm">Tema</label>
      <Select value={state.theme} onChange={(e) => state.setPreference('theme', e.target.value as 'dark' | 'light')}>
        <option value="dark">dark</option><option value="light">light</option>
      </Select>
      <label className="block text-sm">Moeda</label>
      <Select value={state.currency} onChange={(e) => state.setPreference('currency', e.target.value as typeof state.currency)}>
        <option value="BRL">BRL</option><option value="USD">USD</option><option value="EUR">EUR</option>
      </Select>
      <label className="block text-sm">Timezone</label>
      <Select value={state.timezone} onChange={(e) => state.setPreference('timezone', e.target.value)}>
        {Intl.supportedValuesOf('timeZone').slice(0, 20).map((tz) => <option value={tz} key={tz}>{tz}</option>)}
      </Select>
    </Card>
  );
}
