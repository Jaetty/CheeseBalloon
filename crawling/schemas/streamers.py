from pydantic import BaseModel


class StreamerCreate(BaseModel):
    origin_id: str
    name: str
    profile_url: str
    channel_url: str
    platform: str


# Streamer 데이터 읽기를 위한 스키마 (ID 포함)
class StreamerRead(BaseModel):
    streamer_id: int
    origin_id: str
    name: str
    profile_url: str
    channel_url: str
    platform: str

    class Config:
        from_attributes = True


class StreamerUpdate(BaseModel):
    streamer_id: int

    class Config:
        from_attributes = True
