from pydantic import BaseModel
from datetime import datetime
# StreamerLog 생성을 위한 스키마
class StreamerLogCreate(BaseModel):
    streamer_id: int
    follower: int

# StreamerLog 데이터 읽기를 위한 스키마 (ID 포함)
class StreamerLogRead(BaseModel):
    streamer_log_id: int
    streamer_id: int
    follower: int
    reg_dt: datetime

    class Config:
        from_attributes = True