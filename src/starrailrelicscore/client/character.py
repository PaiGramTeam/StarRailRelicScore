from starrailrelicscore.client.relic import RelicClient
from starrailrelicscore.client.relic_scorer import RelicScorer
from starrailrelicscore.models.mihomo import Avatar
from starrailrelicscore.models.relic_scorer import TotalScore


class Character:
    @staticmethod
    def score_character(avatar: "Avatar") -> "TotalScore":
        character_id = avatar.avatarId
        relics = RelicClient.get_relics(avatar.relicList) if avatar.relicList else []
        return RelicScorer.score_character(character_id, relics)
