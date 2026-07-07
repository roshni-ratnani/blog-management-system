import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --font-serif: 'Playfair Display', Georgia, serif;
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

    --color-black: #111111;
    --color-white: #ffffff;
    --color-bg: #f9f9f9;
    --color-surface: #ffffff;
    --color-text-primary: #111111;
    --color-text-secondary: #555555;
    --color-text-muted: #999999;
    --color-border: #e8e8e8;
    --color-accent: #111111;

    /* Category colors */
    --cat-technology: #3B82F6;
    --cat-lifestyle: #EC4899;
    --cat-travel: #10B981;
    --cat-business: #F59E0B;
    --cat-economy: #8B5CF6;
    --cat-sports: #EF4444;
    --cat-general: #6B7280;

    --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.06);
    --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;

    --max-width: 1100px;
    --header-height: 60px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-sans);
    background-color: var(--color-bg);
    color: var(--color-text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  button {
    font-family: var(--font-sans);
  }

  input, textarea, select {
    font-family: var(--font-sans);
  }
`;

export default GlobalStyles;
