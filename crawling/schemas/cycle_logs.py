from pydantic import BaseModel,Field
from datetime import datetime

# StreamerLog 생성을 위한 스키마
class CycleLogCreate(BaseModel):
    afreeca_viewer_cnt: int
    chzzk_viewer_cnt: int


# StreamerLog 데이터 읽기를 위한 스키마 (ID 포함)
class CycleLogRead(BaseModel):
    cycle_log_id: int
    afreeca_viewer_cnt: int
    chzzk_viewer_cnt: int
    cycle_dt: datetime

    class Config:
        from_attributes = True