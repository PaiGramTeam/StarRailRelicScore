from typing import TYPE_CHECKING, Dict, List

from starrailrelicscore.client.db import get_scoring_metadata
from starrailrelicscore.client.relic_scorer_data import (
    main_stat_free_rolls,
    min_roll_value,
    ratings,
)
from starrailrelicscore.data.character_data import character_data
from starrailrelicscore.models.enums import Stats, Parts
from starrailrelicscore.models.relic_scorer import Score, TotalScore

if TYPE_CHECKING:
    from starrailrelicscore.data.metadata import METADATA_CH_TYPE


class RelicScorer:
    @staticmethod
    def get_scaling(character_id: int) -> Dict[Stats, float]:
        base_stats = character_data.get_character_data(character_id)["stats"]
        return {
            Stats.HP_P: 64.8 / 43.2,
            Stats.ATK_P: 64.8 / 43.2,
            Stats.DEF_P: 64.8 / 54,
            Stats.HP: 1 / (base_stats[Stats.HP] * 2 * 0.01) * (64.8 / 43.2),
            Stats.ATK: 1 / (base_stats[Stats.ATK] * 2 * 0.01) * (64.8 / 43.2),
            Stats.DEF: 1 / (base_stats[Stats.DEF] * 2 * 0.01) * (64.8 / 54),
            Stats.CR: 64.8 / 32.4,
            Stats.CD: 64.8 / 64.8,
            Stats.OHB: 64.8 / 34.5,
            Stats.EHR: 64.8 / 43.2,
            Stats.RES: 64.8 / 43.2,
            Stats.SPD: 64.8 / 25,
            Stats.BE: 64.8 / 64.8,
        }

    @staticmethod
    def main_stat_free_roll(
        part: "Parts", main_stat: "Stats", scoring_metadata: "METADATA_CH_TYPE"
    ):
        stats = scoring_metadata["stats"]
        parts = scoring_metadata["parts"]
        if part in [Parts.Body, Parts.Feet, Parts.PlanarSphere, Parts.LinkRope]:
            multiplier = 1 if main_stat in parts[part] else stats[main_stat]
            return main_stat_free_rolls[part][main_stat] * min_roll_value * multiplier
        return 0

    @staticmethod
    def count_rating(sum: float) -> str:
        rating = "F"
        for i in range(len(ratings)):
            if sum >= ratings[i].threshold * min_roll_value:
                rating = ratings[i].rating
                if sum >= (ratings[i].threshold + 0.5) * min_roll_value:
                    rating += "+"
        return rating

    @staticmethod
    def get_main_stat_score(
        relic, multipliers, scoring_metadata: "METADATA_CH_TYPE"
    ) -> float:
        main_stat_score = 0
        meta_parts = scoring_metadata["parts"]
        max_value = 10.368 + 3.6288 * relic["grade"] * 3
        if relic["part"] in meta_parts:
            if relic["main"]["stat"] in meta_parts[relic["part"]]:
                main_stat_score = max_value
            else:
                main_stat_score = max_value * multipliers[relic["main"]["stat"]]
        return main_stat_score

    @staticmethod
    def count_pairs(sets: List[str]) -> int:
        pairs = 0
        obj = {}
        for relic_set in sets:
            if not relic_set:
                continue
            if obj.get(relic_set, 0):
                pairs += 1
                obj[relic_set] = 0
            else:
                obj[relic_set] = 1
        return pairs

    @staticmethod
    def score(relic: Dict, character_id: int) -> Score:
        if (not relic) or (not character_id):
            return Score(
                tid=0, score="0", rating="N/A", main_stat_score=0, sub_stat_score=[]
            )
        scaling = RelicScorer.get_scaling(character_id)
        scoring_metadata: "METADATA_CH_TYPE" = get_scoring_metadata(character_id)
        multipliers = scoring_metadata["stats"]

        sum_value = 0
        sub_stat_score = []
        for sub_stat in relic["substats"]:
            score = (
                sub_stat["value"]
                * (multipliers.get(sub_stat["stat"], 0))
                * scaling[sub_stat["stat"]]
            )
            sum_value += score
            sub_stat_score.append(round(score, 1))

        sum_value += RelicScorer.main_stat_free_roll(
            relic["part"], relic["main"]["stat"], scoring_metadata
        )
        rating = RelicScorer.count_rating(sum_value)
        main_stat_score = RelicScorer.get_main_stat_score(
            relic, multipliers, scoring_metadata
        )

        return Score(
            tid=relic["tid"],
            score=round(sum_value, 1),
            rating=rating,
            main_stat_score=main_stat_score,
            sub_stat_score=sub_stat_score,
            meta=scoring_metadata,
        )

    @staticmethod
    def score_character(character_id: int, relics: List[Dict]) -> TotalScore:
        if not character_id:
            return TotalScore(relics=None, total_score=0, total_rating="N/A")
        scored_relics = [RelicScorer.score(x, character_id) for x in relics]
        sum_value = 0.0
        for relic in scored_relics:
            sum_value += relic.score + relic.main_stat_score

        missing_sets = 3 - RelicScorer.count_pairs([x["set"] for x in relics if x])
        deduction = missing_sets * min_roll_value * 3
        sum_value = max(0, sum_value - deduction)

        base = 64.8 * 4
        avg_sub_stat_score = (sum_value - base) / 6
        rating = RelicScorer.count_rating(avg_sub_stat_score)

        return TotalScore(
            relics=scored_relics, total_score=sum_value, total_rating=rating
        )
