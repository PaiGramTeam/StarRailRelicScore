import json
import os
from typing import Dict

from starrailrelicscore.models.enums import Stats

CHARACTER_CH_DATA_TYPE = Dict[str, Dict[int, Dict[Stats, float]]]
CHARACTER_DATA_TYPE = Dict[int, CHARACTER_CH_DATA_TYPE]
PATH = os.path.dirname(os.path.abspath(__file__))


class CharacterData:
    def __init__(self):
        self.CHARACTER_DATA = {}
        self.load_promotions_data()

    def load_promotions_data(self):
        with open(
            os.path.join(PATH, "character_promotions.json"), "r", encoding="utf-8"
        ) as f:
            data = json.load(f)
            for character_id, promotions in data.items():
                cid = int(character_id)
                if cid not in self.CHARACTER_DATA:
                    self.CHARACTER_DATA[cid] = {}
                self.CHARACTER_DATA[cid]["promotions"] = self.parse_base_stats_by_level(
                    promotions
                )

    @staticmethod
    def parse_base_stats_by_level(promotions):
        base = {}
        for i in range(1, 81):
            value_index = (i // 10) - 1
            if i <= 20:
                value_index = 0
            if i > 79:
                value_index = 6

            stat_scaling = promotions["values"][value_index]

            base[i] = {
                Stats.HP: stat_scaling["hp"]["base"]
                + stat_scaling["hp"]["step"] * (i - 1),
                Stats.ATK: stat_scaling["atk"]["base"]
                + stat_scaling["atk"]["step"] * (i - 1),
                Stats.CR: stat_scaling["crit_rate"]["base"]
                + stat_scaling["crit_rate"]["step"] * (i - 1),
                Stats.CD: stat_scaling["crit_dmg"]["base"]
                + stat_scaling["crit_dmg"]["step"] * (i - 1),
                Stats.DEF: stat_scaling["def"]["base"]
                + stat_scaling["def"]["step"] * (i - 1),
                Stats.SPD: stat_scaling["spd"]["base"]
                + stat_scaling["spd"]["step"] * (i - 1),
            }

        return base

    def get_character_data(self, character_id: int) -> "CHARACTER_CH_DATA_TYPE":
        return self.CHARACTER_DATA.get(character_id)


character_data = CharacterData()
