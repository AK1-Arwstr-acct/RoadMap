/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        "text-base": "var(--color-text-neutral)",
        "text-base-inverse": "var(--color-text-inverse)",
        "text-neutral-subtle": "var(--color-text-neutral-subtle)",
        "text-constant-white": "var(--color-text-constant-white)",
        "text-disabled": "var(--color-text-disabled)",
        "text-brand-subtle": "var(--color-text-brand-subtle)",
        "text-brand": "var(--color-text-brand)",
        "text-success": "var(--color-text-success)",
        "text-warning": "var(--color-text-warning)",
        "text-error": "var(--color-text-error)",
        "text-info": "var(--color-text-info)",

        "link": "var(--color-link)",
        "link-hovered": "var(--color-link-hovered)",
        "link-pressed": "var(--color-link-pressed)",
        "link-visited": "var(--color-link-visited)",
        "link-visited-hovered": "var(--color-link-visited-hovered)",
        "link-visited-pressed": "var(--color-link-visited-pressed)",

        "background-base": "var(--color-background-base)",
        "background-base-subtle": "var(--color-background-base-subtle)",
        "background-base-subtle-hovered": "var(--color-background-base-subtle-hovered)",
        "background-base-subtle-selected": "var(--color-background-base-subtle-selected)",
        "background-brand": "var(--color-background-brand)",
        "background-brand-subtle": "var(--color-background-brand-subtle)",
        "background-brand-subtle-selected": "var(--color-background-brand-subtle-selected)",
        "background-brand-hovered": "var(--color-background-brand-hovered)",
        "background-neutral-bold": "var(--color-background-neutral-bold)",
        "background-disabled": "var(--color-background-disabled)",

        "divider": "var(--color-divider)",

        "progress-track-brand": "var(--color-progress-track-brand)",
        "progress-indicator-brand": "var(--color-progress-indicator-brand)",

        "border-neutral-subtle": "var(--color-border-neutral-subtle)",
        "border-brand": "var(--color-border-brand)",
        "border-error": "var(--color-border-error)",

        
        "icon-neutral-subtle": "var(--color-icon-neutral-subtle)",
        "icon-neutral": "var(--color-icon-neutral)",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
