from httpx import get
from src.starrailrelicscore.client.character import Character
from starrailrelicscore.models.mihomo import Avatar


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
            print(avatar.avatarId)
            score = Character.score_character(avatar)
            for relic in score.relics:
                print(relic.sub_stat_score)
            print(score.total_score)
            print(score.total_rating)
            assert score is not None
