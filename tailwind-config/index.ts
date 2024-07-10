import {
  sizingVariants,
  spacingVariants,
  zIndexVariants,
  radiusVariants
} from './tokens/sizes';
import { colorPalette } from './tokens/colors';
import safeArea from './tokens/safe-area';
import defaultTheme from 'tailwindcss/defaultTheme';
import { fontNameSpaces } from './tokens/typography';
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

const config = {
  content: ['../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}'],
  preset: {
    theme: {
      extend: {
        borderRadius: {
          circle: '50%',
          ...radiusVariants
        },
        colors: {
          ...colorPalette
        },
        height: {
          ...sizingVariants,
          screen: 'var(--viewport-height, var(--100dvh, 100vh))'
        },
        keyframes: {
          'slide-in-bs': {
            '0%': {
              transform: 'translate(-50%, 100%)'
            },
            '100%': {
              transform: 'translate(-50%, 0%)'
            }
          },
          'slide-out-bs': {
            '0%': {
              transform: 'translate(-50%, 0%)'
            },
            '100%': {
              transform: 'translate(-50%, 100%)'
            }
          }
        },
        animation: {
          'slide-in-bs':
            'slide-in-bs 500ms cubic-bezier(0.22, 1, 0.36, 1) 1 forwards normal',
          'slide-out-bs':
            'slide-out-bs 500ms cubic-bezier(0.22, 1, 0.36, 1) 1 forwards normal'
        },
        fontFamily: {
          'dm-sans': ['"DM Sans"', ...defaultTheme.fontFamily.serif],
          poppins: ['"Poppins', ...defaultTheme.fontFamily.sans],
          'pt-serif': ['"PT Serif"', ...defaultTheme.fontFamily.serif]
        },
        fontWeight: {
          bold: '700',
          extrabold: '800',
          medium: '500',
          regular: '400',
          semibold: '600',
          thin: '300'
        },
        minHeight: {
          screen: 'var(--viewport-height, var(--100dvh, 100vh))'
        },
        screens: {
          pwa: { raw: '(display-mode: standalone)' },
          xs: '380px'
        },
        spacing: {
          ...spacingVariants
        },
        width: {
          ...sizingVariants
        },
        zIndex: {
          ...zIndexVariants
        },
        transitionTimingFunction: {
          'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)'
        }
      }
    }
  },
  plugins: [tailwindScrollbarHide, safeArea, fontNameSpaces]
};

export default config;
