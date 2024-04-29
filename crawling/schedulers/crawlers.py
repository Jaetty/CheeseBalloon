from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from fastapi import HTTPException
from datetime import datetime
from zoneinfo import ZoneInfo
from sqlalchemy.orm import Session
from businesses.crawling import CrawlingBusiness


class Scheduler:
    async def crawling(self, db: Session):
        print("크롤링을 시작합니다.")
        await CrawlingBusiness().crawling(db=db)
        print("크롤링을 완료헀습니다.")
        return {"result": "good"}

    def start(self, db: Session, scheduler: AsyncIOScheduler):

        # 즉시 실행하고, 그 후에 20분 간격으로 반복 실행
        scheduler.add_job(
            self.crawling,
            trigger=IntervalTrigger(seconds=1200, start_date=datetime.now(ZoneInfo('Asia/Seoul'))),
            id='crawling_start',
            args=(db,)
        )
        return {"result": "good"}

    def cancel(self, scheduler: AsyncIOScheduler):
        # 작업 취소
        scheduler.remove_job('crawling_start')
        return {"result": "good"}