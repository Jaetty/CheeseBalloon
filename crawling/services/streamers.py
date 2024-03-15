from sqlalchemy.orm import Session

from models.streamers import Streamer
from schemas.streamers import StreamerCreate


class StreamerService:
    def create(self, db: Session, streamer: StreamerCreate):
        db_streamer = Streamer(
            origin_id=streamer.origin_id,
            name=streamer.name,
            profile_url=streamer.profile_url,
            channel_url=streamer.channel_url,
            follower_cnt=streamer.follower_cnt,
            platform=streamer.platform
        )
        db.add(db_streamer)
        db.commit()
        db.refresh(db_streamer)
        return db_streamer

    def get_streamer(self, db: Session, origin_id: str) -> bool:
        streamer = db.query(Streamer).filter(Streamer.origin_id == origin_id).first()
        if streamer:
            return True
        else:
            return False
