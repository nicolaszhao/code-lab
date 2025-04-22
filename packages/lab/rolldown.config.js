import { defineConfig } from 'rolldown';
import clear from 'rollup-plugin-clear';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
  ],
  resolve: {
    tsconfigFilename: 'tsconfig.json',
  },
  plugins: [
    clear({
      targets: ['dist'],
    }),
  ],
});
