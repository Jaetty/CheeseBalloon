from datetime import datetime

from pydantic import BaseModel

class LiveCreate(BaseModel):
    streamer_id: int
    live_origin_id: int
    stream_url: str
    thumbnail_url: str
    live_start_date: datetime
    is_live: bool

# Streamer 데이터 읽기를 위한 스키마 (ID 포함)
class LiveRead(BaseModel):
    live_id: int
    streamer_id: int
    live_origin_id: int
    stream_url: str
    thumbnail_url: str
    live_start_date: datetime
    is_live: bool

    class Config:
        from_attributes = True