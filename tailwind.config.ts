import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f7ff',
          500: '#2b6cb0',
          700: '#1e4f84'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
