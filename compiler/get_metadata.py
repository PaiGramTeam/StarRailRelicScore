from httpx import get

url = "https://raw.githubusercontent.com/fribbels/hsr-optimizer/main/src/lib/"
HEAD_DATA = """import { Parts, Sets, SetsRelics, Stats, Constants } from 'lib/constants.ts'
import { SortOption } from 'lib/optimizer/sortOptions'

export const PresetEffects = {
  fnAshblazingSet: (stacks) => {
    return (form) => {
      form.setConditionals[Sets.TheAshblazingGrandDuke][1] = stacks
    }
  },
  fnPioneerSet: (value) => {
    return (form) => {
      form.setConditionals[Sets.PioneerDiverOfDeadWaters][1] = value
    }
  },
  PRISONER_SET: (form) => {
    form.setConditionals[Sets.PrisonerInDeepConfinement][1] = 3
  },
  WASTELANDER_SET: (form) => {
    form.setConditionals[Sets.PrisonerInDeepConfinement][1] = 2
  },
}

const RELICS_2P_BREAK_EFFECT_SPEED = [
  Sets.MessengerTraversingHackerspace,
  Sets.ThiefOfShootingMeteor,
  Sets.WatchmakerMasterOfDreamMachinations,
  Sets.IronCavalryAgainstScourge,
]

const SPREAD_RELICS_2P_GENERAL_CONDITIONALS = [
  [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
  [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
]

const SPREAD_ORNAMENTS_2P_FUA = [
  Sets.DuranDynastyOfRunningWolves,
  Sets.SigoniaTheUnclaimedDesolation,
  Sets.InertSalsotto,
]

const SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS = [
  Sets.FirmamentFrontlineGlamoth,
  Sets.SigoniaTheUnclaimedDesolation,
]

export function getScoringMetadata() {"""


def get_js_content(name: str) -> str:
    req = get(url + name)
    return req.text


def find_middle(js_content: str) -> str:
    start = "function getScoringMetadata() {"
    end = "\n\nconst getLightConeRanks"
    start_index = js_content.find(start)
    end_index = js_content.find(end)
    return js_content[start_index + len(start) : end_index]


def try_save_content(js_content: str, name: str, need_append: bool = False) -> None:
    if need_append:
        js_content = HEAD_DATA + js_content + "\n"
    with open(f"hsr-optimizer-api/src/lib/{name}", "w", encoding="utf-8") as f:
        f.write(js_content)


def main():
    js_content = get_js_content("dataParser.js")
    middle = find_middle(js_content)
    try_save_content(middle, "dataParser.js", True)
    try_save_content(get_js_content("constants.ts"), "constants.ts")
    try_save_content(get_js_content("optimizer/sortOptions.ts"), "sortOptions.ts")


if __name__ == "__main__":
    main()
