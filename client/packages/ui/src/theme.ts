/**
 * Harvest Lanna Plus — Brand Theme
 *
 * Based on docs/skills/04-style-guide.md
 *
 * Color Palette:
 *   Forest Green   #1E3D2F  — Primary brand color (headings, buttons, key UI)
 *   Espresso Brown #3B2A1E  — Secondary brand color (icons, borders, accents)
 *   Muted Gold     #CBA65A  — Accent color (highlights, CTAs, featured elements)
 *   Warm Ivory     #F5F3ED  — Background color (replaces pure white)
 *
 * Typography:
 *   Headings: Montserrat Bold (700) / SemiBold (600), Forest Green
 *   Body:     Lato Regular (400) / Light (300), Dark Gray
 *
 * Each color has 10 shades (0 = lightest, 9 = darkest).
 * The brand color sits at shade 6 — Mantine's default for filled components.
 */

// ─── Brand Font Imports ───
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';

import { createTheme } from '@mantine/core';

// ─── Color Shade Arrays ───

const forestGreen: [string, string, string, string, string, string, string, string, string, string] = [
  '#eef4f0', // 0 — lightest tint
  '#d2e2d8', // 1
  '#a8c7b2', // 2
  '#7dab8d', // 3
  '#55906a', // 4
  '#387750', // 5
  '#1e3d2f', // 6 — brand color ★
  '#173226', // 7
  '#11231b', // 8
  '#0b1510', // 9 — darkest
];

const espressoBrown: [string, string, string, string, string, string, string, string, string, string] = [
  '#f4f0ec', // 0
  '#e3d2c3', // 1
  '#c9a88c', // 2
  '#b08058', // 3
  '#93613a', // 4
  '#754c2c', // 5
  '#3b2a1e', // 6 — brand color ★
  '#302117', // 7
  '#241810', // 8
  '#180f0a', // 9
];

const mutedGold: [string, string, string, string, string, string, string, string, string, string] = [
  '#fdf6e6', // 0
  '#f8e5bd', // 1
  '#f0cf8a', // 2
  '#e8ba5e', // 3
  '#d9ad4c', // 4
  '#d0a74f', // 5
  '#cba65a', // 6 — brand color ★
  '#a88c3d', // 7
  '#85702f', // 8
  '#635422', // 9
];

const warmIvory: [string, string, string, string, string, string, string, string, string, string] = [
  '#fefdfb', // 0
  '#faf8f4', // 1
  '#f5f3ed', // 2 — brand color
  '#f0ece3', // 3
  '#e6e0d3', // 4
  '#d8d0bf', // 5
  '#c5baa6', // 6
  '#afa18a', // 7
  '#968a72', // 8
  '#7a6f59', // 9
];

// ─── Shared Brand Theme ───

export const harvestTheme = createTheme({
  primaryColor: 'forest-green',

  colors: {
    'forest-green': forestGreen,
    'espresso-brown': espressoBrown,
    'muted-gold': mutedGold,
    'warm-ivory': warmIvory,
  },

  // Warm Ivory replaces pure white — style guide forbids #FFFFFF backgrounds
  white: '#F5F3ED',

  // Typography — Lato body, Montserrat headings
  fontFamily: "'Lato', 'Segoe UI', system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "'Montserrat', 'Segoe UI', system-ui, -apple-system, sans-serif",
    fontWeight: '700',
  },

  defaultRadius: 'md',

  // Default gradient using brand colors
  defaultGradient: {
    from: 'forest-green',
    to: 'muted-gold',
    deg: 135,
  },

  components: {
    Button: {
      defaultProps: {
        size: 'sm',
      },
    },
  },
});
