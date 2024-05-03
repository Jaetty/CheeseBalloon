from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import and_
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

    def get_end_live_id(self, db: Session, cycle_log_id: int, live_list: List[int]):
        end_live = db.query(LiveLog).filter(
            and_(
                LiveLog.cycle_log_id == cycle_log_id,
                LiveLog.live_id.notin_(live_list)
            )
        ).all()
        live_list = [live.live_id for live in end_live]
        if live_list is not None:
            return live_list
        else:
            return None
