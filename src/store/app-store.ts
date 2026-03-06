'use client';

import { create } from 'zustand';
import type { Locale } from '@/types/i18n';
import { getSafeTimezone } from '@/lib/config/timezones';

export type Currency = 'BRL' | 'USD' | 'EUR';
export type ThemeMode = 'dark' | 'light';

export type AppPreferences = {
  locale: Locale;
  theme: ThemeMode;
  currency: Currency;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
};

type AppState = AppPreferences & {
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
  applyPreferences: (state: Partial<AppPreferences>) => void;
  getPreferences: () => AppPreferences;
};

const defaultPreferences: AppPreferences = {
  locale: 'pt-BR',
  theme: 'dark',
  currency: 'BRL',
  timezone: getSafeTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone),
  dateFormat: 'dd/MM/yyyy',
  numberFormat: '1.234,56'
};

export const useAppStore = create<AppState>((set, get) => ({
  ...defaultPreferences,
  setPreference: (key, value) => set(() => ({ [key]: key === 'timezone' ? getSafeTimezone(String(value)) : value })),
  applyPreferences: (state) =>
    set((current) => ({
      ...current,
      ...state,
      timezone: getSafeTimezone(state.timezone ?? current.timezone)
    })),
  getPreferences: () => {
    const state = get();
    return {
      locale: state.locale,
      theme: state.theme,
      currency: state.currency,
      timezone: state.timezone,
      dateFormat: state.dateFormat,
      numberFormat: state.numberFormat
    };
  }
}));
