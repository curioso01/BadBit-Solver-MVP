import type { AppPreferences } from '@/store/app-store';

export const PREFERENCES_STORAGE_KEY = 'badbit.preferences';

export const loadStoredPreferences = (): Partial<AppPreferences> | null => {
  const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved) as Partial<AppPreferences>;
  } catch {
    return null;
  }
};

export const saveStoredPreferences = (preferences: AppPreferences): void => {
  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
};
