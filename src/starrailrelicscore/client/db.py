from starrailrelicscore.errors import StarRailRelicScoreNoMetaData
from starrailrelicscore.data.metadata import METADATA_CH_TYPE, METADATA


def get_scoring_metadata(character_id: int, copy: bool = True) -> "METADATA_CH_TYPE":
    scoring_metadata = METADATA.get(character_id)
    if not scoring_metadata:
        raise StarRailRelicScoreNoMetaData()
    if copy:
        scoring_metadata = scoring_metadata.copy()
    return scoring_metadata
