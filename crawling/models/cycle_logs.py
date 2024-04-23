from datetime import datetime
from zoneinfo import ZoneInfo

from sqlalchemy import Column, BigInteger, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from config.database import Base

class CycleLog(Base):
    __tablename__ = 'cycle_logs'

    cycle_log_id = Column(BigInteger, primary_key=True, autoincrement=True, nullable=False)
    afreeca_viewer_cnt = Column(Integer, nullable=False)
    chzzk_viewer_cnt = Column(Integer, nullable=False)
    cycle_dt = Column(DateTime, nullable=False, default= datetime.now(ZoneInfo('Asia/Seoul')))

    live_logs = relationship("LiveLog", back_populates="cycle_log")