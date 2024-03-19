from sqlalchemy import Column, String, BIGINT, Text, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from config.database import Base


class StreamerLog(Base):
    __tablename__ = "streamer_logs"

    streamer_log_id = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    streamer_id = Column(BIGINT, ForeignKey('streamers.streamer_id'), nullable=False)
    follower = Column(Integer, nullable=False)
    reg_dt = Column(DateTime, nullable=False, default=datetime.today())

    # Streamer와의 관계를 설정함
    streamer = relationship("Streamer", back_populates="logs")