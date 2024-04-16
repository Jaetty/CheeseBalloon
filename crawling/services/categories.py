from sqlalchemy.orm import Session

from models.categories import Category
from schemas.categories import CategoryCreate

class CategoryService:
    def create(self, db: Session, category: CategoryCreate):
        db_category = Category(
            category=category.category
        )
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category

    def is_category(self, db: Session, category: str) -> bool:
        db_category = db.query(Category).filter(Category.category == category).first()
        if db_category:
            return True
        else:
            return False

    def get_category(self, db: Session, category: str) -> bool:
        category = db.query(Category).filter(Category.category == category).first()
        if category:
            return category.category_id
        else:
            return None