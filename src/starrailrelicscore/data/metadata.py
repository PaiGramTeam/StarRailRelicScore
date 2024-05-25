import json
import os

from typing import Dict, Union, List

from ..models.enums import Stats, Parts

METADATA_CH_TYPE = Dict[str, Union[Dict[Parts, List[Stats]], Dict[Stats, float]]]
METADATA_TYPE = Dict[int, METADATA_CH_TYPE]

PATH = os.path.dirname(os.path.abspath(__file__))


def get_metadata():
    with open(os.path.join(PATH, "metadata.json"), "r", encoding="utf-8") as f:
        metadata: METADATA_TYPE = json.load(f)
    for k, v in metadata.items():
        # fix stats
        stats = v["stats"].copy()
        v["stats"] = {}
        for k2, v2 in stats.items():
            v["stats"][Stats(k2)] = v2  # noqa
        # fix parts
        parts = v["parts"].copy()
        v["parts"] = {}
        for k2, v2 in parts.items():
            v["parts"][Parts(k2)] = [Stats(i) for i in v2]
    return metadata


METADATA = get_metadata()
