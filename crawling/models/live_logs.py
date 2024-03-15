from datetime import datetime

from sqlalchemy import String, Column, BigInteger, Integer, DateTime, ForeignKey, FLOAT
from sqlalchemy.orm import relationship

from config.database import Base

class LiveLog(Base):
    __tablename__ = 'live_logs'

    live_log_id = Column(BigInteger, primary_key=True, autoincrement=True, nullable=False)
    live_id = Column(BigInteger, ForeignKey('lives.live_id'), nullable=False)
    category_id = Column(BigInteger, ForeignKey('categories.category_id'), nullable=True)
    title = Column(String(200), nullable=True)
    viewer_cnt = Column(Integer, nullable=False)
    rating = Column(FLOAT, nullable=False)
    total_rating = Column(FLOAT, nullable=False)
    live_dt = Column(DateTime, nullable=False, default= datetime.today())

    live = relationship("Live", back_populates="logs")
    category = relationship("Category", back_populates="live_logs")