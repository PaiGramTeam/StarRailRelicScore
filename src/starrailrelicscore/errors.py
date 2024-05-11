class StarRailRelicScoreBaseError(Exception):
    """Base error for StarRailRelicScore"""


class StarRailRelicScoreNoMetaData(StarRailRelicScoreBaseError):
    """Character not found in metadata"""


class StarRailRelicScoreNoRelicConfig(StarRailRelicScoreBaseError):
    """Relic not found in relic config"""
