import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

/**
 * Vitest 配置文件
 * 
 * 用于配置测试环境，包括路径别名和测试运行选项。
 */

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    slowTestThreshold: 500,
  },
  resolve: {
    alias: {
      'data': resolve(__dirname, '../hsr-optimizer/src/data'),
      'hooks': resolve(__dirname, '../hsr-optimizer/src/hooks'),
      'icons': resolve(__dirname, '../hsr-optimizer/src/icons'),
      'lib': resolve(__dirname, '../hsr-optimizer/src/lib'),
      'style': resolve(__dirname, '../hsr-optimizer/src/style'),
      'types': resolve(__dirname, '../hsr-optimizer/src/types'),
    },
  },
})
