from sqlalchemy.orm import Session

from models.streamers import Streamer
from models.streamer_logs import StreamerLog


class StreamerLogService:
    def create(self, db: Session, follower: int, origin_id: str):

        streamer = db.query(Streamer).filter(Streamer.origin_id == origin_id).first()

        if not streamer:
            print(f"No streamer found with origin_id {origin_id}")
            return

        db_streamer_log = StreamerLog(
            streamer_id=streamer.streamer_id,
            follower=follower
        )
        db.add(db_streamer_log)
        db.commit()
        db.refresh(db_streamer_log)
        return db_streamer_log

