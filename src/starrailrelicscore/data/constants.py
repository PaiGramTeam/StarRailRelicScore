import json
import os
from typing import Dict

PATH = os.path.dirname(os.path.abspath(__file__))


def get_constants():
    with open(os.path.join(PATH, "constants.json"), "r", encoding="utf-8") as f:
        constants = json.load(f)
    return constants


def fix_sub_stat_values(data: Dict) -> Dict:
    for k, v in data.items():
        for k1 in list(v.keys()):
            v[int(k1)] = v[k1]
    return data


CONSTANTS = get_constants()
MainStatsValues = CONSTANTS["main_stats_values"]
SubStatValues = fix_sub_stat_values(CONSTANTS["sub_stat_values"])
PartsMainStats = CONSTANTS["parts_main_stats"]
