'use client';

import { useMemo } from 'react';
import { dictionaries } from '@/locales';
import { useAppStore } from '@/store/app-store';

export const useLocale = () => {
  const locale = useAppStore((s) => s.locale);
  const dictionary = useMemo(() => dictionaries[locale], [locale]);
  return { locale, dictionary };
};
