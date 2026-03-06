'use client';

import { create } from 'zustand';
import type { Locale } from '@/types/i18n';

export type Currency = 'BRL' | 'USD' | 'EUR';

type AppState = {
  locale: Locale;
  theme: 'dark' | 'light';
  currency: Currency;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
  setPreference: <K extends keyof Omit<AppState, 'setPreference' | 'hydrate'>>(key: K, value: AppState[K]) => void;
  hydrate: (state: Partial<AppState>) => void;
};

export const useAppStore = create<AppState>((set) => ({
  locale: 'pt-BR',
  theme: 'dark',
  currency: 'BRL',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: 'dd/MM/yyyy',
  numberFormat: '1.234,56',
  setPreference: (key, value) => set(() => ({ [key]: value })),
  hydrate: (state) => set(() => state)
}));
