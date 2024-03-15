from pydantic import BaseModel,Field
from datetime import datetime

# StreamerLog 생성을 위한 스키마
class LiveLogCreate(BaseModel):
    streamer_id: int
    follower: int

# StreamerLog 데이터 읽기를 위한 스키마 (ID 포함)
class LiveLogRead(BaseModel):
    live_id: int
    category_id: int | None = None
    title: str | None = None
    viewer_cnt: int
    rating: float
    total_rating: float
    live_dt: datetime

    class Config:
        from_attributes = True