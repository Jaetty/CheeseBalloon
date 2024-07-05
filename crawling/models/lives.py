from sqlalchemy import String, Column, BigInteger, Integer, DateTime, ForeignKey, FLOAT, Boolean
from sqlalchemy.orm import relationship

from config.database import Base

class Live(Base):
    __tablename__ = 'lives'

    live_id = Column(BigInteger, primary_key=True, autoincrement=True, nullable=False)
    streamer_id = Column(BigInteger, ForeignKey('streamers.streamer_id'), nullable=False)
    live_origin_id = Column(BigInteger, nullable=False)
    stream_url = Column(String(600), nullable=False)
    thumbnail_url = Column(String(600), nullable=False)
    live_start_date = Column(DateTime, nullable=True)
    is_live = Column(Boolean, nullable=True)

    logs = relationship("LiveLog", back_populates="live")
    streamer = relationship("Streamer", back_populates="lives")