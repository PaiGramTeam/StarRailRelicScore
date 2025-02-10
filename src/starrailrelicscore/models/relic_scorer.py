from typing import Optional, List

from pydantic import BaseModel


class Rating(BaseModel):
    threshold: int
    rating: str


class Score(BaseModel):
    tid: int
    score: float
    rating: str
    main_stat_score: float
    sub_stat_score: List[float]
    meta: Optional[dict] = None


class TotalScore(BaseModel):
    relics: Optional[List[Score]] = None
    total_score: float = 0.0
    total_rating: str = ""
