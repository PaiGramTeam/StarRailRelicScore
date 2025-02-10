import { getScoringMetadata } from './lib/state/metadata';
import { MainStatsValues, SubStatValues, PartsMainStats } from './lib/constants/constants';
import * as fs from "node:fs";

export function getConstants() {
  return {
      main_stats_values: MainStatsValues,
      sub_stat_values: SubStatValues,
      parts_main_stats: PartsMainStats,
  };
}


fs.writeFileSync("../../src/starrailrelicscore/data/metadata.json", JSON.stringify(getScoringMetadata()))
fs.writeFileSync("../../src/starrailrelicscore/data/constants.json", JSON.stringify(getConstants()))
