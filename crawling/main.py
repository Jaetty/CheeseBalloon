from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from config.database import engine, Base, get_db
from businesses.streamers import StreamerBusiness
from businesses.crawling import CrawlingBusiness
from schedulers.crawlers import Scheduler
from schemas.streamers import StreamerCreate, StreamerRead
from models.streamer_logs import StreamerLog
from schemas.streamer_logs import StreamerLogCreate, StreamerLogRead
from crawling import Crawling
from crawlings.soop import Soop
from crawlings.chzzk import Chzzk
from apscheduler.schedulers.asyncio import AsyncIOScheduler
# from controllers import users


Base.metadata.create_all(bind=engine)

app = FastAPI()
# app.include_router(users.router)

# scheduler = AsyncIOScheduler(timezone='Asia/Seoul')  # 백그라운드로 실행하기 위해 선언
# scheduler.start()

@app.get("/")
async def base_get_route():
    return {"message": "hello world"}

@app.post("/streamers/", response_model=StreamerRead)
async def create_streamer(streamer: StreamerCreate, db: Session = Depends(get_db)):
    return StreamerBusiness().create(db=db, streamer=streamer)

@app.post("/streamer_logs", response_model=StreamerLogRead)
async def create_streamer_log(streamer_log: StreamerLogCreate, db: Session = Depends(get_db)):
    db_streamer_log = StreamerLog(
        streamer_id=streamer_log.streamer_id,
        follower=streamer_log.follower,
    )
    db.add(db_streamer_log)
    db.commit()
    db.refresh(db_streamer_log)
    return db_streamer_log

@app.get("/crawling")
async def start_crawling(db: Session = Depends(get_db)):
    return await CrawlingBusiness().crawling(db=db)

@app.get("/scheduler")
async def start_scheduler_crawling(db: Session = Depends(get_db)):
    return Scheduler().start(db=db)

@app.get("/cancel_scheduler")
async def cancel_scheduler_crawling():
    return Scheduler().cancel()

@app.get("/follower_scheduler")
async def start_scheduler_crawling(db: Session = Depends(get_db)):
    return Scheduler().follower_start(db=db)

@app.get("/cancel_follower_scheduler")
async def cancel_scheduler_crawling():
    return Scheduler().follower_cancel()



@app.get("/follower_crawling")
async def follower_crawling(db: Session = Depends(get_db)):
    return await CrawlingBusiness().follow_crawling(db=db)


@app.get("/soop")
async def start_afreeca_crawling():
    Soop().soop
    return {"soop":"good"}

@app.get("/chzzk")
async def start_chzzk_crawling(db: Session = Depends(get_db)):
    Crawling().chzzk(db=db)
    return {"chzzk":"good"}

@app.get("/chzzkapi")
async def start_chzzk_api():
    await Chzzk().chzzk()
    return {"chzzk": "good"}