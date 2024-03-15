from sqlalchemy import Column, String, BIGINT, Text, Integer
from sqlalchemy.orm import relationship

from config.database import Base


class Streamer(Base):
    __tablename__ = "streamers"

    streamer_id = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    origin_id = Column(Text, nullable=False)
    name = Column(String(20), nullable=False)
    profile_url = Column(String(400), nullable=False)
    channel_url = Column(Text, nullable=False)
    follower_cnt = Column(Integer, nullable=False)
    platform = Column(String(1), nullable=False)

    logs = relationship("StreamerLog", back_populates="streamer")
    lives = relationship("Live", back_populates="streamer")
