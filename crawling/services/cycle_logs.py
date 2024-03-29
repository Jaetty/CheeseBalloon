from sqlalchemy.orm import Session

from models.cycle_logs import CycleLog
from schemas.cycle_logs import CycleLogCreate


class CycleLogService:
    def create(self, db: Session, cycle_log: CycleLogCreate):

        db_cycle_log = CycleLog(
            afreeca_viewer_cnt=cycle_log.afreeca_viewer_cnt,
            chzzk_viewer_cnt=cycle_log.chzzk_viewer_cnt,
        )
        db.add(db_cycle_log)
        db.commit()
        db.refresh(db_cycle_log)
        return db_cycle_log

