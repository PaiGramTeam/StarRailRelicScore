from typing import Optional, List

from pydantic import BaseModel

from starrailrelicscore.models.enums import Parts


class Rating(BaseModel):
    threshold: int
    rating: str


class Score(BaseModel):
    score: float
    rating: str
    main_stat_score: float
    tid: int
    meta: Optional[dict] = None


class TotalScore(BaseModel):
    relics: Optional[List[Score]] = None
    total_score: float = 0.0
    total_rating: str = ""
