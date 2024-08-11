from datetime import datetime

from pydantic import BaseModel


class StreamerInfo(BaseModel):
    origin_id: str
    name: str
    profile_url: str
    channel_url: str
    platform: str
    stream_url: str
    live_origin_id: int
    live_start: datetime
    thumbnail_url: str
    category: str | None = None
    title: str | None = None
    viewer_cnt: int


class StreamerInfoUpdate(BaseModel):
    streamer_id: int
    profile_url: str | None
    name: str | None
    follower: int
