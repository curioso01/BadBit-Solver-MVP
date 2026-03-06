import type { Dictionary } from '@/types/i18n';

export const en: Dictionary = {
  nav: { dashboard: 'Dashboard', import: 'Import', hands: 'Hands', settings: 'Settings', logout: 'Logout' },
  auth: { title: 'BADBIT SOLVER', login: 'Login', signup: 'Sign up', email: 'Email', password: 'Password' },
  dashboard: { title: 'Overview', importedHands: 'Imported Hands', sessions: 'Sessions', leak: 'Leak Finder' },
  import: { title: 'Import Hand History', upload: 'Upload .txt', paste: 'Paste text', submit: 'Process' },
  settings: { title: 'Settings', language: 'Language', theme: 'Theme', currency: 'Currency', timezone: 'Time zone', save: 'Save changes', saving: 'Saving...', success: 'Settings applied successfully.', dateFormat: 'Date format', numberFormat: 'Number format', noChanges: 'No pending changes.' },
  onboarding: {
    title: 'Welcome to BadBit Solver',
    steps: [
      { title: 'Import your hands', description: 'Upload .txt files or paste your hand history to turn real sessions into strategic analysis.' },
      { title: 'Review every decision', description: 'Use visual replay to follow actions street by street and understand pot size, stacks, and showdown.' },
      { title: 'Find your leaks', description: 'The system highlights recurring patterns, problematic spots, and clear improvement opportunities.' },
      { title: 'Study with more clarity', description: 'Dashboards, filters, and metrics help you turn hand volume into better decisions.' },
      { title: 'Make it yours', description: 'Choose language, theme, currency, and time zone to tailor BadBit Solver to your workflow.' }
    ],
    next: 'Next', back: 'Back', skip: 'Skip', start: 'Start now'
  }
};
