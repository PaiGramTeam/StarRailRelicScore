from starrailrelicscore.models.enums import Stats, Parts
from starrailrelicscore.models.relic_scorer import Rating

min_roll_value = 5.1

main_stat_free_rolls = {
    Parts.Body: {
        Stats.HP_P: 1.32,
        Stats.ATK_P: 1.284,
        Stats.DEF_P: 1.305,
        Stats.CR: 1.644,
        Stats.CD: 1.658,
        Stats.OHB: 1.712,
        Stats.EHR: 1.668,
    },
    Parts.Feet: {
        Stats.HP_P: 1.058,
        Stats.ATK_P: 1.019,
        Stats.DEF_P: 1,
        Stats.SPD: 1.567,
    },
    Parts.PlanarSphere: {
        Stats.HP_P: 1.583,
        Stats.ATK_P: 1.559,
        Stats.DEF_P: 1.587,
        Stats.Physical_DMG: 1.763,
        Stats.Fire_DMG: 1.763,
        Stats.Ice_DMG: 1.763,
        Stats.Lightning_DMG: 1.763,
        Stats.Wind_DMG: 1.763,
        Stats.Quantum_DMG: 1.763,
        Stats.Imaginary_DMG: 1.763,
    },
    Parts.LinkRope: {
        Stats.HP_P: 1.073,
        Stats.ATK_P: 1.076,
        Stats.DEF_P: 1.172,
        Stats.BE: 1.416,
        Stats.ERR: 2,
    },
}

rating_to_rolls = {
    "F": 1,
    "D": 2,
    "C": 3,
    "B": 4,
    "A": 5,
    "S": 6,
    "SS": 7,
    "SSS": 8,
    "WTF": 9,
}

ratings = [Rating(rating=k, threshold=v) for k, v in rating_to_rolls.items()]
