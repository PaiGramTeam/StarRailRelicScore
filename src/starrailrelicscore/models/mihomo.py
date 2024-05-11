from typing import Optional, List

from pydantic import BaseModel


class SubAffix(BaseModel):
    cnt: Optional[int] = 1
    step: Optional[int] = 0
    affixId: int


class Relic(BaseModel):
    tid: int
    level: Optional[int] = 0
    mainAffixId: int
    subAffixList: Optional[List[SubAffix]]
    type: int


class Avatar(BaseModel):
    avatarId: int
    relicList: Optional[List[Relic]]
