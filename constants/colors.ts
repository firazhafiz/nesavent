/**
 * NesaVent — Design System Colors (UNESA Palette)
 */

export const colors = {
  // Brand
  primary: {
    DEFAULT: '#1A1640', // Navy 900
    light: '#342B8D',   // Navy 500
    dark: '#0A0826',    // Darker Navy
    foreground: '#FFFFFF',
  },
  accent: {
    DEFAULT: '#C9973C', // Gold 500
    light: '#E8AC2A',   // Gold 400
    dark: '#876120',    // Gold 700
    foreground: '#FFFFFF',
  },
  secondary: {
    DEFAULT: '#4B3C9C', // Purple 500
    light: '#6258B9',
    dark: '#31276C',
    foreground: '#FFFFFF',
  },

  // Raw Palettes
  navy: {
    50: '#EEEDF5', 100: '#D5D2E9', 200: '#ADA8D2', 300: '#847EBB',
    400: '#5C54A4', 500: '#342B8D', 600: '#2C2478', 700: '#241E63',
    800: '#1E1A52', 900: '#1A1640',
  },
  gold: {
    50: '#FDF5E6', 100: '#FAE9C2', 200: '#F5D68A', 300: '#EFC155',
    400: '#E8AC2A', 500: '#C9973C', 600: '#A87C2E', 700: '#876120',
    800: '#664913', 900: '#4A3309',
  },
  purple: {
    50: '#EDEBF7', 100: '#D5D0ED', 200: '#ABA2DB', 300: '#8173CA',
    400: '#6258B9', 500: '#4B3C9C', 600: '#3E3284', 700: '#31276C',
    800: '#251D54', 900: '#18133C',
  },

  // Semantic
  success: {
    DEFAULT: '#22C55E',
    light: '#DCFCE7',
    foreground: '#FFFFFF',
  },
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FEF3C7',
    foreground: '#FFFFFF',
  },
  info: {
    DEFAULT: '#3B82F6',
    light: '#DBEAFE',
    foreground: '#FFFFFF',
  },
  destructive: {
    DEFAULT: '#EF4444',
    light: '#FEE2E2',
    foreground: '#FFFFFF',
  },

  // Neutral
  background: '#F8F8FA',
  foreground: '#1A1640',
  card: '#FFFFFF',
  muted: {
    DEFAULT: '#EEEEEE',
    foreground: '#757575',
  },
  border: '#E5E7EB',
  input: '#F5F5F5',

  // Status badge backgrounds (translucent)
  status: {
    pending: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.2)' },
    approved: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E', border: 'rgba(34, 197, 94, 0.2)' },
    rejected: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.2)' },
    cancelled: { bg: 'rgba(117, 117, 117, 0.1)', text: '#757575', border: 'rgba(117, 117, 117, 0.2)' },
  },
} as const;

export type Colors = typeof colors;
