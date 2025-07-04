import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        success: '#769656',
        warning: '#D4A373',
        error: '#B54747',
        neutral: {
          '100': '#F5F0E3',
          '300': '#C8C2B0',
          '500': '#8C8973',
          '700': '#494633'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            a: { color: theme('colors.primary.DEFAULT'), textDecoration: 'underline' },
            h1: { color: theme('colors.primary.DEFAULT') },
            h2: { color: theme('colors.primary.DEFAULT') },
            h3: { color: theme('colors.primary.DEFAULT') },
            h4: { color: theme('colors.primary.DEFAULT') },
            strong: { color: theme('colors.primary.DEFAULT') },
            blockquote: { color: theme('colors.primary.DEFAULT'), borderLeftColor: theme('colors.primary.DEFAULT') },
            code: { color: theme('colors.primary.DEFAULT') },
            'ul > li::marker': { color: theme('colors.primary.DEFAULT') },
            'ol > li::marker': { color: theme('colors.primary.DEFAULT') },
          },
        },
        invert: {
          css: {
            color: theme('colors.foreground'),
            a: { color: theme('colors.primary.foreground'), textDecoration: 'underline' },
            h1: { color: theme('colors.primary.foreground') },
            h2: { color: theme('colors.primary.foreground') },
            h3: { color: theme('colors.primary.foreground') },
            h4: { color: theme('colors.primary.foreground') },
            strong: { color: theme('colors.primary.foreground') },
            blockquote: { color: theme('colors.primary.foreground'), borderLeftColor: theme('colors.primary.foreground') },
            code: { color: theme('colors.primary.foreground') },
            'ul > li::marker': { color: theme('colors.primary.foreground') },
            'ol > li::marker': { color: theme('colors.primary.foreground') },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
