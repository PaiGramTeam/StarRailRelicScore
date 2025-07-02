import re
from httpx import get

url = "https://raw.githubusercontent.com/PaiGramTeam/hsr-optimizer/main/src/lib/"
HEAD_DATA = """import {
  Constants,
  Parts,
  PartsMainStats,
  Sets,
  SetsOrnaments,
  SetsRelics,
  Stats,
} from 'lib/constants/constants'
import {
  DEFAULT_BASIC,
  DEFAULT_BREAK,
  DEFAULT_DOT,
  DEFAULT_FUA,
  DEFAULT_MEMO_SKILL,
  DEFAULT_MEMO_TALENT,
  DEFAULT_SKILL,
  DEFAULT_ULT,
  END_BASIC,
  END_BREAK,
  END_DOT,
  END_FUA,
  END_SKILL,
  END_ULT,
  NULL_TURN_ABILITY_NAME,
  START_BASIC,
  START_SKILL,
  START_ULT,
  WHOLE_BASIC,
  WHOLE_SKILL,
} from 'lib/optimization/rotation/turnAbilityConfig'
import { SortOption } from 'lib/optimization/sortOptions'
import {
  A_GROUNDED_ASCENT,
  ACHERON,
  ALONG_THE_PASSING_SHORE,
  AVENTURINE,
  BLACK_SWAN,
  CIPHER,
  DANCE_DANCE_DANCE,
  EARTHLY_ESCAPADE,
  FLOWING_NIGHTGLOW,
  HUOHUO,
  INHERENTLY_UNJUST_DESTINY,
  KAFKA,
  KAFKA_B1,
  LIES_DANCE_ON_THE_BREEZE,
  LUOCHA,
  MULTIPLICATION,
  NIGHT_OF_FRIGHT,
  PATIENCE_IS_ALL_YOU_NEED,
  PHAINON,
  REFORGED_REMEMBRANCE,
  ROBIN,
  SPARKLE,
  SUNDAY,
  THUS_BURNS_THE_DAWN,
  TINGYUN,
} from 'lib/simulations/tests/testMetadataConstants'

export type PresetDefinition = {
  name: string
  set: SetsRelics | SetsOrnaments
  value: number | boolean
  index?: number
}

export const PresetEffects = {
  // Dynamic values

  fnAshblazingSet: (stacks: number): PresetDefinition => {
    return {
      name: 'fnAshblazingSet',
      value: stacks,
      set: Sets.TheAshblazingGrandDuke,
    }
  },
  fnPioneerSet: (value: number): PresetDefinition => {
    return {
      name: 'fnPioneerSet',
      value: value,
      set: Sets.PioneerDiverOfDeadWaters,
    }
  },
  fnSacerdosSet: (value: number): PresetDefinition => {
    return {
      name: 'fnSacerdosSet',
      value: value,
      set: Sets.SacerdosRelivedOrdeal,
    }
  },

  // Preset values

  PRISONER_SET: {
    name: 'PRISONER_SET',
    value: 3,
    set: Sets.PrisonerInDeepConfinement,
  } as PresetDefinition,
  WASTELANDER_SET: {
    name: 'WASTELANDER_SET',
    value: 2,
    set: Sets.WastelanderOfBanditryDesert,
  } as PresetDefinition,
  VALOROUS_SET: {
    name: 'VALOROUS_SET',
    value: true,
    set: Sets.TheWindSoaringValorous,
  } as PresetDefinition,
  BANANA_SET: {
    name: 'BANANA_SET',
    value: true,
    set: Sets.TheWondrousBananAmusementPark,
  } as PresetDefinition,
  GENIUS_SET: {
    name: 'GENIUS_SET',
    value: true,
    set: Sets.GeniusOfBrilliantStars,
  } as PresetDefinition,
  WARRIOR_SET: {
    name: 'WARRIOR_SET',
    value: true,
    set: Sets.WarriorGoddessOfSunAndThunder,
  } as PresetDefinition,
}

const RELICS_2P_BREAK_EFFECT_SPEED = [
  Sets.MessengerTraversingHackerspace,
  Sets.SacerdosRelivedOrdeal,
  Sets.ThiefOfShootingMeteor,
  Sets.WatchmakerMasterOfDreamMachinations,
  Sets.IronCavalryAgainstTheScourge,
  Sets.WarriorGoddessOfSunAndThunder,
]

const RELICS_2P_SPEED = [
  Sets.MessengerTraversingHackerspace,
  Sets.SacerdosRelivedOrdeal,
  Sets.WarriorGoddessOfSunAndThunder,
]

const RELICS_2P_ATK = [
  Sets.MusketeerOfWildWheat,
  Sets.PrisonerInDeepConfinement,
  Sets.TheWindSoaringValorous,
  Sets.HeroOfTriumphantSong,
]

const SPREAD_RELICS_4P_GENERAL_CONDITIONALS = [
  [Sets.WavestriderCaptain, Sets.WavestriderCaptain],
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
  Sets.ArcadiaOfWovenDreams,
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
  Sets.ForgeOfTheKalpagniLantern,
  Sets.GiantTreeOfRaptBrooding,
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
    try_save_content(
        get_js_content("optimization/rotation/turnAbilityConfig.ts"),
        "optimization/rotation/turnAbilityConfig.ts",
    )
    try_save_content(
        get_js_content("simulations/tests/testMetadataConstants.ts"),
        "simulations/tests/testMetadataConstants.ts",
    )


if __name__ == "__main__":
    main()
