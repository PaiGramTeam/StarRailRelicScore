from enum import Enum


class Stats(str, Enum):
    ATK_P = "ATK%"
    """ 攻击力 百分比 """
    ATK = "ATK"
    """ 攻击力 """
    BE = "Break Effect"
    """ 击破特攻 """
    CR = "CRIT Rate"
    """ 暴击率 百分比 """
    CD = "CRIT DMG"
    """ 暴击伤害 百分比 """
    DEF_P = "DEF%"
    """ 防御力 百分比 """
    DEF = "DEF"
    """ 防御力 """
    Fire_DMG = "Fire DMG Boost"
    """ 火属性伤害提高 百分比 """
    HP_P = "HP%"
    """ 生命值 百分比 """
    HP = "HP"
    """ 生命值 """
    OHB = "Outgoing Healing Boost"
    """ 治疗量加成 百分比"""
    Ice_DMG = "Ice DMG Boost"
    """ 冰属性伤害提高 百分比 """
    Imaginary_DMG = "Imaginary DMG Boost"
    """ 虚数属性伤害提高 百分比 """
    Physical_DMG = "Physical DMG Boost"
    """ 物理属性伤害提高 百分比 """
    Quantum_DMG = "Quantum DMG Boost"
    """ 量子属性伤害提高 百分比 """
    SPD = "SPD"
    """ 速度 """
    ERR = "Energy Regeneration Rate"
    """ 能量恢复效率 百分比 """
    EHR = "Effect Hit Rate"
    """ 效果命中 百分比 """
    RES = "Effect RES"
    """ 效果抵抗 百分比 """
    Lightning_DMG = "Lightning DMG Boost"
    """ 雷属性伤害提高 百分比 """
    Wind_DMG = "Wind DMG Boost"
    """ 风属性伤害提高 百分比 """
    SPD_P = "SPD%"
    """ 速度 百分比 """


class Parts(str, Enum):
    Head = "Head"
    Hands = "Hands"
    Body = "Body"
    Feet = "Feet"
    PlanarSphere = "PlanarSphere"
    LinkRope = "LinkRope"


class RelicAffix(str, Enum):
    AttackAddedRatio: str = "AttackAddedRatio"
    """ 攻击力 百分比 """
    AttackDelta: str = "AttackDelta"
    """ 攻击力 """
    BreakDamageAddedRatioBase: str = "BreakDamageAddedRatioBase"
    """ 击破特攻 """
    CriticalChanceBase: str = "CriticalChanceBase"
    """ 暴击率 百分比 """
    CriticalDamageBase: str = "CriticalDamageBase"
    """ 暴击伤害 百分比 """
    DefenceAddedRatio: str = "DefenceAddedRatio"
    """ 防御力 百分比 """
    DefenceDelta: str = "DefenceDelta"
    """ 防御力 """
    FireAddedRatio: str = "FireAddedRatio"
    """ 火属性伤害提高 百分比 """
    HPAddedRatio: str = "HPAddedRatio"
    """ 生命值 百分比 """
    HPDelta: str = "HPDelta"
    """ 生命值 """
    HealRatioBase: str = "HealRatioBase"
    """ 治疗量加成 百分比"""
    IceAddedRatio: str = "IceAddedRatio"
    """ 冰属性伤害提高 百分比 """
    ImaginaryAddedRatio: str = "ImaginaryAddedRatio"
    """ 虚数属性伤害提高 百分比 """
    PhysicalAddedRatio: str = "PhysicalAddedRatio"
    """ 物理属性伤害提高 百分比 """
    QuantumAddedRatio: str = "QuantumAddedRatio"
    """ 量子属性伤害提高 百分比 """
    SpeedDelta: str = "SpeedDelta"
    """ 速度 """
    SPRatioBase: str = "SPRatioBase"
    """ 能量恢复效率 百分比 """
    StatusProbabilityBase: str = "StatusProbabilityBase"
    """ 效果命中 百分比 """
    StatusResistanceBase: str = "StatusResistanceBase"
    """ 效果抵抗 百分比 """
    ThunderAddedRatio: str = "ThunderAddedRatio"
    """ 雷属性伤害提高 百分比 """
    WindAddedRatio: str = "WindAddedRatio"
    """ 风属性伤害提高 百分比 """


class RelicPosition(str, Enum):
    HEAD: str = "HEAD"
    """ 头 """
    HAND: str = "HAND"
    """ 手 """
    BODY: str = "BODY"
    """ 躯干 """
    FOOT: str = "FOOT"
    """ 脚 """
    NECK: str = "NECK"
    """ 位面球 """
    OBJECT: str = "OBJECT"
    """ 连结绳 """

    @property
    def num(self):
        index_map = {
            RelicPosition.HEAD: 0,
            RelicPosition.HAND: 1,
            RelicPosition.BODY: 2,
            RelicPosition.FOOT: 3,
            RelicPosition.NECK: 0,
            RelicPosition.OBJECT: 1,
        }
        return index_map.get(self)


def fix_relic_position(mihomo_type: RelicPosition) -> Parts:
    types = {
        RelicPosition.HEAD: Parts.Head,
        RelicPosition.HAND: Parts.Hands,
        RelicPosition.BODY: Parts.Body,
        RelicPosition.FOOT: Parts.Feet,
        RelicPosition.NECK: Parts.PlanarSphere,
        RelicPosition.OBJECT: Parts.LinkRope,
    }
    return types[mihomo_type]


def fix_relic_affix(mihomo_affix: RelicAffix) -> Stats:
    affix_map = {
        RelicAffix.AttackAddedRatio: Stats.ATK_P,
        RelicAffix.AttackDelta: Stats.ATK,
        RelicAffix.BreakDamageAddedRatioBase: Stats.BE,
        RelicAffix.CriticalChanceBase: Stats.CR,
        RelicAffix.CriticalDamageBase: Stats.CD,
        RelicAffix.DefenceAddedRatio: Stats.DEF_P,
        RelicAffix.DefenceDelta: Stats.DEF,
        RelicAffix.FireAddedRatio: Stats.Fire_DMG,
        RelicAffix.HPAddedRatio: Stats.HP_P,
        RelicAffix.HPDelta: Stats.HP,
        RelicAffix.HealRatioBase: Stats.OHB,
        RelicAffix.IceAddedRatio: Stats.Ice_DMG,
        RelicAffix.ImaginaryAddedRatio: Stats.Imaginary_DMG,
        RelicAffix.PhysicalAddedRatio: Stats.Physical_DMG,
        RelicAffix.QuantumAddedRatio: Stats.Quantum_DMG,
        RelicAffix.SpeedDelta: Stats.SPD,
        RelicAffix.SPRatioBase: Stats.ERR,
        RelicAffix.StatusProbabilityBase: Stats.EHR,
        RelicAffix.StatusResistanceBase: Stats.RES,
        RelicAffix.ThunderAddedRatio: Stats.Lightning_DMG,
        RelicAffix.WindAddedRatio: Stats.Wind_DMG,
    }
    return affix_map.get(mihomo_affix)
