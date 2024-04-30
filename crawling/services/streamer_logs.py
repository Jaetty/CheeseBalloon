from sqlalchemy.orm import Session
from datetime import datetime
from zoneinfo import ZoneInfo
from models.streamer_logs import StreamerLog


class StreamerLogService:
    def create(self, db: Session, follower: int, streamer_id: int):

        db_streamer_log = StreamerLog(
            streamer_id=streamer_id,
            follower=follower,
            reg_dt=datetime.now(ZoneInfo('Asia/Seoul'))
        )
        db.add(db_streamer_log)
        db.commit()
        db.refresh(db_streamer_log)
        return db_streamer_log

