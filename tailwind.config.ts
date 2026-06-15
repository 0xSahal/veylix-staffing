import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'vx-white': '#FFFFFF',
        'vx-off': '#F5F7FA',
        'vx-navy': '#060E1F',
        'vx-navy-mid': '#0D1B35',
        'vx-navy-light': '#1E3A5F',
        'vx-blue': '#2563EB',
        'vx-blue-dark': '#1D4ED8',
        'vx-blue-lt': '#EFF6FF',
        'vx-sky': '#38BDF8',
        'vx-gold': '#F59E0B',
        'vx-green': '#22C55E',
        'vx-body': '#1E293B',
        'vx-muted': '#64748B',
        'vx-border': '#E2E8F0',
        'vx-border-dark': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        hero: ['var(--font-bricolage)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        hero: ['80px', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        h2: ['52px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h3: ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h4: ['20px', { lineHeight: '1.4' }],
        'body-lg': ['18px', { lineHeight: '1.75' }],
        body: ['16px', { lineHeight: '1.75' }],
        sm: ['14px', { lineHeight: '1.6' }],
        xs: ['13px', { lineHeight: '1.5' }],
        label: ['11px', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
      spacing: {
        'section-y': '120px',
        'section-y-mobile': '72px',
        'container-px': '80px',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        container: '1320px',
        content: '1160px',
      },
      borderRadius: {
        card: '16px',
        'card-lg': '24px',
        btn: '10px',
        input: '10px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.10)',
        nav: '0 2px 20px rgba(0,0,0,0.06)',
        'glow-blue': '0 0 40px 8px rgba(37,99,235,0.30)',
        'glow-sky': '0 0 30px 6px rgba(56,189,248,0.25)',
        float: '0 20px 60px rgba(0,0,0,0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #060E1F 0%, #0D2456 100%)',
        'gradient-blue': 'linear-gradient(135deg, #2563EB, #1D4ED8)',
        'gradient-gold': 'linear-gradient(90deg, #F59E0B, #D97706)',
        'gradient-section': 'linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-rev': 'marquee-rev 25s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}

export default config
