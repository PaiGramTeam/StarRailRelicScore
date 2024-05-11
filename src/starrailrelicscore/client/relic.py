from typing import List, Dict

from starrailrelicscore.data.relic_config import relic_config
from starrailrelicscore.errors import StarRailRelicScoreNoRelicConfig
from starrailrelicscore.models.enums import (
    fix_relic_position,
    fix_relic_affix,
)
from starrailrelicscore.models.mihomo import Relic
from starrailrelicscore.models.relic_affix import SingleRelicAffix, RelicAffixAll


class RelicClient:
    @staticmethod
    def get_main_stat(main_affix: "SingleRelicAffix", level: int) -> Dict:
        return {
            "stat": fix_relic_affix(main_affix.property),
            "value": main_affix.get_value(level),
        }

    @staticmethod
    def get_sub_stats(affix: "RelicAffixAll", relic: Relic):
        data = []
        if relic.subAffixList:
            for sub_a in relic.subAffixList:
                sub_affix = affix.sub_affix[str(sub_a.affixId)]
                data.append(
                    {
                        "stat": fix_relic_affix(sub_affix.property),
                        "value": sub_affix.get_value(sub_a.step, sub_a.cnt),
                    }
                )
        return data

    @staticmethod
    def get_relic(relic: Relic) -> Dict:
        config = relic_config.get_affix_by_id(relic.tid)
        if not config:
            raise StarRailRelicScoreNoRelicConfig()
        main_affix = config.main_affix.get(str(relic.mainAffixId))
        return {
            "part": fix_relic_position(config.type),
            "grade": config.rarity,
            "set": str(config.set_id),
            "main": RelicClient.get_main_stat(main_affix, relic.level),
            "substats": RelicClient.get_sub_stats(config, relic),
        }

    @staticmethod
    def get_relics(relics: List[Relic]) -> List[Dict]:
        return [RelicClient.get_relic(relic) for relic in relics]
