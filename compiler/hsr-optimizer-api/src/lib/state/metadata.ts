import { Parts, PartsMainStats, Sets, SetsRelics, Stats, Constants } from 'lib/constants/constants'
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
      presets: [
        PresetEffects.VALOROUS_SET,
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1101', // Bronya
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, FUA, SKILL, FUA, SKILL, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1112', // Topaz
            lightCone: '23016', // Worrisome
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '23023', // Unjust destiny
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1308', // Acheron
            lightCone: '23024', // Shore
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1106', // Pela
            lightCone: '21015', // Pearls
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, SKILL, FUA, SKILL, FUA],
        comboDot: 16,
        comboBreak: 0,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.FirmamentFrontlineGlamoth,
        ],
        teammates: [
          {
            characterId: '1307', // Swan
            lightCone: '23022', // Reforged
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1101', // Bronya
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, FUA, SKILL, FUA, SKILL, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1003', // Himeko
            lightCone: '23000', // Milky way
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1006', // SW
            lightCone: '23007', // Rain
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1306', // Sparkle
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
            characterEidolon: 0,
            lightConeSuperimposition: 1,
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
        ],
        teammates: [
          {
            characterId: '1005', // Kafka
            lightCone: '23006', // Patience
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
      presets: [],
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
        comboAbilities: [NULL, ULT, SKILL, FUA, FUA, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1112', // Topaz
            lightCone: '23016', // Worrisome
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '21016', // Trend
            characterEidolon: 0,
            lightConeSuperimposition: 5,
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 60,
        comboBreak: 0,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.FirmamentFrontlineGlamoth,
        ],
        teammates: [
          {
            characterId: '1005', // Kafka
            lightCone: '23006', // Patience
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1101', // Bronya
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
      presets: [],
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
        comboAbilities: [NULL, ULT, SKILL, BASIC, BASIC],
        comboDot: 5,
        comboBreak: 1,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
          RELICS_2P_BREAK_EFFECT_SPEED,
        ],
        ornamentSets: [
          Sets.TaliaKingdomOfBanditry,
          Sets.FirmamentFrontlineGlamoth,
        ],
        teammates: [
          {
            characterId: '1005', // Kafka
            lightCone: '23006', // Patience
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, SKILL, FUA, FUA],
        comboDot: 0,
        comboBreak: 0,
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
        ],
        teammates: [
          {
            characterId: '1305', // Ratio
            lightCone: '23020', // Baptism
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '23023', // Unjust destiny
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
        comboAbilities: [NULL, ULT, BASIC, FUA, BASIC, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1006', // SW
            lightCone: '23007', // Rain
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1306', // Sparkle
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
      presets: [
        PresetEffects.WASTELANDER_SET,
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1306', // Sparkle
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, BASIC, FUA, BASIC],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1212', // Jingliu
            lightCone: '23014', // I shall
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1101', // Bronya
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1203', // Luocha
            lightCone: '20015', // Multi
            characterEidolon: 0,
            lightConeSuperimposition: 5,
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 1,
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
            characterId: '8006', // Stelle
            lightCone: '21004', // Memories
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1301', // Gallagher
            lightCone: '20015', // Multi
            characterEidolon: 6,
            lightConeSuperimposition: 5,
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
      presets: [],
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
        comboAbilities: [NULL, ULT, SKILL, FUA, SKILL, FUA, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1106', // Pela
            lightCone: '21015', // Pearls
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
      presets: [
        PresetEffects.PRISONER_SET,
      ],
      sortOption: SortOption.DOT,
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
      presets: [],
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1101', // Bronya
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, BASIC, BASIC],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1306', // Sparkle
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1202', // Tingyun
            lightCone: '21018', // Dance
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
            characterEidolon: 0,
            lightConeSuperimposition: 1,
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
        comboAbilities: [NULL, ULT, FUA, SKILL, FUA, SKILL, FUA],
        comboDot: 0,
        comboBreak: 1,
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
            characterId: '8006', // Stelle
            lightCone: '21004', // Memories
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1301', // Gallagher
            lightCone: '20015', // Multi
            characterEidolon: 6,
            lightConeSuperimposition: 5,
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
      presets: [],
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
        [Constants.Stats.ERR]: 0,
        [Constants.Stats.OHB]: 0,
        [Constants.Stats.Physical_DMG]: 0,
        [Constants.Stats.Fire_DMG]: 1,
        [Constants.Stats.Ice_DMG]: 0,
        [Constants.Stats.Lightning_DMG]: 0,
        [Constants.Stats.Wind_DMG]: 0,
        [Constants.Stats.Quantum_DMG]: 0,
        [Constants.Stats.Imaginary_DMG]: 0,
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
        [Constants.Stats.ERR]: 0,
        [Constants.Stats.OHB]: 0,
        [Constants.Stats.Physical_DMG]: 0,
        [Constants.Stats.Fire_DMG]: 0,
        [Constants.Stats.Ice_DMG]: 0,
        [Constants.Stats.Lightning_DMG]: 0,
        [Constants.Stats.Wind_DMG]: 1,
        [Constants.Stats.Quantum_DMG]: 0,
        [Constants.Stats.Imaginary_DMG]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
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
        comboAbilities: [NULL, ULT, SKILL, FUA, FUA, ULT, SKILL, FUA, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1112', // Topaz
            lightCone: '23016', // Worrisome
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '23023', // Unjust destiny
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
        [Constants.Stats.ERR]: 0,
        [Constants.Stats.OHB]: 0,
        [Constants.Stats.Physical_DMG]: 1,
        [Constants.Stats.Fire_DMG]: 0,
        [Constants.Stats.Ice_DMG]: 0,
        [Constants.Stats.Lightning_DMG]: 0,
        [Constants.Stats.Wind_DMG]: 0,
        [Constants.Stats.Quantum_DMG]: 0,
        [Constants.Stats.Imaginary_DMG]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
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
        comboAbilities: [NULL, ULT, SKILL, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1202', // Tingyun
            lightCone: '21018', // Dance
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        [Constants.Stats.ERR]: 1,
        [Constants.Stats.OHB]: 0,
        [Constants.Stats.Physical_DMG]: 0,
        [Constants.Stats.Fire_DMG]: 1,
        [Constants.Stats.Ice_DMG]: 0,
        [Constants.Stats.Lightning_DMG]: 0,
        [Constants.Stats.Wind_DMG]: 0,
        [Constants.Stats.Quantum_DMG]: 0,
        [Constants.Stats.Imaginary_DMG]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.ATK_P,
          Constants.Stats.OHB,
          Constants.Stats.DEF_P,
          Constants.Stats.HP_P,
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
      presets: [
        PresetEffects.BANANA_SET,
        PresetEffects.fnAshblazingSet(6),
        PresetEffects.VALOROUS_SET,
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
        [Constants.Stats.ERR]: 0,
        [Constants.Stats.OHB]: 0,
        [Constants.Stats.Physical_DMG]: 0,
        [Constants.Stats.Fire_DMG]: 0,
        [Constants.Stats.Ice_DMG]: 0,
        [Constants.Stats.Lightning_DMG]: 1,
        [Constants.Stats.Wind_DMG]: 0,
        [Constants.Stats.Quantum_DMG]: 0,
        [Constants.Stats.Imaginary_DMG]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
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
        comboAbilities: [NULL, SKILL, ULT, FUA, FUA],
        comboDot: 0,
        comboBreak: 0,
        deprioritizeBuffs: true,
        errRopeEidolon: 0,
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
        ],
        teammates: [
          {
            characterId: '1112', // Topaz
            lightCone: '23016', // Worrisome
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '23023', // Unjust destiny
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
        [Constants.Stats.ERR]: 0,
        [Constants.Stats.OHB]: 0,
        [Constants.Stats.Physical_DMG]: 0,
        [Constants.Stats.Fire_DMG]: 0,
        [Constants.Stats.Ice_DMG]: 0,
        [Constants.Stats.Lightning_DMG]: 0,
        [Constants.Stats.Wind_DMG]: 0,
        [Constants.Stats.Quantum_DMG]: 0,
        [Constants.Stats.Imaginary_DMG]: 1,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
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
        comboAbilities: [NULL, ULT, BASIC, FUA],
        comboDot: 0,
        comboBreak: 0,
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
        ],
        teammates: [
          {
            characterId: '1112', // Topaz
            lightCone: '23016', // Worrisome
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '23023', // Unjust destiny
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
        comboAbilities: [NULL, ULT, BASIC, BASIC, BASIC],
        comboDot: 0,
        comboBreak: 3,
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
        ],
        teammates: [
          {
            characterId: '1310', // Firefly
            lightCone: '23025', // Whereabouts
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1222', // Lingsha
            lightCone: '23032', // Scent
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
      presets: [],
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1202', // Tingyun
            lightCone: '21018', // Dance
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, BASIC, FUA, BASIC, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1112', // Topaz
            lightCone: '23016', // Worrisome
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1305', // Ratio
            lightCone: '23020', // Baptism
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
        comboAbilities: [NULL, ULT, SKILL, FUA, FUA, SKILL, FUA, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1112', // Topaz
            lightCone: '23016', // Worrisome
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '23023', // Unjust destiny
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
        comboAbilities: [NULL, SKILL, ULT, BASIC, BASIC],
        comboDot: 16,
        comboBreak: 0,
        relicSets: [
          [Sets.PrisonerInDeepConfinement, Sets.PrisonerInDeepConfinement],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.FirmamentFrontlineGlamoth,
          Sets.PanCosmicCommercialEnterprise,
        ],
        teammates: [
          {
            characterId: '1005', // Kafka
            lightCone: '23006', // Patience
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1106', // Pela
            lightCone: '21015', // Pearls
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1006', // SW
            lightCone: '23007', // Rain
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '21016', // Trend
            characterEidolon: 0,
            lightConeSuperimposition: 5,
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
        [Constants.Stats.ERR]: 0,
        [Constants.Stats.OHB]: 0,
        [Constants.Stats.Physical_DMG]: 0,
        [Constants.Stats.Fire_DMG]: 0,
        [Constants.Stats.Ice_DMG]: 0,
        [Constants.Stats.Lightning_DMG]: 0,
        [Constants.Stats.Wind_DMG]: 0,
        [Constants.Stats.Quantum_DMG]: 0,
        [Constants.Stats.Imaginary_DMG]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.ATK_P,
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 1,
        relicSets: [
          [Sets.IronCavalryAgainstTheScourge, Sets.IronCavalryAgainstTheScourge],
          ...SPREAD_RELICS_4P_GENERAL_CONDITIONALS,
        ],
        ornamentSets: [
          Sets.ForgeOfTheKalpagniLantern,
        ],
        teammates: [
          {
            characterId: '8006', // Stelle
            lightCone: '21004', // Memories
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1301', // Gallagher
            lightCone: '20015', // Multi
            characterEidolon: 6,
            lightConeSuperimposition: 5,
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1106', // Pela
            lightCone: '21015', // Pearls
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        [Constants.Stats.ERR]: 0,
        [Constants.Stats.OHB]: 0,
        [Constants.Stats.Physical_DMG]: 0,
        [Constants.Stats.Fire_DMG]: 0,
        [Constants.Stats.Ice_DMG]: 0,
        [Constants.Stats.Lightning_DMG]: 0,
        [Constants.Stats.Wind_DMG]: 0,
        [Constants.Stats.Quantum_DMG]: 1,
        [Constants.Stats.Imaginary_DMG]: 0,
      },
      parts: {
        [Constants.Parts.Body]: [
          Constants.Stats.CR,
          Constants.Stats.CD,
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
        comboAbilities: [NULL, ULT, FUA, BASIC, FUA, BASIC],
        comboDot: 0,
        comboBreak: 0,
        relicSets: [
          [Sets.GeniusOfBrilliantStars, Sets.GeniusOfBrilliantStars],
          [Sets.TheAshblazingGrandDuke, Sets.TheAshblazingGrandDuke],
          [Sets.PoetOfMourningCollapse, Sets.PoetOfMourningCollapse],
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
            characterId: '1112', // Topaz
            lightCone: '23016', // Worrisome
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '23023', // Unjust destiny
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
        comboAbilities: [NULL, ULT, BASIC, BASIC, BASIC],
        comboDot: 0,
        comboBreak: 1,
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
            characterId: '8006', // Stelle
            lightCone: '21004', // Memories
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1301', // Gallagher
            lightCone: '20015', // Multi
            characterEidolon: 6,
            lightConeSuperimposition: 5,
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
        comboAbilities: [NULL, ULT, BASIC, BASIC, BASIC, SKILL],
        comboDot: 0,
        comboBreak: 1,
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
            characterId: '8006', // Stelle
            lightCone: '21004', // Memories
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1222', // Lingsha
            lightCone: '23032', // Scent
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 1,
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
            characterId: '1101', // Bronya
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 1,
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
            characterId: '1101', // Bronya
            lightCone: '23003', // But the battle
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1303', // Ruan Mei
            lightCone: '23019', // Past self
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
      presets: [
        PresetEffects.BANANA_SET,
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
      presets: [
        PresetEffects.BANANA_SET,
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
        comboAbilities: [NULL, ULT, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1314', // Jade
            lightCone: '23028', // Yet hope
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1222', // Lingsha
            lightCone: '23032', // Scent
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
      presets: [
        PresetEffects.BANANA_SET,
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
        comboAbilities: [NULL, ULT, BASIC, MEMO_SKILL, MEMO_SKILL, BASIC, MEMO_SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1313', // Sunday
            lightCone: '23034', // Grounded
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
          Stats.ATK_P,
        ],
        comboAbilities: [NULL, ULT, FUA, BASIC, FUA, FUA],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1401', // The Herta
            lightCone: '23037', // Veil
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1103', // Serval
            lightCone: '20013', // Passkey
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1222', // Lingsha
            lightCone: '23032', // Scent
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
        comboAbilities: [NULL, SKILL, ULT, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1313', // Sunday
            lightCone: '23034', // Grounded
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1403', // Tribbie
            lightCone: '23038', // Flower
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1203', // Luocha
            lightCone: '23008', // Coffin
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
        comboAbilities: [NULL, ULT, SKILL, SKILL, SKILL, SKILL],
        comboDot: 0,
        comboBreak: 0,
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
        ],
        teammates: [
          {
            characterId: '1313', // Sunday
            lightCone: '23034', // Grounded
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1217', // Huohuo
            lightCone: '23017', // Night of Fright
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
      presets: [
        PresetEffects.BANANA_SET,
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
        comboAbilities: [NULL, SKILL, SKILL, ULT, MEMO_SKILL, MEMO_SKILL, MEMO_SKILL, MEMO_SKILL, MEMO_TALENT],
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1403', // Tribbie
            lightCone: '23038', // Flower
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '8008', // RMC
            lightCone: '21050', // Victory
            characterEidolon: 6,
            lightConeSuperimposition: 5,
          },
          {
            characterId: '1222', // Lingsha
            lightCone: '23032', // Scent
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
      presets: [
        PresetEffects.BANANA_SET,
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
        [Constants.Stats.EHR]: 0.75,
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
      presets: [
        PresetEffects.fnAshblazingSet(1),
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
        ],
        breakpoints: {
          [Stats.EHR]: 0.388,
        },
        comboAbilities: [NULL, ULT, FUA, SKILL, SKILL, BASIC],
        deprioritizeBuffs: true,
        comboDot: 0,
        comboBreak: 0,
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
            characterId: '1220', // Feixiao
            lightCone: '23031', // Venture
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1309', // Robin
            lightCone: '23026', // Nightglow
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
          {
            characterId: '1304', // Aventurine
            lightCone: '23023', // Unjust destiny
            characterEidolon: 0,
            lightConeSuperimposition: 1,
          },
        ],
      },
    },
  }
}

