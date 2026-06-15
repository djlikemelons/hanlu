/** @type {import('tailwindcss').Config} */
// Farben laufen über CSS-Variablen (siehe src/index.css):
// Dark Mode ist Standard, :root.hell überschreibt die Variablen für den hellen Modus.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        grund: 'var(--bg)',
        panel: 'var(--panel)',
        panel2: 'var(--panel2)',
        linie: 'var(--line)',
        tinte: 'var(--text)',
        matt: 'var(--muted)',
        akzent: 'var(--akzent)',
        akzent2: 'var(--akzent2)',
        ok: 'var(--ok)',
        err: 'var(--err)',
        gold: 'var(--gold)',
      },
      borderRadius: {
        '3xl': '1.4rem',
      },
    },
  },
  plugins: [],
}
