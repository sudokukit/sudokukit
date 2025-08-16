import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@sudokukit/converters': '/src/converters',
      '@sudokukit/data': '/src/data',
      '@sudokukit/functions': '/src/functions',
      '@sudokukit/interfaces': '/src/interfaces',
      '@sudokukit/luts': '/src/luts',
      '@sudokukit/solvers': '/src/solvers',
      '@sudokukit/types': '/src/types',
    },
  },
  test: { watch: false, include: ['**/*.test.ts'] },
});
