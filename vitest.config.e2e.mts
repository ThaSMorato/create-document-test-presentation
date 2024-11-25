import swc from 'unplugin-swc'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./tests/e2e/setup-e2e.ts'],
    coverage: {
      exclude: [
        'src/infra/*.ts',
        'src/*/domain/entities/*.ts',
        'src/*/application/repositories/*.ts',
        'tests/**/*.ts',
        '*.config.*',
        'src/core',
      ],
    },
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
