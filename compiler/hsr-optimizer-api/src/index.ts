import { getScoringMetadata } from './lib/dataParser.js';
import * as fs from "node:fs";

fs.writeFileSync("../../src/starrailrelicscore/data/metadata.json", JSON.stringify(getScoringMetadata()))
