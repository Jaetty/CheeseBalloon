from pydantic import BaseModel

class CategoryCreate(BaseModel):
    category: str

# Streamer 데이터 읽기를 위한 스키마 (ID 포함)
class CategoryRead(BaseModel):
    category_id: int
    category: str

    class Config:
        from_attributes = True