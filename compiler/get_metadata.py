import re
from httpx import get


url = "https://raw.githubusercontent.com/fribbels/hsr-optimizer/main/src/lib/dataParser.js"
HEAD_DATA = """from typing import Dict, Union, List

from ..models.enums import Stats, Parts

METADATA_CH_TYPE = Dict[str, Union[Dict[Parts, List[Stats]], Dict[Stats, float]]]
METADATA_TYPE = Dict[int, METADATA_CH_TYPE]

METADATA = """


def get_js_content() -> str:
    req = get(url)
    return req.text


def find_middle(js_content: str) -> str:
    start = "function getScoringMetadata() {\n  return "
    end = "}\n\nconst getLightConeRanks"
    start_index = js_content.find(start)
    end_index = js_content.find(end)
    return js_content[start_index + len(start) : end_index]


def fix_stats(js_content: str) -> str:
    content = js_content.replace("stats: {", '"stats": {').replace("//", "#")
    content = re.sub(r"\[Constants\.Stats\.(.*?)]", "Stats.\\1", content)
    content = content.replace("Constants.Stats.", "Stats.")
    return content


def fix_parts(js_content: str) -> str:
    content = js_content.replace("parts: {", '"parts": {')
    content = re.sub(r"\[Constants\.Parts\.(.*?)]: ", "Parts.\\1: ", content)
    return content


def fix_relic_sets(js_content: str) -> str:
    content = js_content.replace("relicSets: [", '"relicSets": [')
    content = re.sub(r"Constants\.Sets\.(.*?),", "0,", content)
    return content


def fix_ornament_sets(js_content: str) -> str:
    content = js_content.replace("ornamentSets: [", '"ornamentSets": [')
    return content


def fix_presets(js_content: str) -> str:
    content = js_content.replace("presets: [", '"presets": [')
    content = re.sub(r"PresetEffects\.(.*?),", "0,", content)
    return content


def fix_sort_options(js_content: str) -> str:
    return re.sub(r"sortOption: (.*?),", '"sortOption": 0,', js_content)


def try_save_content(js_content: str) -> None:
    js_content = HEAD_DATA + js_content
    with open("../src/starrailrelicscore/data/metadata.py", "w", encoding="utf-8") as f:
        f.write(js_content)


def main():
    js_content = get_js_content()
    middle = find_middle(js_content)
    fixed_stats = fix_stats(middle)
    fixed_parts = fix_parts(fixed_stats)
    fixed_relic_sets = fix_relic_sets(fixed_parts)
    fixed_ornament_sets = fix_ornament_sets(fixed_relic_sets)
    fixed_presets = fix_presets(fixed_ornament_sets)
    fixed_sort_options = fix_sort_options(fixed_presets)
    try_save_content(fixed_sort_options)


if __name__ == "__main__":
    main()
