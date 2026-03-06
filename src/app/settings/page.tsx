'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore, type AppPreferences, type ThemeMode } from '@/store/app-store';
import { useLocale } from '@/hooks/use-locale';
import { curatedTimezoneOptions, getSafeTimezone } from '@/lib/config/timezones';
import { saveStoredPreferences } from '@/lib/config/preferences';

type SaveState = 'idle' | 'saving' | 'success';

export default function SettingsPage(): JSX.Element {
  const { setTheme } = useTheme();
  const { dictionary } = useLocale();
  const applyPreferences = useAppStore((s) => s.applyPreferences);
  const storePreferences = useAppStore((s) => s.getPreferences());
  const [draft, setDraft] = useState<AppPreferences>(storePreferences);
  const [saveState, setSaveState] = useState<SaveState>('idle');

  useEffect(() => {
    setDraft(storePreferences);
  }, [storePreferences]);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(storePreferences),
    [draft, storePreferences]
  );

  const setDraftPreference = <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]): void => {
    setDraft((current) => ({
      ...current,
      [key]: key === 'timezone' ? getSafeTimezone(String(value)) : value
    }));
  };

  const saveChanges = async (): Promise<void> => {
    setSaveState('saving');
    applyPreferences(draft);
    saveStoredPreferences(draft);
    setTheme(draft.theme);

    await new Promise((resolve) => setTimeout(resolve, 350));
    setSaveState('success');
    setTimeout(() => setSaveState('idle'), 1500);
  };

  return (
    <Card className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">{dictionary.settings.title}</h1>
        <p className="text-sm text-slate-400">Ajuste idioma, aparência e localização com confirmação explícita.</p>
        <p className="text-xs text-slate-500 mt-1">Timezone atual detectado: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm">{dictionary.settings.language}</label>
        <Select value={draft.locale} onChange={(e) => setDraftPreference('locale', e.target.value as AppPreferences['locale'])}>
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm">{dictionary.settings.theme}</label>
          <Select value={draft.theme} onChange={(e) => setDraftPreference('theme', e.target.value as ThemeMode)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm">{dictionary.settings.currency}</label>
          <Select value={draft.currency} onChange={(e) => setDraftPreference('currency', e.target.value as AppPreferences['currency'])}>
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm">{dictionary.settings.timezone}</label>
        <Select value={draft.timezone} onChange={(e) => setDraftPreference('timezone', e.target.value)} size={8}>
          {curatedTimezoneOptions.map((timezone) => (
            <option value={timezone.value} key={timezone.value}>{`${timezone.label} — ${timezone.region}`}</option>
          ))}
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm">{dictionary.settings.dateFormat}</label>
          <Select value={draft.dateFormat} onChange={(e) => setDraftPreference('dateFormat', e.target.value)}>
            <option value="dd/MM/yyyy">dd/MM/yyyy</option>
            <option value="MM/dd/yyyy">MM/dd/yyyy</option>
            <option value="yyyy-MM-dd">yyyy-MM-dd</option>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm">{dictionary.settings.numberFormat}</label>
          <Select value={draft.numberFormat} onChange={(e) => setDraftPreference('numberFormat', e.target.value)}>
            <option value="1.234,56">1.234,56</option>
            <option value="1,234.56">1,234.56</option>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={saveChanges} disabled={!isDirty || saveState === 'saving'}>
          {saveState === 'saving' ? dictionary.settings.saving : dictionary.settings.save}
        </Button>
        {saveState === 'success' ? <p className="text-sm text-mint">{dictionary.settings.success}</p> : null}
        {!isDirty && saveState === 'idle' ? <p className="text-xs text-slate-400">{dictionary.settings.noChanges}</p> : null}
      </div>
    </Card>
  );
}
