from sqlalchemy import String, Column, BigInteger
from sqlalchemy.orm import relationship

from config.database import Base

class Category(Base):
    __tablename__ = 'categories'

    category_id = Column(BigInteger, primary_key=True, autoincrement=True, nullable=False)
    category = Column(String(30), nullable=True)

    live_logs = relationship("LiveLog", back_populates="category")