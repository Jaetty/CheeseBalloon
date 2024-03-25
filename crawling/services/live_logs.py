from sqlalchemy.orm import Session

from models.live_logs import LiveLog
from schemas.live_logs import LiveLogCreate


class LiveLogService:
    def create(self, db: Session, live_log: LiveLogCreate):
        db_live_log = LiveLog(
            live_id=live_log.live_id,
            cycle_log_id=live_log.cycle_log_id,
            category_id=live_log.category_id,
            title=live_log.title,
            viewer_cnt=live_log.viewer_cnt
        )
        db.add(db_live_log)
        db.commit()
        db.refresh(db_live_log)
        return db_live_log

