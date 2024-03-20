from pydantic import BaseModel
from datetime import datetime
class StreamerInfo(BaseModel):

    origin_id: str
    name: str
    profile_url: str
    channel_url: str
    platform: str
    follower: int
    stream_url: str
    thumbnail_url: str
    start_dt: datetime
    category: str | None = None
    title: str | None = None
    viewer_cnt: int