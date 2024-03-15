from datetime import datetime

from sqlalchemy import String, Column, BigInteger, Integer, DateTime, ForeignKey, FLOAT
from sqlalchemy.orm import relationship

from config.database import Base

class Live(Base):
    __tablename__ = 'lives'

    live_id = Column(BigInteger, primary_key=True, autoincrement=True, nullable=False)
    streamer_id = Column(BigInteger, ForeignKey('streamers.streamer_id'), nullable=False)
    stream_url = Column(String(400), nullable=False)
    thumbnail = Column(String(400), nullable=False)
    start_dt = Column(DateTime, nullable=False)
    end_dt = Column(DateTime, nullable=True)
    total_live_time = Column(Integer, nullable=True)

    logs = relationship("LiveLog", back_populates="live")
    streamer = relationship("Streamer", back_populates="lives")