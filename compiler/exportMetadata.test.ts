// @vitest-environment jsdom
/**
 * 导出 Metadata 为 JSON 文件的脚本
 * 
 * 该脚本从 hsr-optimizer 子模块中读取 Metadata 数据，
 * 并将其转换为 JSON 格式导出到 metadata.json 文件中。
 */

import { Metadata } from '../hsr-optimizer/src/lib/state/metadataInitializer'
import { MainStatsValues, SubStatValues, PartsMainStats } from '../hsr-optimizer/src/lib/constants/constants';
import { writeFileSync } from 'fs'
import { test, expect } from 'vitest'

const baseDataPath = '../src/starrailrelicscore/data/';

test('导出 Metadata 为 JSON 文件', () => {
  // 初始化 Metadata
  const metadata = Metadata.initialize()

  // 定义输出文件路径
  const outputPath = baseDataPath + 'metadata_export.json'

  // 将 Metadata 转换为 JSON 并写入文件
  writeFileSync(outputPath, JSON.stringify(metadata, null, 2))

  console.log(`Metadata 已成功导出到: ${outputPath}`)

  // 验证导出的数据不为空
  expect(metadata).toBeDefined()
  expect(metadata.characters).toBeDefined()
  expect(metadata.lightCones).toBeDefined()
  expect(metadata.relics).toBeDefined()
})

export function getConstants() {
  return {
    main_stats_values: MainStatsValues,
    sub_stat_values: SubStatValues,
    parts_main_stats: PartsMainStats,
  };
}

test('导出 Constants 为 JSON 文件', () => {
  const constants = getConstants();

  // 定义输出文件路径
  const outputPath = baseDataPath + 'constants.json'

  writeFileSync(outputPath, JSON.stringify(constants, null, 2))
})
