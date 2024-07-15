import json
import os
from typing import Dict

from starrailrelicscore.models.enums import Stats

CHARACTER_CH_DATA_TYPE = Dict[str, Dict[int, Dict[Stats, float]]]
CHARACTER_DATA_TYPE = Dict[int, CHARACTER_CH_DATA_TYPE]
PATH = os.path.dirname(os.path.abspath(__file__))


class CharacterData:
    def __init__(self):
        self.CHARACTER_DATA = {}
        self.load_game_data()

    def load_game_data(self):
        with open(os.path.join(PATH, "game_data.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
            for character_id, _character_data in data["characters"].items():
                cid = int(character_id)
                self.CHARACTER_DATA[cid] = _character_data

    def get_character_data(self, character_id: int) -> "CHARACTER_CH_DATA_TYPE":
        return self.CHARACTER_DATA.get(character_id)


character_data = CharacterData()
