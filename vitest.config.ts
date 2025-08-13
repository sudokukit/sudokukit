import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@sudokukit/constants': '/src/constants',
      '@sudokukit/converters': '/src/converters',
      '@sudokukit/generators': '/src/generators',
      '@sudokukit/helpers': '/src/helpers',
      '@sudokukit/luts': '/src/luts',
      '@sudokukit/solvers': '/src/solvers',
      '@sudokukit/types': '/src/types',
    },
  },
  test: { watch: false, include: ['**/*.test.ts'] },
});
