import datetime
from sqlalchemy.orm import Session

from ..models.users import Users
from ..schemas.uesers import UsersCreateItem, UsersUpdateItem


class UserService:
    def create(self, db: Session, user: UsersCreateItem):
        db_user = Users(
            user_id=user.user_id,
            email=user.email,
            password=user.password,
            nickname=user.nickname
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    def read_list(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(Users).offset(skip).limit(limit).all()

    def read(self, db: Session, user_id: str):
        result = db.query(Users).filter(Users.user_id == user_id).first()
        return result

    def update(self, db: Session, user_id: str, user: UsersUpdateItem):
        db_user = db.query(Users).filter(Users.user_id == user_id).update({
            Users.nickname: user.nickname,
            Users.email: user.email,
        }
        )
        db.commit()
        return db_user

    def delete(self, db: Session, user_id: str):
        db_user = db.query(Users).filter(Users.user_id == user_id).first()
        db.delete(db_user)
        db.commit()
        return db_user