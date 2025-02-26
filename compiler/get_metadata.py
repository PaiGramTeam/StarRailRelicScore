import re
from httpx import get

url = "https://raw.githubusercontent.com/PaiGramTeam/hsr-optimizer/main/src/lib/"
HEAD_DATA = """import { Parts, PartsMainStats, Sets, SetsRelics, Stats, Constants } from 'lib/constants/constants'
import { SortOption } from 'lib/optimization/sortOptions'

const NULL = null as unknown as string
const BASIC = 'BASIC'
const SKILL = 'SKILL'
const ULT = 'ULT'
const FUA = 'FUA'
const MEMO_SKILL = 'MEMO_SKILL'
const MEMO_TALENT = 'MEMO_TALENT'

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
  fnSacerdosSet: (value) => {
    return (form) => {
      form.setConditionals[Sets.SacerdosRelivedOrdeal][1] = value
    }
  },
  PRISONER_SET: (form) => {
    form.setConditionals[Sets.PrisonerInDeepConfinement][1] = 3
  },
  WASTELANDER_SET: (form) => {
    form.setConditionals[Sets.PrisonerInDeepConfinement][1] = 2
  },
  VALOROUS_SET: (form) => {
    form.setConditionals[Sets.TheWindSoaringValorous][1] = true
  },
  BANANA_SET: (form) => {
    form.setConditionals[Sets.TheWondrousBananAmusementPark][1] = true
  },
}

const RELICS_2P_BREAK_EFFECT_SPEED = [
  Sets.MessengerTraversingHackerspace,
  Sets.SacerdosRelivedOrdeal,
  Sets.ThiefOfShootingMeteor,
  Sets.WatchmakerMasterOfDreamMachinations,
  Sets.IronCavalryAgainstTheScourge,
]

const SPREAD_RELICS_4P_GENERAL_CONDITIONALS = [
  [Sets.PoetOfMourningCollapse, Sets.PoetOfMourningCollapse],
  [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
  [Sets.EagleOfTwilightLine, Sets.EagleOfTwilightLine],
]

const SPREAD_ORNAMENTS_2P_FUA = [
  Sets.DuranDynastyOfRunningWolves,
  Sets.SigoniaTheUnclaimedDesolation,
  Sets.InertSalsotto,
]

const SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS = [
  Sets.SigoniaTheUnclaimedDesolation,
]

const SPREAD_ORNAMENTS_2P_ENERGY_REGEN = [
  Sets.SprightlyVonwacq,
  Sets.PenaconyLandOfTheDreams,
  Sets.LushakaTheSunkenSeas,
]

const SPREAD_ORNAMENTS_2P_SUPPORT = [
  Sets.SprightlyVonwacq,
  Sets.BrokenKeel,
  Sets.PenaconyLandOfTheDreams,
  Sets.FleetOfTheAgeless,
  Sets.LushakaTheSunkenSeas,
]

export function getScoringMetadata() {"""


def get_js_content(name: str) -> str:
    req = get(url + name)
    return req.text


def find_middle(js_content: str) -> str:
    start = "function getScoringMetadata(): Record<string, ScoringMetadata> {"
    # end = "\n\nconst getLightConeRanks"
    start_index = js_content.find(start)
    # end_index = js_content.find(end)
    return js_content[start_index + len(start) :]


def fix_sort_options(js_content: str) -> str:
    c = js_content.replace(
        "import { Key } from 'lib/optimization/computedStatsArray'", ""
    )
    return re.sub(r"Key\.\w+", "0", c)


def try_save_content(js_content: str, name: str, need_append: bool = False) -> None:
    if need_append:
        js_content = HEAD_DATA + js_content + "\n"
    with open(f"hsr-optimizer-api/src/lib/{name}", "w", encoding="utf-8") as f:
        f.write(js_content)


def main():
    js_content = get_js_content("state/metadata.ts")
    middle = find_middle(js_content)
    try_save_content(middle, "state/metadata.ts", True)
    try_save_content(get_js_content("constants/constants.ts"), "constants/constants.ts")
    try_save_content(
        fix_sort_options(get_js_content("optimization/sortOptions.ts")),
        "optimization/sortOptions.ts",
    )


if __name__ == "__main__":
    main()
