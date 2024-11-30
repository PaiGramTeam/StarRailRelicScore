import { getScoringMetadata } from './lib/state/metadata';
import * as fs from "node:fs";

fs.writeFileSync("../../src/starrailrelicscore/data/metadata.json", JSON.stringify(getScoringMetadata()))
