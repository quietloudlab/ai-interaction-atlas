import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/types.ts', 'src/data.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  external: [],
});
