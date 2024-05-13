from pydantic import BaseModel

class StreamerInfo(BaseModel):
    origin_id: str
    name: str
    profile_url: str
    channel_url: str
    platform: str
    stream_url: str
    live_origin_id: int
    thumbnail_url: str
    category: str | None = None
    title: str | None = None
    viewer_cnt: int