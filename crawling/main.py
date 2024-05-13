from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from config.database import engine, Base, get_db
from businesses.crawling import CrawlingBusiness
from businesses.streamers import StreamerBusiness
from schedulers.crawlers import Scheduler
from crawlings.soop import Soop
from crawlings.chzzk import Chzzk
from schemas.streamers import StreamerUpdate

Base.metadata.create_all(bind=engine)
app = FastAPI()


# app.include_router(users.router)

@app.on_event("startup")
async def startup_scheduler():
    db = next(get_db())
    Scheduler().start(db=db)
    Scheduler().follower_start(db=db)


@app.get("/")
async def base_get_route():
    return {"message": "hello world"}


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


# @app.get("/soop")
# async def start_afreeca_crawling():
#     await Soop().soop()
#     return {"soop":"good"}
#
# @app.get("/chzzk")
# async def start_chzzk_crawling(db: Session = Depends(get_db)):
#     Crawling().chzzk(db=db)
#     return {"chzzk":"good"}

@app.get("/chzzkapi")
async def start_chzzk_api():
    await Chzzk().chzzk()
    return {"chzzk": "good"}


@app.get("/soopapi")
async def soop_api():
    await Soop().soop()
    return {"message": "hello world"}


@app.post("/cl/profile/update")
async def update_streamer_profile(streamer: StreamerUpdate, db: Session = Depends(get_db)):
    profile = await StreamerBusiness().update_profile(streamer=streamer, db=db)
    return profile
