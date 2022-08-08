import { defineConfig } from 'vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import solidPlugin from 'vite-plugin-solid';
import UnoCss from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';
// @ts-ignore
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
import Icons from 'unplugin-icons/vite';
import Inspect from 'vite-plugin-inspect';
import solidLabels from 'babel-plugin-solid-labels';
import { undestructurePlugin } from 'babel-plugin-solid-undestructure';

export default defineConfig({
  plugins: [
    ...undestructurePlugin('ts'),
    solidPlugin({
      babel: {
        plugins: [[solidLabels, { dev: process.env.NODE_ENV !== 'production' }]],
      },
    }),
    Icons({
      compiler: 'solid',
    }),
    UnoCss({
      shortcuts: [{ logo: 'i-logos-solidjs-icon w-6em h-6em transform transition-800 hover:rotate-360' }],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    }),
    AutoImport({
      imports: ['solid-js'],
      dts: './src/types/auto-imports.d.ts',
      resolvers: [
        IconsResolver({
          componentPrefix: 'Icon',
        }),
      ],
    }),
    Inspect(),
  ],
  build: {
    target: 'esnext',
  },
});
