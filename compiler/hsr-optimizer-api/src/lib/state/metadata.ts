import {
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
  BRONYA,
  BUT_THE_BATTLE_ISNT_OVER,
  CASTORICE,
  CERYDRA,
  CIPHER,
  DANCE_DANCE_DANCE,
  EARTHLY_ESCAPADE,
  EPOCH_ETCHED_IN_GOLDEN_BLOOD,
  FEIXIAO,
  FIREFLY,
  FLOWING_NIGHTGLOW,
  FUGUE,
  HUOHUO,
  HYACINE,
  HYSILENS,
  I_VENTURE_FORTH_TO_HUNT,
  IF_TIME_WERE_A_FLOWER,
  INHERENTLY_UNJUST_DESTINY,
  INTO_THE_UNREACHABLE_VEIL,
  JADE,
  JIAOQIU,
  KAFKA_B1,
  LIES_DANCE_ON_THE_BREEZE,
  LINGSHA,
  LONG_MAY_RAINBOWS_ADORN_THE_SKY,
  LONG_ROAD_LEADS_HOME,
  LUOCHA,
  MAKE_FAREWELLS_MORE_BEAUTIFUL,
  MEMORIES_OF_THE_PAST,
  MEMORYS_CURTAIN_NEVER_FALLS,
  MULTIPLICATION,
  NIGHT_OF_FRIGHT,
  PAST_SELF_IN_MIRROR,
  PATIENCE_IS_ALL_YOU_NEED,
  QUID_PRO_QUO,
  REFORGED_REMEMBRANCE,
  ROBIN,
  RUAN_MEI,
  SCENT_ALONE_STAYS_TRUE,
  SPARKLE,
  STELLE_REMEMBRANCE,
  SUNDAY,
  THE_HERTA,
  THOSE_MANY_SPRINGS,
  TINGYUN,
  TOPAZ_NUMBY,
  TRIBBIE,
  WHEREABOUTS_SHOULD_DREAMS_REST,
  WHY_DOES_THE_OCEAN_SING,
  WORRISOME_BLISSFUL,
  YET_HOPE_IS_PRICELESS,
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

const MATCH_2P_WEIGHT = 0.75
const T2_WEIGHT = 0.9

function weights<K extends string>(sets: K[], weight: number = 1) {
  return sets.reduce((acc, set) => {
    acc[set] = weight
    return acc
  }, {} as Record<K, number>)
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

const SPREAD_RELICS_2P_SPEED_WEIGHTS = {
  [Sets.WarriorGoddessOfSunAndThunder]: MATCH_2P_WEIGHT,
  [Sets.MessengerTraversingHackerspace]: MATCH_2P_WEIGHT,
  [Sets.SacerdosRelivedOrdeal]: MATCH_2P_WEIGHT,
}

const SPREAD_RELICS_2P_BREAK_WEIGHTS = {
  [Sets.ThiefOfShootingMeteor]: MATCH_2P_WEIGHT,
  [Sets.WatchmakerMasterOfDreamMachinations]: MATCH_2P_WEIGHT,
  [Sets.IronCavalryAgainstTheScourge]: MATCH_2P_WEIGHT,
}

const SPREAD_RELICS_2P_ATK_WEIGHTS = {
  [Sets.MusketeerOfWildWheat]: MATCH_2P_WEIGHT,
  [Sets.PrisonerInDeepConfinement]: MATCH_2P_WEIGHT,
  [Sets.TheWindSoaringValorous]: MATCH_2P_WEIGHT,
  [Sets.HeroOfTriumphantSong]: MATCH_2P_WEIGHT,
}

const SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS = {
  ...SPREAD_RELICS_2P_ATK_WEIGHTS,
  [Sets.ScholarLostInErudition]: MATCH_2P_WEIGHT,
}

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

const SPREAD_ORNAMENTS_2P_FUA_WEIGHTS = weights(SPREAD_ORNAMENTS_2P_FUA)

const SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS = [
  Sets.SigoniaTheUnclaimedDesolation,
  Sets.ArcadiaOfWovenDreams,
]

const SPREAD_ORNAMENTS_2P_ENERGY_REGEN = [
  Sets.SprightlyVonwacq,
  Sets.PenaconyLandOfTheDreams,
  Sets.LushakaTheSunkenSeas,
]

const SPREAD_ORNAMENTS_2P_ENERGY_REGEN_WEIGHTS = weights(SPREAD_ORNAMENTS_2P_ENERGY_REGEN)

const SPREAD_ORNAMENTS_2P_SUPPORT = [
  Sets.SprightlyVonwacq,
  Sets.BrokenKeel,
  Sets.PenaconyLandOfTheDreams,
  Sets.FleetOfTheAgeless,
  Sets.LushakaTheSunkenSeas,
  Sets.ForgeOfTheKalpagniLantern,
  Sets.GiantTreeOfRaptBrooding,
]

const SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS = weights(SPREAD_ORNAMENTS_2P_SUPPORT)

export function getScoringMetadata() {
  return {
    1001: { // March 7th
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 1,
        [Stats.DEF_P]: 1,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0.50,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.DEF_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.DEF_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.DEF_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.KnightOfPurityPalace]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.BelobogOfTheArchitects]: 1,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.SHIELD,
      addedColumns: [SortOption.SHIELD],
      hiddenColumns: [SortOption.SKILL, SortOption.DOT],
    },
    1002: { // Dan Heng
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Wind_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.EagleOfTwilightLine]: MATCH_2P_WEIGHT,

        [Sets.ScholarLostInErudition]: 1,
        [Sets.PioneerDiverOfDeadWaters]: 1,

        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Wind_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_SKILL,
          END_ULT,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: BRONYA,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1003: { // Himeko
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0.5,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Fire_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.TheAshblazingGrandDuke]: 1,
        [Sets.FiresmithOfLavaForging]: T2_WEIGHT,

        [Sets.SigoniaTheUnclaimedDesolation]: 1,
        [Sets.DuranDynastyOfRunningWolves]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [
        PresetEffects.fnAshblazingSet(8),
        PresetEffects.fnPioneerSet(4),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Fire_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_FUA,
          END_SKILL,
          DEFAULT_FUA,
          START_SKILL,
          END_BREAK,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.TheAshblazingGrandDuke, Sets.TheAshblazingGrandDuke],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: FUGUE,
            lightCone: LONG_ROAD_LEADS_HOME,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1004: { // Welt
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 1,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Imaginary_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.WastelanderOfBanditryDesert]: 1,

        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.PanCosmicCommercialEnterprise]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [
        PresetEffects.WASTELANDER_SET,
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Imaginary_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.FirmamentFrontlineGlamoth,
          Sets.IzumoGenseiAndTakamaDivineRealm,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: ACHERON,
            lightCone: ALONG_THE_PASSING_SHORE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: JIAOQIU,
            lightCone: THOSE_MANY_SPRINGS,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1005: { // Kafka
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0.5,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Lightning_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.PrisonerInDeepConfinement]: 1,
        [Sets.BandOfSizzlingThunder]: T2_WEIGHT,

        [Sets.RevelryByTheSea]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.PRISONER_SET,
        PresetEffects.fnAshblazingSet(6),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.DOT,
      hiddenColumns: [],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Lightning_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.ATK,
          Stats.EHR,
          Stats.CR,
          Stats.CD,
        ],
        breakpoints: {
          [Stats.EHR]: 0.282,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_DOT,
          DEFAULT_SKILL,
          END_DOT,
          DEFAULT_FUA,
          START_SKILL,
          END_DOT,
          DEFAULT_FUA,
          START_SKILL,
          END_DOT,
          DEFAULT_FUA,
        ],
        comboDot: 16,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.FirmamentFrontlineGlamoth,
          Sets.RevelryByTheSea,
        ],
        teammates: [
          {
            characterId: BLACK_SWAN,
            lightCone: REFORGED_REMEMBRANCE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HYSILENS,
            lightCone: WHY_DOES_THE_OCEAN_SING,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1006: { // Silver Wolf
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.Quantum_DMG,
          Stats.ATK_P,
          Stats.HP_P,
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.ATK_P,
          Stats.BE,
        ],
      },
      sets: {
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.SacerdosRelivedOrdeal]: 1,

        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.PanCosmicCommercialEnterprise]: 1,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
    },
    1008: { // Arlan
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Lightning_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.BandOfSizzlingThunder]: T2_WEIGHT,
        [Sets.LongevousDisciple]: T2_WEIGHT,

        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Lightning_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HYACINE,
            lightCone: LONG_MAY_RAINBOWS_ADORN_THE_SKY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1009: { // Asta
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0.5,
      },
      parts: {
        [Parts.Body]: [],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.SacerdosRelivedOrdeal]: 1,

        [Sets.EagleOfTwilightLine]: 1,
        [Sets.WatchmakerMasterOfDreamMachinations]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.SPD,
      hiddenColumns: [SortOption.ULT, SortOption.FUA],
    },
    1013: { // Herta
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Ice_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.TheAshblazingGrandDuke]: 1,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.HunterOfGlacialForest]: T2_WEIGHT,

        [Sets.SigoniaTheUnclaimedDesolation]: 1,
        [Sets.DuranDynastyOfRunningWolves]: 1,
        [Sets.InertSalsotto]: 1,
        [Sets.RutilantArena]: 1,
      },
      presets: [
        PresetEffects.fnAshblazingSet(8),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Ice_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_FUA,
          END_SKILL,
          DEFAULT_FUA,
          WHOLE_SKILL,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.TheAshblazingGrandDuke, Sets.TheAshblazingGrandDuke],
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.HunterOfGlacialForest, Sets.HunterOfGlacialForest],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: THE_HERTA,
            lightCone: INTO_THE_UNREACHABLE_VEIL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1101: { // Bronya
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ERR,
        ],
      },
      sets: {
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.SacerdosRelivedOrdeal]: 1,

        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.CD,
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.DOT],
    },
    1102: { // Seele
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Quantum_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.ScholarLostInErudition]: 1,

        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          DEFAULT_SKILL,
          END_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: SPARKLE,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LUOCHA,
            lightCone: QUID_PRO_QUO,
            characterEidolon: 0,
            lightConeSuperimposition: 5,
          },
        ],
      },
    },
    1103: { // Serval
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Lightning_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.BandOfSizzlingThunder]: T2_WEIGHT,

        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.FUA],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Lightning_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        deprioritizeBuffs: true,
        relicSets: [
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.BandOfSizzlingThunder, Sets.BandOfSizzlingThunder],
          [Sets.EagleOfTwilightLine, Sets.EagleOfTwilightLine],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.FirmamentFrontlineGlamoth,
          Sets.RutilantArena,
          Sets.SprightlyVonwacq,
          ...SPREAD_ORNAMENTS_2P_ENERGY_REGEN,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: THE_HERTA,
            lightCone: INTO_THE_UNREACHABLE_VEIL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1104: { // Gepard
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 1,
        [Stats.DEF_P]: 1,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0.75,
        [Stats.RES]: 0.50,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.DEF_P,
        ],
        [Parts.Feet]: [
          Stats.DEF_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.DEF_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.KnightOfPurityPalace]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.BelobogOfTheArchitects]: 1,
      },
      presets: [],
      sortOption: SortOption.SHIELD,
      addedColumns: [SortOption.SHIELD],
      hiddenColumns: [SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1105: { // Natasha
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.50,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.HP_P,
          Stats.OHB,
        ],
        [Parts.Feet]: [
          Stats.HP_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.LongevousDisciple]: MATCH_2P_WEIGHT,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.PasserbyOfWanderingCloud]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.GiantTreeOfRaptBrooding]: 1,
      },
      presets: [
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.HEAL,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1106: { // Pela
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.EHR,
          Stats.HP_P,
          Stats.DEF_P,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
          Stats.DEF_P,
          Stats.Ice_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.SPD,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
    },
    1107: { // Clara
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Physical_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.TheAshblazingGrandDuke]: MATCH_2P_WEIGHT,
        [Sets.PoetOfMourningCollapse]: 1,
        [Sets.ChampionOfStreetwiseBoxing]: 1,
        [Sets.LongevousDisciple]: T2_WEIGHT,

        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
      },
      presets: [
        PresetEffects.fnAshblazingSet(2),
        PresetEffects.fnSacerdosSet(1),
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.ULT, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          DEFAULT_FUA,
          DEFAULT_FUA,
          WHOLE_SKILL,
          DEFAULT_FUA,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ChampionOfStreetwiseBoxing, Sets.ChampionOfStreetwiseBoxing],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1108: { // Sampo
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Wind_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.ATK_P,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.EagleOfTwilightLine]: MATCH_2P_WEIGHT,
        [Sets.PrisonerInDeepConfinement]: 1,

        [Sets.RevelryByTheSea]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.PanCosmicCommercialEnterprise]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.PRISONER_SET,
      ],
      sortOption: SortOption.DOT,
      hiddenColumns: [SortOption.FUA],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Wind_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.EHR,
          Stats.ATK,
          Stats.CR,
          Stats.CD,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          DEFAULT_DOT,
          WHOLE_SKILL,
          DEFAULT_DOT,
          WHOLE_SKILL,
          DEFAULT_DOT,
        ],
        comboDot: 60,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RevelryByTheSea,
          Sets.FirmamentFrontlineGlamoth,
        ],
        teammates: [
          {
            characterId: KAFKA_B1,
            lightCone: PATIENCE_IS_ALL_YOU_NEED,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HYSILENS,
            lightCone: WHY_DOES_THE_OCEAN_SING,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1109: { // Hook
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Fire_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.FiresmithOfLavaForging]: T2_WEIGHT,

        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Fire_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: SPARKLE,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1110: { // Lynx
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.50,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.HP_P,
          Stats.OHB,
        ],
        [Parts.Feet]: [
          Stats.HP_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.PasserbyOfWanderingCloud]: 1,
        [Sets.SacerdosRelivedOrdeal]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.HEAL,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1111: { // Luka
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Physical_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.BE,
        ],
      },
      sets: {
        [Sets.PrisonerInDeepConfinement]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,
        [Sets.ChampionOfStreetwiseBoxing]: 1,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,

        [Sets.RevelryByTheSea]: 1,
        [Sets.TaliaKingdomOfBanditry]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.PanCosmicCommercialEnterprise]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.PRISONER_SET,
      ],
      sortOption: SortOption.DOT,
      hiddenColumns: [SortOption.FUA],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
            Stats.BE,
          ],
        },
        substats: [
          Stats.BE,
          Stats.ATK_P,
          Stats.ATK,
          Stats.EHR,
          Stats.CR,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          END_BREAK,
          DEFAULT_DOT,
          START_BASIC,
          END_DOT,
          DEFAULT_DOT,
          START_BASIC,
          END_DOT,
          DEFAULT_DOT,
        ],
        comboDot: 5,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
          RELICS_2P_BREAK_EFFECT_SPEED,
        ],
        ornamentSets: [
          Sets.TaliaKingdomOfBanditry,
          Sets.FirmamentFrontlineGlamoth,
          Sets.RevelryByTheSea,
        ],
        teammates: [
          {
            characterId: FUGUE,
            lightCone: LONG_ROAD_LEADS_HOME,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1112: { // Topaz and Numby
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.Fire_DMG,
          Stats.ATK_P,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.FiresmithOfLavaForging]: MATCH_2P_WEIGHT,

        [Sets.TheAshblazingGrandDuke]: 1,
        [Sets.PioneerDiverOfDeadWaters]: 1,

        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
        [Sets.DuranDynastyOfRunningWolves]: 1,
        [Sets.TheWondrousBananAmusementPark]: 1,
        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
      },
      presets: [
        PresetEffects.fnAshblazingSet(0),
        PresetEffects.BANANA_SET,
        PresetEffects.fnPioneerSet(4),
        PresetEffects.fnSacerdosSet(1),
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.ULT, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Fire_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        errRopeEidolon: 6,
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_BASIC,
          DEFAULT_FUA,
          DEFAULT_FUA,
          WHOLE_SKILL,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        deprioritizeBuffs: true,
        relicSets: [
          [Sets.TheAshblazingGrandDuke, Sets.TheAshblazingGrandDuke],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          Sets.TheWondrousBananAmusementPark,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: FEIXIAO,
            lightCone: I_VENTURE_FORTH_TO_HUNT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1201: { // Qingque
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Quantum_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PoetOfMourningCollapse]: 1,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.ScholarLostInErudition]: 1,

        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
        PresetEffects.fnSacerdosSet(2),
      ],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.SKILL, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_SKILL,
          DEFAULT_ULT,
          END_BASIC,
          DEFAULT_FUA,
          START_SKILL,
          END_BASIC,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.PoetOfMourningCollapse, Sets.PoetOfMourningCollapse],
          [Sets.SacerdosRelivedOrdeal, Sets.SacerdosRelivedOrdeal],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: SPARKLE,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1202: { // Tingyun
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.HP_P,
          Stats.DEF_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
          Stats.DEF_P,
          Stats.ATK_P,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.SacerdosRelivedOrdeal]: 1,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.MusketeerOfWildWheat]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.SPD,
      hiddenColumns: [SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1203: { // Luocha
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.50,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.OHB,
          Stats.HP_P,
          Stats.DEF_P,
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.HP_P,
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.PasserbyOfWanderingCloud]: 1,
        [Sets.MusketeerOfWildWheat]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.WASTELANDER_SET,
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.SPD,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
    },
    1204: { // Jing Yuan
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Lightning_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.TheAshblazingGrandDuke]: 1,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.BandOfSizzlingThunder]: T2_WEIGHT,

        [Sets.TheWondrousBananAmusementPark]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [
        PresetEffects.fnAshblazingSet(8),
        PresetEffects.VALOROUS_SET,
        PresetEffects.BANANA_SET,
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Lightning_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
          DEFAULT_FUA,
          WHOLE_SKILL,
          START_ULT,
          END_SKILL,
          DEFAULT_FUA,
          WHOLE_SKILL,
          WHOLE_SKILL,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.TheAshblazingGrandDuke, Sets.TheAshblazingGrandDuke],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.TheWondrousBananAmusementPark,
          Sets.InertSalsotto,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: SUNDAY,
            lightCone: A_GROUNDED_ASCENT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1205: { // Blade
      stats: {
        [Stats.ATK]: 0.25,
        [Stats.ATK_P]: 0.25,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.HP_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.Wind_DMG,
          Stats.HP_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
        ],
      },
      sets: {
        [Sets.ScholarLostInErudition]: MATCH_2P_WEIGHT,
        [Sets.EagleOfTwilightLine]: MATCH_2P_WEIGHT,
        [Sets.LongevousDisciple]: 1,
        [Sets.MusketeerOfWildWheat]: T2_WEIGHT,

        [Sets.BoneCollectionsSereneDemesne]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.InertSalsotto]: 1,
        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
        PresetEffects.fnSacerdosSet(1),
      ],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.SKILL, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.HP_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.HP_P,
            Stats.Wind_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.HP_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
          Stats.HP,
          Stats.ATK_P,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_SKILL,
          DEFAULT_ULT,
          END_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
          WHOLE_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.LongevousDisciple, Sets.LongevousDisciple],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.BoneCollectionsSereneDemesne,
          Sets.RutilantArena,
          Sets.InertSalsotto,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: CASTORICE,
            lightCone: MAKE_FAREWELLS_MORE_BEAUTIFUL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HYACINE,
            lightCone: LONG_MAY_RAINBOWS_ADORN_THE_SKY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1206: { // Sushang
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0.5,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Physical_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.WatchmakerMasterOfDreamMachinations]: MATCH_2P_WEIGHT,
        [Sets.ChampionOfStreetwiseBoxing]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,

        [Sets.TaliaKingdomOfBanditry]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
            Stats.BE,
          ],
        },
        substats: [
          Stats.CR,
          Stats.CD,
          Stats.ATK_P,
          Stats.BE,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_SKILL,
          DEFAULT_ULT,
          END_BREAK,
          WHOLE_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.ChampionOfStreetwiseBoxing, Sets.ChampionOfStreetwiseBoxing],
          [Sets.IronCavalryAgainstTheScourge, Sets.IronCavalryAgainstTheScourge],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.FirmamentFrontlineGlamoth,
          Sets.TaliaKingdomOfBanditry,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          Sets.RutilantArena,
        ],
        teammates: [
          {
            characterId: FUGUE,
            lightCone: LONG_ROAD_LEADS_HOME,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1207: { // Yukong
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Imaginary_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.ATK_P,
        ],
      },
      sets: {
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.SacerdosRelivedOrdeal]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.WASTELANDER_SET,
        PresetEffects.fnSacerdosSet(1),
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
    },
    1208: { // Fu Xuan
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.75,
        [Stats.DEF_P]: 0.75,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.5,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.HP_P,
          Stats.DEF_P,
        ],
        [Parts.Feet]: [
          Stats.HP_P,
          Stats.DEF_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
          Stats.DEF_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.LongevousDisciple]: 1,
        [Sets.GuardOfWutheringSnow]: MATCH_2P_WEIGHT,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.EHP,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
    },
    1209: { // Yanqing
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Ice_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.HunterOfGlacialForest]: 1,

        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
        PresetEffects.fnAshblazingSet(2),
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Ice_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CR,
          Stats.CD,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          END_FUA,
          START_SKILL,
          END_FUA,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.HunterOfGlacialForest, Sets.HunterOfGlacialForest],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: BRONYA,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1210: { // Guinaifen
      stats: {
        [Stats.ATK]: 0.5,
        [Stats.ATK_P]: 0.5,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Fire_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.FiresmithOfLavaForging]: MATCH_2P_WEIGHT,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.PrisonerInDeepConfinement]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.FleetOfTheAgeless]: 1,
      },
      presets: [
        PresetEffects.PRISONER_SET,
      ],
      sortOption: SortOption.SPD,
      hiddenColumns: [SortOption.FUA],
    },
    1211: { // Bailu
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.50,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.OHB,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.HP_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
          Stats.ERR,
        ],
      },
      sets: {
        [Sets.LongevousDisciple]: MATCH_2P_WEIGHT,
        [Sets.SacerdosRelivedOrdeal]: MATCH_2P_WEIGHT,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.PasserbyOfWanderingCloud]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.GiantTreeOfRaptBrooding]: 1,
      },
      presets: [
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.HEAL,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1212: { // Jingliu
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Ice_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.HunterOfGlacialForest]: T2_WEIGHT,

        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Ice_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        errRopeEidolon: 0,
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          DEFAULT_ULT,
          WHOLE_SKILL,
          WHOLE_SKILL,
          START_SKILL,
          END_ULT,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.HunterOfGlacialForest, Sets.HunterOfGlacialForest],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: BRONYA,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1213: { // Dan Heng • Imbibitor Lunae
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Imaginary_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PoetOfMourningCollapse]: 1,
        [Sets.WastelanderOfBanditryDesert]: 1,
        [Sets.MusketeerOfWildWheat]: 1,

        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.WASTELANDER_SET,
      ],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Imaginary_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_BASIC,
          WHOLE_BASIC,
          WHOLE_BASIC,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.MusketeerOfWildWheat, Sets.MusketeerOfWildWheat],
          [Sets.WastelanderOfBanditryDesert, Sets.WastelanderOfBanditryDesert],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: SUNDAY,
            lightCone: A_GROUNDED_ASCENT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LUOCHA,
            lightCone: QUID_PRO_QUO,
            characterEidolon: 0,
            lightConeSuperimposition: 5,
          },
        ],
      },
    },
    1214: { // Xueyi
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.Quantum_DMG,
          Stats.ATK_P,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.WatchmakerMasterOfDreamMachinations]: MATCH_2P_WEIGHT,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.ThiefOfShootingMeteor]: T2_WEIGHT,

        [Sets.TaliaKingdomOfBanditry]: 1,
        [Sets.SpaceSealingStation]: 1,
        [Sets.InertSalsotto]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
      },
      presets: [
        PresetEffects.fnAshblazingSet(3),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
            Stats.BE,
          ],
        },
        substats: [
          Stats.BE,
          Stats.ATK_P,
          Stats.CR,
          Stats.CD,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_BREAK,
          DEFAULT_FUA,
          END_SKILL,
          DEFAULT_FUA,
          WHOLE_SKILL,
          DEFAULT_FUA,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.PoetOfMourningCollapse, Sets.PoetOfMourningCollapse],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.TaliaKingdomOfBanditry,
          Sets.InertSalsotto,
          Sets.SpaceSealingStation,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: FUGUE,
            lightCone: LONG_ROAD_LEADS_HOME,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1215: { // Hanya
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.SacerdosRelivedOrdeal]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.SPD,
      hiddenColumns: [SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1217: { // Huohuo
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.50,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.HP_P,
          Stats.OHB,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.HP_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.PasserbyOfWanderingCloud]: 1,
        [Sets.MessengerTraversingHackerspace]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.HEAL,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1218: { // Jiaoqiu
      stats: {
        [Constants.Stats.ATK]: 0.5,
        [Constants.Stats.ATK_P]: 0.5,
        [Constants.Stats.DEF]: 0.25,
        [Constants.Stats.DEF_P]: 0.25,
        [Constants.Stats.HP]: 0.25,
        [Constants.Stats.HP_P]: 0.25,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 0,
        [Constants.Stats.CD]: 0,
        [Constants.Stats.EHR]: 1,
        [Constants.Stats.RES]: 0.25,
        [Constants.Stats.BE]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.ATK_P,
          Constants.Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.FiresmithOfLavaForging]: MATCH_2P_WEIGHT,
        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.PRISONER_SET,
      ],
      sortOption: SortOption.EHR,
      hiddenColumns: [SortOption.FUA],
    },
    1220: { // Feixiao
      stats: {
        [Constants.Stats.ATK]: 0.75,
        [Constants.Stats.ATK_P]: 0.75,
        [Constants.Stats.DEF]: 0,
        [Constants.Stats.DEF_P]: 0,
        [Constants.Stats.HP]: 0,
        [Constants.Stats.HP_P]: 0,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 1,
        [Constants.Stats.CD]: 1,
        [Constants.Stats.EHR]: 0,
        [Constants.Stats.RES]: 0,
        [Constants.Stats.BE]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
          Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.ATK_P,
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.ATK_P,
          Constants.Stats.Wind_DMG,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.EagleOfTwilightLine]: MATCH_2P_WEIGHT,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.TheWindSoaringValorous]: 1,
        [Sets.TheAshblazingGrandDuke]: 1,

        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
      },
      presets: [
        PresetEffects.fnAshblazingSet(1),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Wind_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.CR,
          Stats.CD,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          END_FUA,
          DEFAULT_FUA,
          START_ULT,
          DEFAULT_SKILL,
          END_FUA,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.TheWindSoaringValorous, Sets.TheWindSoaringValorous],
          [Sets.TheAshblazingGrandDuke, Sets.TheAshblazingGrandDuke],
          [Sets.EagleOfTwilightLine, Sets.EagleOfTwilightLine],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: CIPHER,
            lightCone: LIES_DANCE_ON_THE_BREEZE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1221: { // Yunli
      stats: {
        [Constants.Stats.ATK]: 0.75,
        [Constants.Stats.ATK_P]: 0.75,
        [Constants.Stats.DEF]: 0,
        [Constants.Stats.DEF_P]: 0,
        [Constants.Stats.HP]: 0,
        [Constants.Stats.HP_P]: 0,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 1,
        [Constants.Stats.CD]: 1,
        [Constants.Stats.EHR]: 0,
        [Constants.Stats.RES]: 0,
        [Constants.Stats.BE]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
          Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.ATK_P,
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.ATK_P,
          Constants.Stats.Physical_DMG,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.ChampionOfStreetwiseBoxing]: MATCH_2P_WEIGHT,
        [Sets.TheWindSoaringValorous]: 1,
        [Sets.PoetOfMourningCollapse]: 1,
        [Sets.TheAshblazingGrandDuke]: 1,

        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
        PresetEffects.fnPioneerSet(4),
        PresetEffects.fnAshblazingSet(8),
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.ULT, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        errRopeEidolon: 0,
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          DEFAULT_FUA,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.TheWindSoaringValorous, Sets.TheWindSoaringValorous],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TINGYUN,
            lightCone: MEMORIES_OF_THE_PAST,
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1222: { // Lingsha
      stats: {
        [Constants.Stats.ATK]: 1.00,
        [Constants.Stats.ATK_P]: 1.00,
        [Constants.Stats.DEF]: 0.25,
        [Constants.Stats.DEF_P]: 0.25,
        [Constants.Stats.HP]: 0.25,
        [Constants.Stats.HP_P]: 0.25,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 0,
        [Constants.Stats.CD]: 0,
        [Constants.Stats.EHR]: 0,
        [Constants.Stats.RES]: 0.50,
        [Constants.Stats.BE]: 1,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.ATK_P,
          Constants.Stats.OHB,
          Constants.Stats.DEF_P,
          Constants.Stats.HP_P,
          Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.ATK_P,
          Constants.Stats.DEF_P,
          Constants.Stats.HP_P,
          Constants.Stats.Fire_DMG,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.BE,
          Constants.Stats.ERR,
          Constants.Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_BREAK_WEIGHTS,
        [Sets.PasserbyOfWanderingCloud]: MATCH_2P_WEIGHT,
        [Sets.IronCavalryAgainstTheScourge]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.GiantTreeOfRaptBrooding]: 1,
        [Sets.ForgeOfTheKalpagniLantern]: 1,
        [Sets.TaliaKingdomOfBanditry]: 1,
      },
      presets: [
        PresetEffects.BANANA_SET,
        PresetEffects.fnAshblazingSet(6),
        PresetEffects.VALOROUS_SET,
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.BE,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.DOT],
    },
    1223: { // Moze
      stats: {
        [Constants.Stats.ATK]: 0.75,
        [Constants.Stats.ATK_P]: 0.75,
        [Constants.Stats.DEF]: 0,
        [Constants.Stats.DEF_P]: 0,
        [Constants.Stats.HP]: 0,
        [Constants.Stats.HP_P]: 0,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 1,
        [Constants.Stats.CD]: 1,
        [Constants.Stats.EHR]: 0,
        [Constants.Stats.RES]: 0,
        [Constants.Stats.BE]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
          Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.ATK_P,
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.ATK_P,
          Constants.Stats.Lightning_DMG,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.TheAshblazingGrandDuke]: 1,

        [Sets.DuranDynastyOfRunningWolves]: 1,
        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
        [Sets.InertSalsotto]: T2_WEIGHT,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
        PresetEffects.fnAshblazingSet(6),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Lightning_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.CR,
          Stats.CD,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          WHOLE_SKILL,
          DEFAULT_ULT,
          DEFAULT_FUA,
          DEFAULT_FUA,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        deprioritizeBuffs: true,
        relicSets: [
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          [Sets.TheAshblazingGrandDuke, Sets.TheAshblazingGrandDuke],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          Sets.IzumoGenseiAndTakamaDivineRealm,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: FEIXIAO,
            lightCone: I_VENTURE_FORTH_TO_HUNT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1224: { // March 8th
      stats: {
        [Constants.Stats.ATK]: 0.75,
        [Constants.Stats.ATK_P]: 0.75,
        [Constants.Stats.DEF]: 0,
        [Constants.Stats.DEF_P]: 0,
        [Constants.Stats.HP]: 0,
        [Constants.Stats.HP_P]: 0,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 1,
        [Constants.Stats.CD]: 1,
        [Constants.Stats.EHR]: 0,
        [Constants.Stats.RES]: 0,
        [Constants.Stats.BE]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
          Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.ATK_P,
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.ATK_P,
          Constants.Stats.Imaginary_DMG,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.MusketeerOfWildWheat]: 1,
        [Sets.WastelanderOfBanditryDesert]: 1,

        [Sets.RutilantArena]: 1,
        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
      },
      presets: [
        PresetEffects.fnAshblazingSet(2),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.SKILL, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Imaginary_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.CR,
          Stats.CD,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_BREAK,
          END_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        deprioritizeBuffs: true,
        relicSets: [
          [Sets.MusketeerOfWildWheat, Sets.MusketeerOfWildWheat],
          [Sets.WastelanderOfBanditryDesert, Sets.WastelanderOfBanditryDesert],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.IzumoGenseiAndTakamaDivineRealm,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: FEIXIAO,
            lightCone: I_VENTURE_FORTH_TO_HUNT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1225: { // Fugue
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_BREAK_WEIGHTS,
        [Sets.IronCavalryAgainstTheScourge]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,

        [Sets.ForgeOfTheKalpagniLantern]: 1,
        [Sets.TaliaKingdomOfBanditry]: 1,
        [Sets.SprightlyVonwacq]: 1,
        [Sets.LushakaTheSunkenSeas]: 1,
      },
      presets: [],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.ATK_P,
            Stats.EHR,
          ],
          [Parts.Feet]: [
            Stats.SPD,
            Stats.ATK_P,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Fire_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.BE,
          ],
        },
        substats: [
          Stats.BE,
          Stats.ATK_P,
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        errRopeEidolon: 0,
        breakpoints: {
          [Stats.EHR]: 0.67,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_BASIC,
          END_BREAK,
          START_BASIC,
          END_BREAK,
          START_BASIC,
          END_BREAK,
        ],
        comboDot: 0,
        deprioritizeBuffs: true,
        relicSets: [
          [Sets.ThiefOfShootingMeteor, Sets.ThiefOfShootingMeteor],
          [Sets.EagleOfTwilightLine, Sets.EagleOfTwilightLine],
          RELICS_2P_BREAK_EFFECT_SPEED,
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.ForgeOfTheKalpagniLantern,
          Sets.TaliaKingdomOfBanditry,
          ...SPREAD_ORNAMENTS_2P_ENERGY_REGEN,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: FIREFLY,
            lightCone: WHEREABOUTS_SHOULD_DREAMS_REST,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1301: { // Gallagher
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.50,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [
          Stats.OHB,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_BREAK_WEIGHTS,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.IronCavalryAgainstTheScourge]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.GiantTreeOfRaptBrooding]: 1,
        [Sets.ForgeOfTheKalpagniLantern]: 1,
        [Sets.TaliaKingdomOfBanditry]: 1,
      },
      presets: [
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.BE,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
    },
    1302: { // Argenti
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.Physical_DMG,
          Stats.ATK_P,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        [Sets.ScholarLostInErudition]: 1,
        [Sets.ChampionOfStreetwiseBoxing]: T2_WEIGHT,

        [Sets.InertSalsotto]: 1,
        [Sets.SigoniaTheUnclaimedDesolation]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
      },
      presets: [],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          START_ULT,
          DEFAULT_ULT,
          END_SKILL,
          START_ULT,
          END_SKILL,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.ChampionOfStreetwiseBoxing, Sets.ChampionOfStreetwiseBoxing],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.InertSalsotto,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          Sets.FirmamentFrontlineGlamoth,
        ],
        teammates: [
          {
            characterId: THE_HERTA,
            lightCone: INTO_THE_UNREACHABLE_VEIL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1303: { // Ruan Mei
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [],
        [Parts.Feet]: [],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_BREAK_WEIGHTS,
        [Sets.WatchmakerMasterOfDreamMachinations]: 1,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.BE,
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1304: { // Aventurine
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 1,
        [Stats.DEF_P]: 1,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.DEF_P,
          Stats.CR,
          Stats.CD,
        ],
        [Parts.Feet]: [
          Stats.DEF_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.Imaginary_DMG,
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.DEF_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.ScholarLostInErudition]: MATCH_2P_WEIGHT,
        [Sets.WastelanderOfBanditryDesert]: MATCH_2P_WEIGHT,
        [Sets.KnightOfPurityPalace]: 1,
        [Sets.PioneerDiverOfDeadWaters]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
        [Sets.DuranDynastyOfRunningWolves]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.FUA,
      addedColumns: [SortOption.SHIELD],
      hiddenColumns: [SortOption.SKILL, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.DEF_P,
          ],
          [Parts.Feet]: [
            Stats.DEF_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.DEF_P,
            Stats.Imaginary_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.DEF_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.DEF_P,
          Stats.DEF,
        ],
        breakpoints: {
          [Stats.DEF]: 4000,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_FUA,
          END_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        deprioritizeBuffs: true,
        relicSets: [
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          [Sets.KnightOfPurityPalace, Sets.KnightOfPurityPalace],
          [Sets.TheAshblazingGrandDuke, Sets.KnightOfPurityPalace, Sets.PioneerDiverOfDeadWaters],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          Sets.InertSalsotto,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: TOPAZ_NUMBY,
            lightCone: WORRISOME_BLISSFUL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: FEIXIAO,
            lightCone: I_VENTURE_FORTH_TO_HUNT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1305: { // Dr Ratio
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Imaginary_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.WastelanderOfBanditryDesert]: 1,
        [Sets.TheAshblazingGrandDuke]: 1,

        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
        [Sets.FirmamentFrontlineGlamoth]: 1,
      },
      presets: [
        PresetEffects.fnAshblazingSet(1),
        PresetEffects.fnPioneerSet(4),
        PresetEffects.VALOROUS_SET,
        PresetEffects.WASTELANDER_SET,
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Imaginary_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          END_FUA,
          DEFAULT_FUA,
          START_SKILL,
          END_FUA,
          DEFAULT_FUA,
          START_SKILL,
          END_FUA,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          Sets.IzumoGenseiAndTakamaDivineRealm,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TOPAZ_NUMBY,
            lightCone: WORRISOME_BLISSFUL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1306: { // Sparkle
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ERR,
        ],
      },
      sets: {
        [Sets.SacerdosRelivedOrdeal]: 1,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.CD,
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1307: { // Black Swan
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.Wind_DMG,
          Stats.ATK_P,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        [Sets.PrisonerInDeepConfinement]: 1,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.MusketeerOfWildWheat]: MATCH_2P_WEIGHT,
        [Sets.EagleOfTwilightLine]: MATCH_2P_WEIGHT,

        [Sets.RevelryByTheSea]: 1,
        [Sets.PanCosmicCommercialEnterprise]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.PRISONER_SET,
      ],
      sortOption: SortOption.DOT,
      hiddenColumns: [SortOption.FUA],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.EHR,
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Wind_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.EHR,
          Stats.ATK,
          Stats.CR,
          Stats.CD,
        ],
        breakpoints: {
          [Stats.EHR]: 1.20,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          DEFAULT_DOT,
          WHOLE_BASIC,
          DEFAULT_DOT,
          WHOLE_SKILL,
          DEFAULT_DOT,
          WHOLE_BASIC,
          DEFAULT_DOT,
        ],
        comboDot: 8,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RevelryByTheSea,
          Sets.FirmamentFrontlineGlamoth,
          Sets.PanCosmicCommercialEnterprise,
        ],
        teammates: [
          {
            characterId: KAFKA_B1,
            lightCone: PATIENCE_IS_ALL_YOU_NEED,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HYSILENS,
            lightCone: WHY_DOES_THE_OCEAN_SING,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1308: { // Acheron
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.Lightning_DMG,
          Stats.ATK_P,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.BandOfSizzlingThunder]: T2_WEIGHT,

        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
        [Sets.InertSalsotto]: 1,
        [Sets.SpaceSealingStation]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.ATK_P,
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Lightning_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.IzumoGenseiAndTakamaDivineRealm,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: JIAOQIU,
            lightCone: THOSE_MANY_SPRINGS,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: CIPHER,
            lightCone: LIES_DANCE_ON_THE_BREEZE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1309: { // Robin
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Physical_DMG,
        ],
        [Constants.Parts.LinkRope]: [
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.MusketeerOfWildWheat]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.ATK,
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
    },
    1310: { // Firefly
      stats: {
        [Constants.Stats.ATK]: 0.5,
        [Constants.Stats.ATK_P]: 0.5,
        [Constants.Stats.DEF]: 0,
        [Constants.Stats.DEF_P]: 0,
        [Constants.Stats.HP]: 0,
        [Constants.Stats.HP_P]: 0,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 0,
        [Constants.Stats.CD]: 0,
        [Constants.Stats.EHR]: 0,
        [Constants.Stats.RES]: 0,
        [Constants.Stats.BE]: 1,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.ATK_P,
          Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.ATK_P,
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.ATK_P,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.BE,
        ],
      },
      sets: {
        [Sets.IronCavalryAgainstTheScourge]: 1,
        [Sets.ThiefOfShootingMeteor]: T2_WEIGHT,

        [Sets.ForgeOfTheKalpagniLantern]: 1,
        [Sets.TaliaKingdomOfBanditry]: 1,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.ULT, SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
          ],
          [Parts.LinkRope]: [
            Stats.BE,
          ],
        },
        substats: [
          Stats.BE,
          Stats.ATK_P,
          Stats.ATK,
          Stats.CR,
          Stats.CD,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          END_BREAK,
          WHOLE_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.IronCavalryAgainstTheScourge, Sets.IronCavalryAgainstTheScourge],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.ForgeOfTheKalpagniLantern,
        ],
        teammates: [
          {
            characterId: FUGUE,
            lightCone: LONG_ROAD_LEADS_HOME,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1312: { // Misha
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Ice_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.HunterOfGlacialForest]: T2_WEIGHT,

        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Ice_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.FirmamentFrontlineGlamoth,
          Sets.InertSalsotto,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: SPARKLE,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1313: { // Sunday
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
        ],
        [Parts.Feet]: [],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ERR,
        ],
      },
      sets: {
        [Sets.SacerdosRelivedOrdeal]: 1,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.CD,
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    1314: { // Jade
      stats: {
        [Constants.Stats.ATK]: 0.75,
        [Constants.Stats.ATK_P]: 0.75,
        [Constants.Stats.DEF]: 0,
        [Constants.Stats.DEF_P]: 0,
        [Constants.Stats.HP]: 0,
        [Constants.Stats.HP_P]: 0,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 1,
        [Constants.Stats.CD]: 1,
        [Constants.Stats.EHR]: 0,
        [Constants.Stats.RES]: 0,
        [Constants.Stats.BE]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
          Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.ATK_P,
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.ATK_P,
          Constants.Stats.Quantum_DMG,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PoetOfMourningCollapse]: 1,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.TheAshblazingGrandDuke]: 1,
        [Sets.TheWindSoaringValorous]: 1,
        [Sets.ScholarLostInErudition]: 1,

        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
        PresetEffects.fnAshblazingSet(8),
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.SKILL, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          WHOLE_SKILL,
          DEFAULT_ULT,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.TheAshblazingGrandDuke, Sets.TheAshblazingGrandDuke],
          [Sets.PoetOfMourningCollapse, Sets.PoetOfMourningCollapse],
          [Sets.SacerdosRelivedOrdeal, Sets.SacerdosRelivedOrdeal],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.DuranDynastyOfRunningWolves,
          Sets.IzumoGenseiAndTakamaDivineRealm,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: THE_HERTA,
            lightCone: INTO_THE_UNREACHABLE_VEIL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1315: { // Boothill
      stats: {
        [Stats.ATK]: 0.25,
        [Stats.ATK_P]: 0.25,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0.25,
        [Stats.CD]: 0.25,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_BREAK_WEIGHTS,
        [Sets.IronCavalryAgainstTheScourge]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,
        [Sets.EagleOfTwilightLine]: 1,

        [Sets.TaliaKingdomOfBanditry]: 1,
        [Sets.ForgeOfTheKalpagniLantern]: 1,
      },
      presets: [],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.Physical_DMG,
            Stats.ATK_P,
          ],
          [Parts.LinkRope]: [
            Stats.BE,
          ],
        },
        substats: [
          Stats.BE,
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_SKILL,
          DEFAULT_ULT,
          DEFAULT_BASIC,
          END_BREAK,
          WHOLE_BASIC,
          START_BASIC,
          END_BREAK,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ThiefOfShootingMeteor, Sets.WatchmakerMasterOfDreamMachinations],
          [Sets.IronCavalryAgainstTheScourge, Sets.IronCavalryAgainstTheScourge],
          RELICS_2P_BREAK_EFFECT_SPEED,
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.TaliaKingdomOfBanditry,
        ],
        teammates: [
          {
            characterId: FUGUE,
            lightCone: LONG_ROAD_LEADS_HOME,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1317: { // Rappa
      stats: {
        [Stats.ATK]: 0.5,
        [Stats.ATK_P]: 0.5,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.BE,
        ],
      },
      sets: {
        [Sets.IronCavalryAgainstTheScourge]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,
        [Sets.EagleOfTwilightLine]: 1,

        [Sets.TaliaKingdomOfBanditry]: 1,
        [Sets.ForgeOfTheKalpagniLantern]: 1,
      },
      presets: [
        PresetEffects.WASTELANDER_SET,
      ],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.ULT, SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.Imaginary_DMG,
            Stats.ATK_P,
          ],
          [Parts.LinkRope]: [
            Stats.BE,
          ],
        },
        substats: [
          Stats.BE,
          Stats.ATK_P,
          Stats.ATK,
          Stats.CD,
          Stats.CR,
        ],
        breakpoints: {
          [Stats.ATK]: 3200,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_BASIC,
          WHOLE_BASIC,
          START_BASIC,
          END_BREAK,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.IronCavalryAgainstTheScourge, Sets.IronCavalryAgainstTheScourge],
          [Sets.EagleOfTwilightLine, Sets.EagleOfTwilightLine],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.TaliaKingdomOfBanditry,
        ],
        teammates: [
          {
            characterId: FUGUE,
            lightCone: LONG_ROAD_LEADS_HOME,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    8001: { // Physical Trailblazer M
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0.5,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Physical_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.ChampionOfStreetwiseBoxing]: T2_WEIGHT,
        [Sets.PioneerDiverOfDeadWaters]: T2_WEIGHT,

        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.InertSalsotto]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
            Stats.BE,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: BRONYA,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    8002: { // Physical Trailblazer F
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0.5,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Physical_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.ChampionOfStreetwiseBoxing]: T2_WEIGHT,
        [Sets.PioneerDiverOfDeadWaters]: T2_WEIGHT,

        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.InertSalsotto]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
            Stats.BE,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: BRONYA,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    8003: { // Fire Trailblazer M
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 1,
        [Stats.DEF_P]: 1,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0.75,
        [Stats.RES]: 0.5,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.DEF_P,
        ],
        [Parts.Feet]: [
          Stats.DEF_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.DEF_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.GuardOfWutheringSnow]: MATCH_2P_WEIGHT,
        [Sets.KnightOfPurityPalace]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.SHIELD,
      addedColumns: [SortOption.SHIELD],
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
    },
    8004: { // Fire Trailblazer F
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 1,
        [Stats.DEF_P]: 1,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0.75,
        [Stats.RES]: 0.50,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.DEF_P,
        ],
        [Parts.Feet]: [
          Stats.DEF_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.DEF_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.GuardOfWutheringSnow]: MATCH_2P_WEIGHT,
        [Sets.KnightOfPurityPalace]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.SHIELD,
      addedColumns: [SortOption.SHIELD],
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
    },
    8005: { // Imaginary Trailblazer M
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.BE,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_BREAK_WEIGHTS,
        [Sets.WatchmakerMasterOfDreamMachinations]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.TaliaKingdomOfBanditry]: 1,
        [Sets.ForgeOfTheKalpagniLantern]: 1,
      },
      presets: [],
      sortOption: SortOption.BE,
      hiddenColumns: [SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    8006: { // Imaginary Trailblazer F
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 1,
      },
      parts: {
        [Parts.Body]: [],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.BE,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_BREAK_WEIGHTS,
        [Sets.WatchmakerMasterOfDreamMachinations]: 1,
        [Sets.ThiefOfShootingMeteor]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.TaliaKingdomOfBanditry]: 1,
        [Sets.ForgeOfTheKalpagniLantern]: 1,
      },
      presets: [],
      sortOption: SortOption.BE,
      hiddenColumns: [SortOption.ULT, SortOption.FUA, SortOption.DOT],
    },
    8007: { // Remembrance Trailblazer M
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.OHB,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.SacerdosRelivedOrdeal]: 1,
        [Sets.HeroOfTriumphantSong]: 1,
        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.BANANA_SET,
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.CD,
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
      addedColumns: [SortOption.MEMO_SKILL],
    },
    8008: { // Remembrance Trailblazer F
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.OHB,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.SacerdosRelivedOrdeal]: 1,
        [Sets.HeroOfTriumphantSong]: 1,
        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.BANANA_SET,
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.CD,
      hiddenColumns: [SortOption.SKILL, SortOption.FUA, SortOption.DOT],
      addedColumns: [SortOption.MEMO_SKILL],
    },
    1401: { // The Herta
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Ice_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.HunterOfGlacialForest]: T2_WEIGHT,

        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SigoniaTheUnclaimedDesolation]: 1,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Ice_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_SKILL,
          END_ULT,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.IzumoGenseiAndTakamaDivineRealm,
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: JADE,
            lightCone: YET_HOPE_IS_PRICELESS,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LINGSHA,
            lightCone: SCENT_ALONE_STAYS_TRUE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1402: { // Aglaea
      stats: {
        [Stats.ATK]: 0.5,
        [Stats.ATK_P]: 0.5,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Lightning_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.BandOfSizzlingThunder]: MATCH_2P_WEIGHT,
        [Sets.HeroOfTriumphantSong]: 1,
        [Sets.ScholarLostInErudition]: 1,

        [Sets.TheWondrousBananAmusementPark]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
      },
      presets: [
        PresetEffects.BANANA_SET,
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.SKILL, SortOption.ULT, SortOption.FUA, SortOption.DOT],
      addedColumns: [SortOption.MEMO_SKILL, SortOption.MEMO_TALENT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Lightning_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_BASIC,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
          WHOLE_BASIC,
          WHOLE_BASIC,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
          WHOLE_BASIC,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.HeroOfTriumphantSong, Sets.HeroOfTriumphantSong],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.TheWondrousBananAmusementPark,
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: SUNDAY,
            lightCone: A_GROUNDED_ASCENT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1403: { // Tribbie
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.HP_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.Quantum_DMG,
          Stats.HP_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.GeniusOfBrilliantStars]: MATCH_2P_WEIGHT,
        [Sets.PoetOfMourningCollapse]: 1,
        [Sets.LongevousDisciple]: 1,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.EagleOfTwilightLine]: 1,

        ...SPREAD_ORNAMENTS_2P_FUA_WEIGHTS,
        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.BoneCollectionsSereneDemesne]: 1,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.HP_P,
          ],
          [Parts.Feet]: [
            Stats.HP_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.HP_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.HP_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
          Stats.HP,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_SKILL,
          END_ULT,
          DEFAULT_FUA,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
          DEFAULT_ULT,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        deprioritizeBuffs: true,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.LongevousDisciple, Sets.LongevousDisciple],
          [Sets.PoetOfMourningCollapse, Sets.PoetOfMourningCollapse],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.BoneCollectionsSereneDemesne,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: CASTORICE,
            lightCone: MAKE_FAREWELLS_MORE_BEAUTIFUL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: STELLE_REMEMBRANCE,
            lightCone: MEMORYS_CURTAIN_NEVER_FALLS,
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: HYACINE,
            lightCone: LONG_MAY_RAINBOWS_ADORN_THE_SKY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1404: { // Mydei
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.HP_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.Imaginary_DMG,
          Stats.HP_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
        ],
      },
      sets: {
        [Sets.ScholarLostInErudition]: 1,
        [Sets.LongevousDisciple]: T2_WEIGHT,
        [Sets.WastelanderOfBanditryDesert]: MATCH_2P_WEIGHT,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,

        [Sets.BoneCollectionsSereneDemesne]: 1,
        [Sets.RutilantArena]: 1,
      },
      presets: [
        PresetEffects.WASTELANDER_SET,
      ],
      sortOption: SortOption.SKILL,
      hiddenColumns: [],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CD,
            Stats.HP_P,
          ],
          [Parts.Feet]: [
            Stats.HP_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.HP_P,
            Stats.Imaginary_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.HP_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
          Stats.HP,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.BoneCollectionsSereneDemesne,
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: SUNDAY,
            lightCone: A_GROUNDED_ASCENT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HYACINE,
            lightCone: LONG_MAY_RAINBOWS_ADORN_THE_SKY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1405: { // Anaxa
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Wind_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.EagleOfTwilightLine]: 1,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.ScholarLostInErudition]: 1,

        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
        [Sets.RutilantArena]: 1,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
        PresetEffects.GENIUS_SET,
      ],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Wind_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          END_SKILL,
          START_SKILL,
          END_SKILL,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        deprioritizeBuffs: false,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          Sets.FirmamentFrontlineGlamoth,
          Sets.IzumoGenseiAndTakamaDivineRealm,
          Sets.SpaceSealingStation,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: BRONYA,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: CERYDRA,
            lightCone: EPOCH_ETCHED_IN_GOLDEN_BLOOD,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1407: { // Castorice
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 0,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.HP_P,
        ],
        [Parts.Feet]: [
          Stats.HP_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
          Stats.Quantum_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
        ],
      },
      sets: {
        [Sets.PoetOfMourningCollapse]: 1,
        [Sets.ScholarLostInErudition]: T2_WEIGHT,
        [Sets.LongevousDisciple]: MATCH_2P_WEIGHT,
        [Sets.GeniusOfBrilliantStars]: MATCH_2P_WEIGHT,

        [Sets.BoneCollectionsSereneDemesne]: 1,
        [Sets.TheWondrousBananAmusementPark]: T2_WEIGHT,
        [Sets.FleetOfTheAgeless]: T2_WEIGHT,
        [Sets.RutilantArena]: T2_WEIGHT,
        [Sets.InertSalsotto]: T2_WEIGHT,
      },
      presets: [
        PresetEffects.BANANA_SET,
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.MEMO_SKILL,
      addedColumns: [SortOption.MEMO_SKILL, SortOption.MEMO_TALENT],
      hiddenColumns: [SortOption.FUA, SortOption.DOT, SortOption.ULT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.HP_P,
          ],
          [Parts.Feet]: [
            Stats.HP_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.HP_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.HP_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
          Stats.HP,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          WHOLE_SKILL,
          WHOLE_SKILL,
          DEFAULT_ULT,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_TALENT,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.PoetOfMourningCollapse, Sets.PoetOfMourningCollapse],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.BoneCollectionsSereneDemesne,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: STELLE_REMEMBRANCE,
            lightCone: MEMORYS_CURTAIN_NEVER_FALLS,
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: HYACINE,
            lightCone: LONG_MAY_RAINBOWS_ADORN_THE_SKY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1409: { // Hyacine
      stats: {
        [Constants.Stats.ATK]: 0,
        [Constants.Stats.ATK_P]: 0,
        [Constants.Stats.DEF]: 0,
        [Constants.Stats.DEF_P]: 0,
        [Constants.Stats.HP]: 1,
        [Constants.Stats.HP_P]: 1,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 0,
        [Constants.Stats.CD]: 0.50,
        [Constants.Stats.EHR]: 0,
        [Constants.Stats.RES]: 0.50,
        [Constants.Stats.BE]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.OHB,
          Constants.Stats.HP_P,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.HP_P,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.ERR,
          Constants.Stats.HP_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        [Sets.WarriorGoddessOfSunAndThunder]: 1,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.PasserbyOfWanderingCloud]: T2_WEIGHT,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        [Sets.TheWondrousBananAmusementPark]: 1,
        [Sets.GiantTreeOfRaptBrooding]: 1,
      },
      presets: [
        PresetEffects.BANANA_SET,
        PresetEffects.WARRIOR_SET,
      ],
      sortOption: SortOption.HEAL,
      addedColumns: [SortOption.OHB, SortOption.HEAL],
      hiddenColumns: [SortOption.DOT],
    },
    1406: { // Cipher
      stats: {
        [Constants.Stats.ATK]: 0.75,
        [Constants.Stats.ATK_P]: 0.75,
        [Constants.Stats.DEF]: 0,
        [Constants.Stats.DEF_P]: 0,
        [Constants.Stats.HP]: 0,
        [Constants.Stats.HP_P]: 0,
        [Constants.Stats.SPD]: 1,
        [Constants.Stats.CR]: 1,
        [Constants.Stats.CD]: 1,
        [Constants.Stats.EHR]: 0.50,
        [Constants.Stats.RES]: 0,
        [Constants.Stats.BE]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
          Constants.Stats.EHR,
        ],
        [Constants.Parts.Feet]: [
          Constants.Stats.ATK_P,
          Constants.Stats.SPD,
        ],
        [Constants.Parts.PlanarSphere]: [
          Constants.Stats.ATK_P,
          Constants.Stats.Quantum_DMG,
        ],
        [Constants.Parts.LinkRope]: [
          Constants.Stats.ATK_P,
          Constants.Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: 1,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.MessengerTraversingHackerspace]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.fnAshblazingSet(4),
        PresetEffects.fnPioneerSet(4),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.FUA,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.CR,
          Stats.CD,
          Stats.ATK,
          Stats.EHR,
        ],
        breakpoints: {
          [Stats.EHR]: 0.19,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          DEFAULT_ULT,
          WHOLE_SKILL,
          DEFAULT_FUA,
          WHOLE_SKILL,
          DEFAULT_FUA,
          WHOLE_BASIC,
          DEFAULT_FUA,
        ],
        deprioritizeBuffs: true,
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.InertSalsotto,
          Sets.DuranDynastyOfRunningWolves,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_FUA,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
        ],
        teammates: [
          {
            characterId: FEIXIAO,
            lightCone: I_VENTURE_FORTH_TO_HUNT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: ROBIN,
            lightCone: FLOWING_NIGHTGLOW,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1408: { // Phainon
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Physical_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.WavestriderCaptain]: 1,
        [Sets.ScholarLostInErudition]: T2_WEIGHT,

        [Sets.ArcadiaOfWovenDreams]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.BoneCollectionsSereneDemesne]: 1,
        [Sets.FirmamentFrontlineGlamoth]: T2_WEIGHT,
        [Sets.SpaceSealingStation]: T2_WEIGHT,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          DEFAULT_BASIC,
          DEFAULT_SKILL,
          DEFAULT_BASIC,
          DEFAULT_BASIC,
          DEFAULT_SKILL,
          DEFAULT_BASIC,
          END_ULT,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.WavestriderCaptain, Sets.WavestriderCaptain],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: SUNDAY,
            lightCone: A_GROUNDED_ASCENT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: CERYDRA,
            lightCone: EPOCH_ETCHED_IN_GOLDEN_BLOOD,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: BRONYA,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1014: { // Saber
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Wind_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.WavestriderCaptain]: 1,
        [Sets.ScholarLostInErudition]: 1,

        [Sets.InertSalsotto]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.SpaceSealingStation]: T2_WEIGHT,
      },
      presets: [],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Wind_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_BASIC,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.WavestriderCaptain, Sets.WavestriderCaptain],
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.InertSalsotto,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: SUNDAY,
            lightCone: A_GROUNDED_ASCENT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: TINGYUN,
            lightCone: DANCE_DANCE_DANCE,
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1015: { // Archer
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 0,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.ATK_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Quantum_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.ScholarLostInErudition]: 1,

        [Sets.RutilantArena]: 1,
        [Sets.InertSalsotto]: 1,
        [Sets.SpaceSealingStation]: T2_WEIGHT,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.ATK_P,
          Stats.ATK,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_SKILL,
          DEFAULT_SKILL,
          END_SKILL,
          DEFAULT_FUA,
          START_SKILL,
          DEFAULT_SKILL,
          END_SKILL,
          DEFAULT_FUA,
        ],
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.WavestriderCaptain, Sets.WavestriderCaptain],
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: SPARKLE,
            lightCone: EARTHLY_ESCAPADE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: CIPHER,
            lightCone: LIES_DANCE_ON_THE_BREEZE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: LUOCHA,
            lightCone: MULTIPLICATION,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    '1005b1': { // KafkaB1
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Lightning_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.PrisonerInDeepConfinement]: 1,
        [Sets.BandOfSizzlingThunder]: T2_WEIGHT,

        [Sets.RevelryByTheSea]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.PRISONER_SET,
        PresetEffects.fnAshblazingSet(6),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.DOT,
      hiddenColumns: [],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.ATK_P,
            Stats.EHR,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Lightning_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.ATK,
          Stats.EHR,
          Stats.CR,
          Stats.CD,
        ],
        breakpoints: {
          [Stats.EHR]: 0.75,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_DOT,
          DEFAULT_SKILL,
          END_DOT,
          DEFAULT_FUA,
          START_SKILL,
          END_DOT,
          DEFAULT_FUA,
          START_SKILL,
          END_DOT,
          DEFAULT_FUA,
        ],
        comboDot: 16,
        errRopeEidolon: 0,
        deprioritizeBuffs: true,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          RELICS_2P_SPEED,
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RevelryByTheSea,
          Sets.FirmamentFrontlineGlamoth,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
          ...SPREAD_ORNAMENTS_2P_ENERGY_REGEN,
        ],
        teammates: [
          {
            characterId: BLACK_SWAN,
            lightCone: REFORGED_REMEMBRANCE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    '1006b1': { // Silver Wolf
      stats: {
        [Stats.ATK]: 0.75,
        [Stats.ATK_P]: 0.75,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 1,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.Quantum_DMG,
          Stats.ATK_P,
          Stats.HP_P,
          Stats.DEF_P,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.ATK_P,
          Stats.BE,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.PioneerDiverOfDeadWaters]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
        ...SPREAD_ORNAMENTS_2P_ENERGY_REGEN_WEIGHTS,
        [Sets.InertSalsotto]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.IzumoGenseiAndTakamaDivineRealm]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.PanCosmicCommercialEnterprise]: T2_WEIGHT,
      },
      presets: [
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.ATK_P,
            Stats.EHR,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Quantum_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.CR,
          Stats.CD,
          Stats.ATK,
          Stats.EHR,
        ],
        breakpoints: {
          [Stats.EHR]: 0.50,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          WHOLE_BASIC,
        ],
        deprioritizeBuffs: true,
        comboDot: 0,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.PioneerDiverOfDeadWaters, Sets.PioneerDiverOfDeadWaters],
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          RELICS_2P_SPEED,
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.InertSalsotto,
          Sets.FirmamentFrontlineGlamoth,
          Sets.IzumoGenseiAndTakamaDivineRealm,
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
          ...SPREAD_ORNAMENTS_2P_SUPPORT,
          ...SPREAD_ORNAMENTS_2P_ENERGY_REGEN,
        ],
        teammates: [
          {
            characterId: ACHERON,
            lightCone: ALONG_THE_PASSING_SHORE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: CIPHER,
            lightCone: LIES_DANCE_ON_THE_BREEZE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: AVENTURINE,
            lightCone: INHERENTLY_UNJUST_DESTINY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    '1205b1': { // BladeB1
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.HP_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.Wind_DMG,
          Stats.HP_P,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
        ],
      },
      sets: {
        [Sets.ScholarLostInErudition]: MATCH_2P_WEIGHT,
        [Sets.LongevousDisciple]: 1,
        [Sets.EagleOfTwilightLine]: 1,
        [Sets.MusketeerOfWildWheat]: T2_WEIGHT,

        [Sets.BoneCollectionsSereneDemesne]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.InertSalsotto]: 1,
      },
      presets: [
        PresetEffects.VALOROUS_SET,
        PresetEffects.fnSacerdosSet(1),
      ],
      sortOption: SortOption.BASIC,
      hiddenColumns: [SortOption.SKILL, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.HP_P,
          ],
          [Parts.Feet]: [
            Stats.HP_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.HP_P,
            Stats.Wind_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.HP_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
          Stats.HP,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_SKILL,
          DEFAULT_ULT,
          END_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
          WHOLE_BASIC,
          DEFAULT_FUA,
          WHOLE_BASIC,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.LongevousDisciple, Sets.LongevousDisciple],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.BoneCollectionsSereneDemesne,
          Sets.InertSalsotto,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: SUNDAY,
            lightCone: A_GROUNDED_ASCENT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HYACINE,
            lightCone: LONG_MAY_RAINBOWS_ADORN_THE_SKY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    '1212b1': { // JingliuB1
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.HP_P,
        ],
        [Parts.Feet]: [
          Stats.HP_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
          Stats.Ice_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_CRIT_WEIGHTS,
        [Sets.PioneerDiverOfDeadWaters]: MATCH_2P_WEIGHT,
        [Sets.ScholarLostInErudition]: 1,
        [Sets.GeniusOfBrilliantStars]: 1,
        [Sets.HunterOfGlacialForest]: T2_WEIGHT,

        [Sets.BoneCollectionsSereneDemesne]: 1,
        [Sets.RutilantArena]: 1,
        [Sets.InertSalsotto]: T2_WEIGHT,
      },
      presets: [],
      sortOption: SortOption.SKILL,
      hiddenColumns: [SortOption.FUA, SortOption.DOT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CD,
            Stats.HP_P,
          ],
          [Parts.Feet]: [
            Stats.HP_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.HP_P,
            Stats.Ice_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.HP_P,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
          Stats.HP,
        ],
        errRopeEidolon: 0,
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          DEFAULT_ULT,
          WHOLE_SKILL,
          WHOLE_SKILL,
          START_SKILL,
          END_ULT,
          WHOLE_SKILL,
          WHOLE_SKILL,
        ],
        comboDot: 0,
        relicSets: [
          [Sets.ScholarLostInErudition, Sets.ScholarLostInErudition],
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.BoneCollectionsSereneDemesne,
          Sets.RutilantArena,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: BRONYA,
            lightCone: BUT_THE_BATTLE_ISNT_OVER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: RUAN_MEI,
            lightCone: PAST_SELF_IN_MIRROR,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1410: { // Hysilens
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 0,
        [Stats.HP_P]: 0,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 1,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.Physical_DMG,
          Stats.ATK_P,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.PrisonerInDeepConfinement]: 1,
        [Sets.ChampionOfStreetwiseBoxing]: T2_WEIGHT, // TODO is this real?

        [Sets.RevelryByTheSea]: 1,
        [Sets.FirmamentFrontlineGlamoth]: 1,
        [Sets.SpaceSealingStation]: 1,
      },
      presets: [
        PresetEffects.PRISONER_SET,
        PresetEffects.fnPioneerSet(4),
      ],
      sortOption: SortOption.DOT,
      hiddenColumns: [SortOption.FUA],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.EHR,
            Stats.ATK_P,
          ],
          [Parts.Feet]: [
            Stats.ATK_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.ATK_P,
            Stats.Physical_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.ATK_P,
          ],
        },
        substats: [
          Stats.ATK_P,
          Stats.EHR,
          Stats.ATK,
          Stats.CR,
          Stats.CD,
        ],
        breakpoints: {
          [Stats.EHR]: 1.20,
        },
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          DEFAULT_DOT,
          END_SKILL,
          DEFAULT_DOT,
          WHOLE_SKILL,
          DEFAULT_DOT,
          WHOLE_BASIC,
          DEFAULT_DOT,
        ],
        comboDot: 5,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.RevelryByTheSea,
          Sets.PanCosmicCommercialEnterprise,
        ],
        teammates: [
          {
            characterId: KAFKA_B1,
            lightCone: PATIENCE_IS_ALL_YOU_NEED,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: BLACK_SWAN,
            lightCone: REFORGED_REMEMBRANCE,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HUOHUO,
            lightCone: NIGHT_OF_FRIGHT,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1412: { // Cerydra
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0.75,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CD,
          Stats.ATK_P,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
          Stats.Wind_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.ATK_P,
          Stats.ERR,
        ],
      },
      sets: {
        ...weights([...RELICS_2P_SPEED, ...RELICS_2P_ATK], 1),
        [Sets.SacerdosRelivedOrdeal]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [],
      sortOption: SortOption.ULT,
      hiddenColumns: [SortOption.DOT],
    },
    1413: { // Evernight
      stats: {
        [Stats.ATK]: 0,
        [Stats.ATK_P]: 0,
        [Stats.DEF]: 0,
        [Stats.DEF_P]: 0,
        [Stats.HP]: 1,
        [Stats.HP_P]: 1,
        [Stats.SPD]: 1,
        [Stats.CR]: 1,
        [Stats.CD]: 1,
        [Stats.EHR]: 0,
        [Stats.RES]: 0,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.CR,
          Stats.CD,
          Stats.HP_P,
        ],
        [Parts.Feet]: [
          Stats.HP_P,
          Stats.SPD,
        ],
        [Parts.PlanarSphere]: [
          Stats.HP_P,
          Stats.Ice_DMG,
        ],
        [Parts.LinkRope]: [
          Stats.HP_P,
        ],
      },
      sets: {
        [Sets.WorldRemakingDeliverer]: 1,
        [Sets.PoetOfMourningCollapse]: 1,
        [Sets.ScholarLostInErudition]: T2_WEIGHT,
        [Sets.LongevousDisciple]: MATCH_2P_WEIGHT,
        [Sets.GeniusOfBrilliantStars]: MATCH_2P_WEIGHT,

        [Sets.BoneCollectionsSereneDemesne]: 1,
        [Sets.ArcadiaOfWovenDreams]: 1,
        [Sets.TheWondrousBananAmusementPark]: T2_WEIGHT,
        [Sets.RutilantArena]: T2_WEIGHT,
        [Sets.InertSalsotto]: T2_WEIGHT,
      },
      presets: [
        PresetEffects.BANANA_SET,
      ],
      sortOption: SortOption.MEMO_SKILL,
      addedColumns: [SortOption.MEMO_SKILL, SortOption.MEMO_TALENT],
      hiddenColumns: [SortOption.FUA, SortOption.DOT, SortOption.SKILL, SortOption.MEMO_TALENT],
      simulation: {
        parts: {
          [Parts.Body]: [
            Stats.CR,
            Stats.CD,
            Stats.HP_P,
          ],
          [Parts.Feet]: [
            Stats.HP_P,
            Stats.SPD,
          ],
          [Parts.PlanarSphere]: [
            Stats.HP_P,
            Stats.Ice_DMG,
          ],
          [Parts.LinkRope]: [
            Stats.HP_P,
            Stats.ERR,
          ],
        },
        substats: [
          Stats.CD,
          Stats.CR,
          Stats.HP_P,
          Stats.HP,
        ],
        comboTurnAbilities: [
          NULL_TURN_ABILITY_NAME,
          START_ULT,
          END_SKILL,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
          WHOLE_SKILL,
          DEFAULT_MEMO_SKILL,
          DEFAULT_MEMO_SKILL,
        ],
        comboDot: 0,
        deprioritizeBuffs: true,
        errRopeEidolon: 0,
        relicSets: [
          [Sets.WorldRemakingDeliverer, Sets.WorldRemakingDeliverer],
          [Sets.PoetOfMourningCollapse, Sets.PoetOfMourningCollapse],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.BoneCollectionsSereneDemesne,
          Sets.ArcadiaOfWovenDreams,
          ...SPREAD_ORNAMENTS_2P_GENERAL_CONDITIONALS,
        ],
        teammates: [
          {
            characterId: TRIBBIE,
            lightCone: IF_TIME_WERE_A_FLOWER,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: CASTORICE,
            lightCone: MAKE_FAREWELLS_MORE_BEAUTIFUL,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: HYACINE,
            lightCone: LONG_MAY_RAINBOWS_ADORN_THE_SKY,
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
    1414: { // Dan Heng • Permansor Terrae
      stats: {
        [Stats.ATK]: 1,
        [Stats.ATK_P]: 1,
        [Stats.DEF]: 0.25,
        [Stats.DEF_P]: 0.25,
        [Stats.HP]: 0.25,
        [Stats.HP_P]: 0.25,
        [Stats.SPD]: 1,
        [Stats.CR]: 0,
        [Stats.CD]: 0,
        [Stats.EHR]: 0,
        [Stats.RES]: 0.25,
        [Stats.BE]: 0,
      },
      parts: {
        [Parts.Body]: [
          Stats.ATK_P,
          Stats.EHR,
        ],
        [Parts.Feet]: [
          Stats.SPD,
          Stats.ATK_P,
        ],
        [Parts.PlanarSphere]: [
          Stats.ATK_P,
        ],
        [Parts.LinkRope]: [
          Stats.ERR,
          Stats.ATK_P,
        ],
      },
      sets: {
        [Sets.SelfEnshroudedRecluse]: 1,
        ...SPREAD_RELICS_2P_SPEED_WEIGHTS,
        ...SPREAD_RELICS_2P_ATK_WEIGHTS,
        [Sets.SacerdosRelivedOrdeal]: 1,
        [Sets.MessengerTraversingHackerspace]: 1,
        [Sets.MusketeerOfWildWheat]: 1,

        ...SPREAD_ORNAMENTS_2P_SUPPORT_WEIGHTS,
      },
      presets: [
        PresetEffects.BANANA_SET,
        PresetEffects.fnAshblazingSet(8),
        PresetEffects.VALOROUS_SET,
      ],
      sortOption: SortOption.ATK,
      addedColumns: [SortOption.SHIELD],
      hiddenColumns: [SortOption.DOT, SortOption.SKILL],
    },
  }
}

