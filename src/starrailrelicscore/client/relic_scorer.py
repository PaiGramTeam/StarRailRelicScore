import math
from typing import TYPE_CHECKING, Dict, List

from starrailrelicscore.client.db import get_scoring_metadata
from starrailrelicscore.client.relic_scorer_data import (
    main_stat_free_rolls,
    min_roll_value,
    ratings,
    percent_to_score,
    flat_stat_scaling,
    possible_sub_stats,
)
from starrailrelicscore.data.constants import (
    SubStatValues,
    MainStatsValues,
    PartsMainStats,
)
from starrailrelicscore.models.enums import Stats, Parts, RelicPotentialCases
from starrailrelicscore.models.relic_scorer import Score, TotalScore

if TYPE_CHECKING:
    from starrailrelicscore.data.metadata import METADATA_CH_TYPE


class RelicScorer:
    @staticmethod
    def get_normalization() -> Dict[Stats, float]:
        return {
            Stats.HP_P: 64.8 / 43.2,
            Stats.ATK_P: 64.8 / 43.2,
            Stats.DEF_P: 64.8 / 54,
            Stats.HP: (64.8 / 43.2)
            * SubStatValues[Stats.HP_P.value][5]["high"]
            / SubStatValues[Stats.HP.value][5]["high"],
            Stats.ATK: (64.8 / 43.2)
            * SubStatValues[Stats.ATK_P.value][5]["high"]
            / SubStatValues[Stats.ATK.value][5]["high"],
            Stats.DEF: (64.8 / 54)
            * SubStatValues[Stats.DEF_P.value][5]["high"]
            / SubStatValues[Stats.DEF.value][5]["high"],
            Stats.CR: 64.8 / 32.4,
            Stats.CD: 64.8 / 64.8,
            Stats.OHB: 64.8 / 34.5,
            Stats.EHR: 64.8 / 43.2,
            Stats.RES: 64.8 / 43.2,
            Stats.SPD: 64.8 / 25,
            Stats.BE: 64.8 / 64.8,
        }

    @staticmethod
    def get_relic_score_metadata(character_id: int) -> "METADATA_CH_TYPE":
        normalization = RelicScorer.get_normalization()
        scoring_metadata: "METADATA_CH_TYPE" = get_scoring_metadata(character_id)

        scoring_metadata["stats"][Stats.HP] = (
            scoring_metadata["stats"][Stats.HP_P] * flat_stat_scaling[Stats.HP]
        )
        scoring_metadata["stats"][Stats.ATK] = (
            scoring_metadata["stats"][Stats.ATK_P] * flat_stat_scaling[Stats.ATK]
        )
        scoring_metadata["stats"][Stats.DEF] = (
            scoring_metadata["stats"][Stats.DEF_P] * flat_stat_scaling[Stats.DEF]
        )

        entries = [
            (stat, weight)
            for stat, weight in scoring_metadata["stats"].items()
            if stat in possible_sub_stats
        ]
        entries.sort(
            key=lambda x: x[1] * normalization[x[0]] * SubStatValues[x[0]][5]["high"],
            reverse=True,
        )
        scoring_metadata["sortedSubstats"] = entries
        return scoring_metadata

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
    def count_rating(score: float, relic: Dict = None) -> str:
        if relic and relic["grade"] != 5:
            return "?"
        index = min(math.floor(score / (min_roll_value / 2)), len(ratings) - 1)
        if index < 0:
            return "?"
        return ratings[index]

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
    def get_main_stat_score(
        relic, weights, scoring_metadata: "METADATA_CH_TYPE"
    ) -> float:
        meta_parts = scoring_metadata["parts"]
        part: "Parts" = relic["part"]
        grade: int = relic["grade"]
        stat: "Stats" = relic["main"]["stat"]
        if part is Parts.Head or part is Parts.Hands:
            return 0
            # 根据 grade 决定最大值
        if grade == 2:
            max_value = 12.8562
        elif grade == 3:
            max_value = 25.8165
        elif grade == 4:
            max_value = 43.1304
        else:
            max_value = 64.8
        if stat in meta_parts.get(part, []):
            return max_value * 1
        else:
            return max_value * weights.get(stat, 0)

    @staticmethod
    def get_sub_stat_score(relic: Dict, weights):
        normalization = RelicScorer.get_normalization()
        sum_value = 0
        sub_stat_score = []
        for sub_stat in relic["substats"]:
            score = (
                sub_stat["value"]
                * (weights.get(sub_stat["stat"], 0))
                * normalization[sub_stat["stat"]]
            )
            sum_value += score
            sub_stat_score.append(round(score, 1))
        return sum_value, sub_stat_score

    @staticmethod
    def main_stat_bonus(
        part: "Parts", main_stat: "Stats", scoring_metadata: "METADATA_CH_TYPE"
    ):
        stats = scoring_metadata["stats"]
        parts = scoring_metadata["parts"]
        if part in (Parts.Body, Parts.Feet, Parts.PlanarSphere, Parts.LinkRope):
            multiplier = (
                1 if main_stat in parts.get(part, []) else stats.get(main_stat, 0)
            )
            return 1 * min_roll_value * multiplier
        return 0

    @staticmethod
    def get_handling_case(scoring_metadata):
        substats = scoring_metadata["sortedSubstats"]
        if substats[0][1] == 0:
            return RelicPotentialCases.NONE
        if substats[1][1] == 0:
            return RelicPotentialCases.SINGLE_STAT
        if substats[2][1] > 0:
            return RelicPotentialCases.NORMAL
        if substats[1][0] == Stats.HP and substats[0][0] == Stats.HP_P:
            return RelicPotentialCases.HP
        if substats[1][0] == Stats.HP_P and substats[0][0] == Stats.HP:
            return RelicPotentialCases.HP
        if substats[1][0] == Stats.ATK and substats[0][0] == Stats.ATK_P:
            return RelicPotentialCases.ATK
        if substats[1][0] == Stats.ATK_P and substats[0][0] == Stats.ATK:
            return RelicPotentialCases.ATK
        if substats[1][0] == Stats.DEF and substats[0][0] == Stats.DEF_P:
            return RelicPotentialCases.DEF
        if substats[1][0] == Stats.DEF_P and substats[0][0] == Stats.DEF:
            return RelicPotentialCases.DEF
        return RelicPotentialCases.NORMAL

    @staticmethod
    def fake_relic(
        grade: int, enhance: int, part: "Parts", mainstat: "Stats", substats
    ):
        main_data = MainStatsValues[mainstat.value][str(grade)]
        return {
            "enhance": enhance,
            "grade": grade,
            "part": part,
            "main": {
                "stat": mainstat,
                "value": main_data["base"] + main_data["increment"] * enhance,
            },
            "substats": substats,
        }

    @staticmethod
    def generate_substats(grade: int, sub1, sub2=None, sub3=None, sub4=None):
        def create_entry(sub):
            return {
                "stat": sub["stat"],
                "value": sub["value"],
                "rolls": {
                    "high": SubStatValues[sub["stat"].value][grade]["high"],
                    "mid": SubStatValues[sub["stat"].value][grade]["mid"],
                    "low": SubStatValues[sub["stat"].value][grade]["low"],
                },
                "addedRolls": 0,
            }

        substats = [create_entry(sub1)]
        if sub2 is not None:
            substats.append(create_entry(sub2))
        if sub3 is not None:
            substats.append(create_entry(sub3))
        if sub4 is not None:
            substats.append(create_entry(sub4))

        return substats

    @staticmethod
    def has_main_stat(part: "Parts"):
        return part in (Parts.Body, Parts.Feet, Parts.LinkRope, Parts.PlanarSphere)

    @staticmethod
    def score_optimal_relic(part: "Parts", mainstat: "Stats", character_id: int):
        max_score = 0
        fake = None
        normalization = RelicScorer.get_normalization()
        meta = RelicScorer.get_relic_score_metadata(character_id)
        weights = meta["stats"]
        handling_case = RelicScorer.get_handling_case(meta)
        if handling_case == RelicPotentialCases.NONE:
            max_score = float("inf")
        elif handling_case in (
            RelicPotentialCases.HP,
            RelicPotentialCases.ATK,
            RelicPotentialCases.DEF,
        ):
            # 同 SINGLE_STAT 假设，但需要特殊处理，因为这里实际上有两个被加权的属性
            substats = []
            # meta.sortedSubstats 假定为列表，每项为 [stat, ...]，取第一个元素
            stat1 = meta["sortedSubstats"][0][0]
            stat2 = meta["sortedSubstats"][1][0]
            # 如果部件为 Head 且 handling_case 为 HP
            # 或者部件为 Hands 且 handling_case 为 ATK，则生成单一副词条，
            # 假定百分比类副词条永远比分数型副词条更好
            if (part == Parts.Head and handling_case == RelicPotentialCases.HP) or (
                part == Parts.Hands and handling_case == RelicPotentialCases.ATK
            ):
                # generate_substats(count: int, substat1, ...) 假定返回一个副词条列表
                # 此处主副词条 value 为 SubStatValues[stat1][5].high * 6
                substats = RelicScorer.generate_substats(
                    5,
                    {"stat": stat1, "value": SubStatValues[stat1][5]["high"] * 6},
                )
            else:
                substats = RelicScorer.generate_substats(
                    5,
                    {"stat": stat1, "value": SubStatValues[stat1][5]["high"] * 6},
                    {"stat": stat2, "value": SubStatValues[stat2][5]["high"]},
                )
            # fake_relic(count, level, part, mainstat, substats)，其中 mainstat 此处传入一个无关紧要的值（例如 Constants.Stats.HP_P）
            fake = RelicScorer.fake_relic(5, 15, part, Stats.HP_P, substats)
            max_score, _ = RelicScorer.get_sub_stat_score(fake, weights)
        elif handling_case == RelicPotentialCases.SINGLE_STAT:
            # 假定目的是单一强化某个副词条达到 6 次满高卷（6 high rolls）
            stat = meta["sortedSubstats"][0][0]
            substats = RelicScorer.generate_substats(
                5, {"stat": stat, "value": SubStatValues[stat][5]["high"] * 6}
            )
            fake = RelicScorer.fake_relic(5, 15, part, Stats.HP_P, substats)
            max_score, _ = RelicScorer.get_sub_stat_score(fake, weights)
        elif handling_case == RelicPotentialCases.NORMAL:
            # 标准处理分支
            main_stat_chosen = ""
            optimal_mainstats = meta["parts"].get(part, [])
            # 如果传入的主词条已经在 optimal_mainstats 列表内，或者 meta.stats[mainstat] == 1，
            # 或者 Utils.has_main_stat(part) 返回 False，那么就沿用传入的 mainstat
            if (
                mainstat in optimal_mainstats
                or meta["stats"].get(mainstat) == 1
                or not RelicScorer.has_main_stat(part)
            ):
                main_stat_chosen = mainstat
            else:
                # 获取 meta.stats 所有条目，并构造成列表 [ (stat, weight), ... ]
                # 其中对于属于 optimal_mainstats 或 meta.stats 值为 1 的 mainstat，将权重固定为 1，
                # 其它的则为原始权重
                score_entries = []
                for stat_key, weight in meta["stats"].items():
                    if stat_key in optimal_mainstats or weight == 1:
                        score_entries.append((stat_key, 1))
                    else:
                        score_entries.append((stat_key, weight))

                # 按照评分倒序排序，评分计算逻辑如下：
                def calc_score(entry):
                    stat_name, weight = entry
                    if stat_name not in possible_sub_stats:
                        # 给非副词条属性打分，用 6.48 乘权重
                        return weight * 6.48
                    else:
                        # 对可能作为副词条的属性使用 normalization 和 SubStatValues 里的 high 值
                        return (
                            weight
                            * normalization[stat_name]
                            * SubStatValues[stat_name][5]["high"]
                        )

                score_entries.sort(key=calc_score, reverse=True)

                # possible_mainstats 为部件对应的可能主词条列表
                possible_mainstats = [
                    Stats(i) for i in PartsMainStats.get(part.value, [])
                ]
                # 从排序后的 score_entries 中找到第一个属于 possible_mainstats 的属性
                main_stat_index = next(
                    (
                        i
                        for i, (name, _) in enumerate(score_entries)
                        if name in possible_mainstats
                    ),
                    None,
                )
                if main_stat_index is not None:
                    main_stat_weight = score_entries[main_stat_index][1]
                    main_stat_chosen = score_entries[main_stat_index][0]
                    is_ideal = False
                    is_substat = True
                    # 遍历所有权重相等的条目，寻找更合适的主词条
                    for name, weight in score_entries[main_stat_index:]:
                        if weight != main_stat_weight:
                            break  # 后续权重更低，结束循环
                        if name not in possible_mainstats:
                            continue
                        new_is_ideal = name in optimal_mainstats
                        new_is_substat = name in possible_sub_stats
                        # 如果已选中的是理想主词条且当前不是，则保留原来的选择
                        if is_ideal and not new_is_ideal:
                            continue
                        # 如果已选中的是不能作为副词条，但当前可以，则跳过
                        if not is_substat and new_is_substat:
                            continue
                        # 如果两者条件相同则不置换
                        if (is_ideal == new_is_ideal) and (
                            is_substat == new_is_substat
                        ):
                            continue
                        # 更新主词条选择
                        main_stat_chosen = name
                        is_ideal = new_is_ideal
                        is_substat = new_is_substat
                else:
                    # 如果没有找到可能的 mainstat ，回退使用传入值
                    main_stat_chosen = mainstat

            # 过滤 meta.sortedSubstats，去除与主词条相同的副词条选项
            substat_score_entries = [
                entry
                for entry in meta["sortedSubstats"]
                if entry[0] != main_stat_chosen
            ]
            # 从中取前 4 项
            substats_chosen = substat_score_entries[:4]
            # 生成副词条列表，注意这里传入的各个副词条构造参数不同
            # 假定 generate_substats 的参数格式为 (count, substat1, substat2, substat3, substat4)
            subs = RelicScorer.generate_substats(
                5,
                {
                    "stat": substats_chosen[0][0],
                    "value": SubStatValues[substats_chosen[0][0]][5]["high"] * 6,
                },
                {
                    "stat": substats_chosen[1][0],
                    "value": SubStatValues[substats_chosen[1][0]][5]["high"],
                },
                {
                    "stat": substats_chosen[2][0],
                    "value": SubStatValues[substats_chosen[2][0]][5]["high"],
                },
                {
                    "stat": substats_chosen[3][0],
                    "value": SubStatValues[substats_chosen[3][0]][5]["high"],
                },
            )
            fake = RelicScorer.fake_relic(5, 15, part, main_stat_chosen, subs)
            max_score, _ = RelicScorer.get_sub_stat_score(fake, weights)

        return max_score

    @staticmethod
    def score(relic: Dict, character_id: int) -> Score:
        if (not relic) or (not character_id):
            return Score(
                tid=0, score=0, rating="N/A", main_stat_score=0, sub_stat_score=[]
            )
        scoring_metadata: "METADATA_CH_TYPE" = RelicScorer.get_relic_score_metadata(
            character_id
        )
        weights = scoring_metadata["stats"]

        main_stat_bonus = RelicScorer.main_stat_bonus(
            relic["part"], relic["main"]["stat"], scoring_metadata
        )
        sub_stat_score, sub_stat_score_list = RelicScorer.get_sub_stat_score(
            relic, weights
        )
        ideal_score = RelicScorer.score_optimal_relic(
            relic["part"], relic["main"]["stat"], character_id
        )
        score = sub_stat_score / ideal_score * 100 * percent_to_score + main_stat_bonus
        rating = RelicScorer.count_rating(score, relic)
        main_stat_score = RelicScorer.get_main_stat_score(
            relic, weights, scoring_metadata
        )
        return Score(
            tid=relic["tid"],
            score=round(score, 1),
            rating=rating,
            main_stat_score=main_stat_score,
            sub_stat_score=sub_stat_score_list,
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
