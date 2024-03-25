from sqlalchemy.orm import Session

from models.lives import Live
from schemas.lives import LiveCreate


class LiveService:
    def create(self, db: Session, live: LiveCreate):
        db_live = Live(
            streamer_id=live.streamer_id,
            live_origin_id=live.live_origin_id,
            stream_url=live.stream_url,
            thumbnail_url=live.thumbnail_url,
            start_dt= live.start_dt
        )
        db.add(db_live)
        db.commit()
        db.refresh(db_live)
        return db_live

    def is_live(self, db: Session, streamer_id: int, live_origin_id: int) -> bool:
        live = db.query(Live).filter(Live.streamer_id == streamer_id and Live.live_origin_id == live_origin_id).first()
        if live:
            return True
        else:
            return False

    def get_live(self, db: Session, streamer_id: int, live_origin_id: int):
        live = db.query(Live).filter(Live.streamer_id == streamer_id and Live.live_origin_id == live_origin_id).first()
        if live:
            return live.live_id
        else:
            return None
