/** @type {import('tailwindcss').Config} */

// Drona Logitech — "Daylight Deco".
// Ivory paper, parchment panels, red lacquer and warm brass translate the
// glamour and geometry of the transport age into a clear, modern light UI.

// Signal red — the one hot accent. 500 is the brand value and is used for
// FILLS only; 600+ are the tints that clear AA as text on lacquer.
// 300 sits out of order on purpose: `hover:border-brand-300` is the codebase's
// established hover-border idiom and needs to read as a bright edge.
const brand = {
  50: '#FFF1EF',
  100: '#FFE0DB',
  200: '#FFC3BA',
  300: '#F68A7E',
  400: '#EA4E45',
  500: '#DE1C1C',
  600: '#BC1518',
  700: '#941217',
  800: '#6F1117',
  900: '#4B1015',
  950: '#29080B',
};

// Brass — the metal. Replaces the old logistics amber everywhere: rules,
// chevrons, keylines, eyebrows, station nodes.
const sun = {
  50: '#FFF8E7',
  100: '#FFECC1',
  200: '#FFDA87',
  300: '#FEA418',
  400: '#8A5A00',
  500: '#754B00',
  600: '#654000',
  700: '#523500',
  800: '#523800',
  900: '#332200',
};

// Oxblood lacquer — the tertiary. Never competes with signal red.
const grape = {
  50: '#FFF3F1',
  100: '#FCE0DD',
  200: '#F5BBB6',
  300: '#E98A83',
  400: '#D75D59',
  500: '#B83A3E',
  600: '#8E2732',
  700: '#6E1E27',
  800: '#4E1620',
  900: '#331017',
};

// Warm paper → ink. Normal semantic order keeps all existing text utilities
// readable while light backgrounds remain genuinely light.
const ink = {
  50: '#FBF7EF',
  100: '#F4EDE1',
  200: '#E9DECF',
  300: '#D5C8B6',
  400: '#9A8F82',
  500: '#70675E',
  600: '#534C46',
  700: '#3B3532',
  800: '#292321',
  900: '#171418',
  950: '#0D0A0B',
};

const lime = '#FEA418';   // golden highlight
const teal = '#8A5A00';   // accessible brass
const magenta = '#C0555C'; // oxblood highlight

module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand,
        sun,
        grape,
        ink,
        lime,
        teal,
        magenta,
        // Deco names, for markup written against the new system directly.
        noir: '#171418',
        paper: '#FFFCF7',
        parchment: '#F7F0E3',
        lacquer: '#FFF8ED',
        inlay: '#F6E7D4',
        brass: '#8A5A00',
        ivory: '#FFFCF7',
        // legacy aliases so earlier class names keep working
        navy: ink,
        slate: ink,
        accent: brand,
      },
      fontFamily: {
        // Variables are provided by next/font in app/layout.jsx.
        // Jost is a Futura revival — Futura (1927) is the actual Deco-era
        // geometric sans, so one family carries headings, UI and body, with
        // hierarchy coming from scale, weight and letterspacing the way period
        // print did.
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        // Poiret One — reserved for the largest type only. See `.deco-display`.
        deco: ['var(--font-deco)', 'var(--font-display)', 'system-ui', 'sans-serif'],
      },
      // Deco geometry is angular. Every radius collapses to a square corner;
      // `full` survives only for genuine discs (status studs, medallions).
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
      // Deco builds depth with inlay and keyline, not soft shadow. The scale is
      // neutralised so no stray `shadow-lg` reintroduces a glow; deliberate
      // depth is added through component classes.
      boxShadow: {
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
        inner: 'none',
        none: 'none',
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
