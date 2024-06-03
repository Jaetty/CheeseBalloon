from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import and_
from models.lives import Live
from schemas.lives import LiveCreate


class LiveService:
    def create(self, db: Session, live: LiveCreate):
        db_live = Live(
            streamer_id=live.streamer_id,
            live_origin_id=live.live_origin_id,
            stream_url=live.stream_url,
            thumbnail_url=live.thumbnail_url,
            live_start_date=live.live_start_date,
            is_live=live.is_live
        )
        db.add(db_live)
        db.commit()
        db.refresh(db_live)
        return db_live

    def update_is_live_false(self, db: Session, live_list: List[int]):
        db.query(Live).filter(
            Live.live_id.in_(live_list)
        ).update({Live.is_live: False})
        db.commit()

    def update_is_live_true(self, db: Session, streamer_id: int, live_origin_id: int):
        db.query(Live).filter(
            and_(Live.streamer_id == streamer_id, Live.live_origin_id == live_origin_id)
        ).update({Live.is_live: True})
        db.commit()

    def is_live(self, db: Session, streamer_id: int, live_origin_id: int) -> bool:
        live = db.query(Live).filter(
            and_(
                Live.streamer_id == streamer_id,
                Live.live_origin_id == live_origin_id
            )
        ).first()
        if live is not None:
            return True
        else:
            return False

    def get_live(self, db: Session, streamer_id: int, live_origin_id: int):
        live = db.query(Live).filter(and_(Live.streamer_id == streamer_id, Live.live_origin_id == live_origin_id)).first()
        if live is not None:
            return live.live_id
        else:
            return None
