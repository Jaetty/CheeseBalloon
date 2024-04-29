from sqlalchemy.orm import Session
from typing import List, Type
from models.streamers import Streamer
from schemas.streamers import StreamerCreate, StreamerRead


class StreamerService:
    def create(self, db: Session, streamer: StreamerCreate):
        db_streamer = Streamer(
            origin_id=streamer.origin_id,
            name=streamer.name,
            profile_url=streamer.profile_url,
            channel_url=streamer.channel_url,
            platform=streamer.platform
        )
        db.add(db_streamer)
        db.commit()
        db.refresh(db_streamer)
        return db_streamer

    def is_streamer(self, db: Session, origin_id: str) -> bool:
        streamer = db.query(Streamer).filter(Streamer.origin_id == origin_id).first()
        if streamer:
            return True
        else:
            return False

    def get_streamer(self, db: Session, origin_id: str):
        streamer = db.query(Streamer).filter(Streamer.origin_id == origin_id).first()
        if streamer:
            return streamer.streamer_id
        else:
            return None

    def get_streamers_per_platform(self, db: Session, platform: str) -> List[StreamerRead]:
        streamers = db.query(Streamer).filter(Streamer.platform == platform).all()
        streamer_list = [StreamerRead(
            streamer_id=streamer.streamer_id,
            origin_id=streamer.origin_id,
            name=streamer.name,
            profile_url=streamer.profile_url,
            channel_url=streamer.channel_url,
            platform=streamer.platform
            ) for streamer in streamers]

        return streamer_list
