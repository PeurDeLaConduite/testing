import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['apps/web/tests/setupTests.ts'],
    include: [
      'packages/**/src/**/*.{test,spec}.ts?(x)',
      'packages/**/tests/**/*.{test,spec}.ts?(x)',
      'apps/web/tests/(unit|api)/**/*.{test,spec}.ts?(x)',
    ],
    exclude: [
      'node_modules',
      '.next',
      'dist',
      'coverage',
      'playwright-report',
      'apps/web/tests/_legacy/**',
    ],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['text', 'lcov'],
    },
  },
  esbuild: { jsx: 'automatic', jsxDev: true },
  server: { fs: { allow: ['./'] } },
});
