from sqlalchemy.orm import Session
from fastapi import HTTPException

from ..services.users import UsersService
from ..schemas.users import UsersCreateItem, UsersUpdateItem


class UsersBusiness:
    def create(self, user: UsersCreateItem, db: Session):
        return UsersService().create(db=db, user=user)

    def get_list(self, db: Session, skip: int = 0, limit: int = 100):
        return UsersService().get_list(db=db, skip=skip, limit=limit)

    def get(self, user_id: str, db: Session):
        db_user = UsersService().get(db, user_id)
        if db_user is None:
          raise HTTPException(status_code=404, detail='User not found')
        return db_user

    def update(self, user_id: str, user: UsersUpdateItem, db: Session):
        UsersService().update(db, user_id, user)
        return {"messages": "success"}

    def delete(self, user_id: str, db: Session):
        UsersService().delete(db, user_id)
        return {"messages": "success"}