/** @type {ReturnType<Plugin> | {Config: DaisyUIConfig; Theme: "light" | "dark" | "cupcake" | "bumblebee" | "emerald" | "corporate" | "synthwave" | "retro" | "cyberpunk" | "valentine" | "halloween" | "garden" | "forest" | "aqua" | "lofi" | "pastel" | "fantasy" | "wireframe" | "black" | "luxury" | "dracula" | "cmyk" | "autumn" | "business" | "acid" | "lemonade" | "night" | "coffee" | "winter"; CustomTheme: CustomTheme; readonly default: ReturnType<Plugin>}} */
// eslint-disable-next-line no-undef
const daisyui = require('daisyui')
const tailwindcssAnimated = require('tailwindcss-animated')
export default {
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui,tailwindcssAnimated],
  daisyui: {
    themes: true,
  },
}

