import json
import os
from typing import Dict

from starrailrelicscore.models.relic_affix import RelicAffixAll

PATH = os.path.dirname(os.path.abspath(__file__))


class RelicConfig:
    def __init__(self):
        self.relic_datas_map: Dict[int, RelicAffixAll] = {}
        self.load_map()

    def load_map(self):
        with open(os.path.join(PATH, "relic_config.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
            for i in data:
                self.relic_datas_map[i["id"]] = RelicAffixAll(**i)

    def get_affix_by_id(self, cid: int) -> RelicAffixAll:
        return self.relic_datas_map.get(cid)


relic_config = RelicConfig()
