export type Locale = 'pt-BR' | 'en' | 'es';

export type Dictionary = {
  nav: Record<string, string>;
  auth: Record<string, string>;
  dashboard: Record<string, string>;
  import: Record<string, string>;
  settings: Record<string, string>;
  onboarding: {
    title: string;
    steps: { title: string; description: string }[];
    next: string;
    back: string;
    skip: string;
    start: string;
  };
};
