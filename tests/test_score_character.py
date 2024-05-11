import pytest

from httpx import get
from src.starrailrelicscore.client.character import Character
from starrailrelicscore.models.mihomo import Avatar


@pytest.mark.asyncio
class TestScoreCharacter:
    @staticmethod
    def test_get_mihomo_data():
        data = get("https://api.mihomo.me/sr_info/101638913")
        assert data.status_code == 200

    @staticmethod
    def test_score_character():
        data = get("https://api.mihomo.me/sr_info/101638913")
        data_json = data.json()
        avatars = []
        for a in data_json.get("detailInfo", {}).get("avatarDetailList", []):
            avatars.append(Avatar(**a))
        for b in data_json.get("detailInfo", {}).get("assistAvatarList", []):
            avatars.append(Avatar(**b))
        for avatar in avatars:
            score = Character.score_character(avatar)
            print(score.total_score)
            print(score.total_rating)
            assert score is not None
