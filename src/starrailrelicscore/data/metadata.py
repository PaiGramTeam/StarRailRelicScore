import json
import os

from typing import Dict, List, Tuple, TypedDict

from ..models.enums import Stats, Parts


class METADATA_CH_TYPE(TypedDict):
    stats: Dict[Stats, float]
    parts: Dict[Parts, List[Stats]]
    sortedSubstats: List[Tuple[Stats, float]]


METADATA_TYPE = Dict[str, METADATA_CH_TYPE]

PATH = os.path.dirname(os.path.abspath(__file__))


def get_metadata():
    metadata: METADATA_TYPE = {}
    with open(os.path.join(PATH, "metadata_export.json"), "r", encoding="utf-8") as f:
        metadata_export = json.load(f)
    for k, v in metadata_export["characters"].items():
        real_v = {}
        # fix stats
        stats = v["scoringMetadata"]["stats"].copy()
        real_v["stats"] = {}
        for k2, v2 in stats.items():
            real_v["stats"][Stats(k2)] = v2  # noqa
        # fix parts
        parts = v["scoringMetadata"]["parts"].copy()
        real_v["parts"] = {}
        for k2, v2 in parts.items():
            real_v["parts"][Parts(k2)] = [Stats(i) for i in v2]
        metadata[k] = real_v  # noqa
    return metadata


METADATA = get_metadata()
