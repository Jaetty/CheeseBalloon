from sqlalchemy.orm import Session

from models.lives import Live
from schemas.lives import LiveCreate


class StreamerService:
    def create(self, db: Session, live: LiveCreate):
        db_live = Live(
            streamer_id=live.streamer_id,
            stream_url=live.stream_url,
            thumbnail_url=live.thumbnail_url,
            start_dt= live.start_dt
        )
        db.add(db_live)
        db.commit()
        db.refresh(db_live)
        return db_live

    def is_live(self, db: Session, origin_id: str) -> bool:
        # streamer = db.query(Streamer).filter(Streamer.origin_id == origin_id).first()
        # if streamer:
        #     return True
        # else:
        #     return False
