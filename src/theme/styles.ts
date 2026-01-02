import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { extendTheme } from '@chakra-ui/react';

export const globalStyles = {
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  colors: {
    brand: {
      50: '#F3EEFF',
      100: '#E9E3FF',
      200: '#C9B8FF',
      300: '#A78CFF',
      400: '#7C3AED',
      500: '#6D28D9',
      600: '#5B21B6',
      700: '#481A8C',
      800: '#371463',
      900: '#250C3A',
    },
    purple: {
      50: '#F4EEFF',
      100: '#EADFFF',
      200: '#D1BBFF',
      300: '#B38AFF',
      400: '#8B5CF6',
      500: '#7C3AED',
      600: '#6D28D9',
      700: '#4B1A9B',
      800: '#37106F',
      900: '#240A45',
    },
    navy: {
      50: '#dbe9ff',
      100: '#c5d7ff',
      200: '#a3c0ff',
      300: '#7a9ee6',
      400: '#3652ba',
      500: '#1b3bbb',
      600: '#172355',
      700: '#111c44',
      800: '#0b1437',
      900: '#07132a',
    },
    gray: {
      50: '#f7f8fb',
      100: '#f1f3f8',
      200: '#e6e9f2',
      300: '#dfe6f6',
      400: '#cfd8ea',
      500: '#9aa4b8',
      600: '#6b7280',
      700: '#4b5563',
      800: '#111827',
      900: '#0b1220',
    },
    // keep semantic tokens for compatibility
    secondaryGray: {
      100: '#E0E5F2',
      200: '#E1E9F8',
      300: '#F4F7FE',
      400: '#E9EDF7',
      500: '#8F9BBA',
      600: '#A3AED0',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        overflowX: 'hidden',
        bg: mode('gray.50', 'navy.900')(props),
        fontFamily: 'DM Sans',
        letterSpacing: '-0.5px',
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
