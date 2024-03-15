from sqlalchemy import Column, String
from ..config.database import Base

class UserInfo(Base):
    __tablename__ = "Users"

    user_id = Column(String, primary_key=True, index= True)
    password = Column(String)
    email = Column(String)
    nickname = Column(String, nullable=True)

