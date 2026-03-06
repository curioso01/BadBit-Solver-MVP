import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#0F172A',
        electric: '#38BDF8',
        mint: '#34D399'
      },
      backgroundImage: {
        'premium-glow': 'radial-gradient(circle at top right, rgba(56,189,248,0.22), transparent 40%), radial-gradient(circle at bottom left, rgba(52,211,153,0.15), transparent 50%)'
      },
      boxShadow: {
        glass: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 50px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: []
} satisfies Config;
