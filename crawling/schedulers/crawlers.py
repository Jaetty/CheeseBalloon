# from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.asyncio import AsyncIOScheduler
# from apscheduler.jobstores.base import JobLookupError
from sqlalchemy.orm import Session
from businesses.crawling import CrawlingBusiness


class Scheduler:
    async def crawling(self, db: Session):
        print("크롤링을 시작합니다.")
        await CrawlingBusiness().crawling(db=db)
        print("크롤링을 완료헀습니다.")
        return {"result": "good"}

    def start(self, db: Session):
        scheduler = AsyncIOScheduler(timezone='Asia/Seoul')  # 백그라운드로 실행하기 위해 선언
        scheduler.start()
        scheduler.add_job(self.crawling, 'interval', seconds=1200, id='crawling_start', args=(db,))
        return {"result": "good"}
