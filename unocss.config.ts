import {
  defineConfig,
  presetUno,
} from "unocss";
import presetIcons from '@unocss/preset-icons'
export default defineConfig({
  shortcuts: {
    'glassmorphism':'bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100',
    'glassmorphism-md':'bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100',
    'glassmorphism-lg':'bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100',
    // utils
    'flex-center': 'items-center justify-center',
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
});
