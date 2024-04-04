from sqlalchemy.orm import Session

from models.streamers import Streamer
from models.streamer_logs import StreamerLog


class StreamerLogService:
    def create(self, db: Session, follower: int, streamer_id: int):

        db_streamer_log = StreamerLog(
            streamer_id=streamer_id,
            follower=follower
        )
        db.add(db_streamer_log)
        db.commit()
        db.refresh(db_streamer_log)
        return db_streamer_log

