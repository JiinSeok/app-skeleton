const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1440px',
    },
    fontSize: {
      xs: '0.875rem', // 14px (increased from 12px)
      sm: '1rem', // 16px (increased from 14px)
      base: '1.125rem', // 18px (increased from 16px)
      lg: '1.25rem', // 20px (increased from 18px)
      xl: '1.5rem', // 24px (increased from 20px)
      '2xl': '1.75rem', // 28px (increased from 24px)
      '3xl': '2rem', // 32px (increased from 30px)
      '4xl': '2.5rem', // 40px (increased from 36px)
      '5xl': '3rem', // 48px (increased from 48px)
      '6xl': '3.5rem', // 56px (increased from 60px)
    },
    extend: {
      colors: {
        primary: '#1e40af',
      },
      spacing: {
        1: '0.5rem', // 8px
        2: '0.75rem', // 12px
        3: '1rem', // 16px
        4: '1.5rem', // 24px
        5: '2rem', // 32px
        6: '2.5rem', // 40px
        8: '3rem', // 48px
        10: '4rem', // 64px
        12: '5rem', // 80px
      },
      borderRadius: {
        sm: '0.375rem', // 6px
        DEFAULT: '0.5rem', // 8px
        md: '0.75rem', // 12px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
      },
    },
  },
  plugins: [],
}

export default config
