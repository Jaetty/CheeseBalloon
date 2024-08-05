from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..config.database import get_db
from ..schemas.users import UsersCreateItem, UsersReadItem
from ..businesses.users import UsersBusiness

router = APIRouter(
    prefix='/users',
    tags=['Users']
)

@router.post("/", response_model=UsersReadItem)
def create(user: UsersSchema, db: Session = Depends(get_db)):
    return UsersBusiness().create(db=db, user=user)

