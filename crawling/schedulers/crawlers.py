from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger
from fastapi import HTTPException
from datetime import datetime
from zoneinfo import ZoneInfo
from sqlalchemy.orm import Session
from businesses.crawling import CrawlingBusiness


class Scheduler:

    main_scheduler = AsyncIOScheduler(timezone='Asia/Seoul')  # 백그라운드로 실행하기 위해 선언
    follower_scheduler = AsyncIOScheduler(timezone='Asia/Seoul')  # 백그라운드로 실행하기 위해 선언
    main_scheduler.start()
    follower_scheduler.start()

    async def crawling(self, db: Session):
        await CrawlingBusiness().crawling(db=db)
        return {"crawling": "good"}

    def start(self, db: Session):

        # 즉시 실행하고, 그 후에 20분 간격으로 반복 실행
        Scheduler.main_scheduler.add_job(
            self.crawling,
            # trigger=IntervalTrigger(seconds=20),
            trigger=IntervalTrigger(seconds=300, start_date=datetime.now(ZoneInfo('Asia/Seoul'))),
            id='crawling_start',
            misfire_grace_time=None,
            max_instances=5,
            args=(db,)
        )
        return {"result": "good"}

    def cancel(self):
        # 작업 취소
        Scheduler.main_scheduler.remove_job('crawling_start')
        return {"result": "good"}

    def follower_start(self, db: Session):
        Scheduler.main_scheduler.add_job(
            CrawlingBusiness().follow_crawling,
            # trigger=IntervalTrigger(seconds=30),
            # trigger=IntervalTrigger(seconds=600, start_date=datetime.now(ZoneInfo('Asia/Seoul'))),
            trigger=CronTrigger(hour=0, minute=0),
            misfire_grace_time=None,
            max_instances=5,
            id='follower_start',
            args=(db,)
        )
        return {"result": "good"}

    def follower_cancel(self):
        # 작업 취소
        Scheduler.main_scheduler.remove_job('follower_start')
        return {"result": "good"}