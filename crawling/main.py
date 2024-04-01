from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from config.database import engine, Base, get_db
from businesses.streamers import StreamerBusiness
from businesses.crawling import CrawlingBusiness
from schemas.streamers import StreamerCreate, StreamerRead
from models.streamer_logs import StreamerLog
from schemas.streamer_logs import StreamerLogCreate, StreamerLogRead
from crawling import Crawling
from crawlings.soop import Soop
# from controllers import users


Base.metadata.create_all(bind=engine)

app = FastAPI()
# app.include_router(users.router)


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
    return CrawlingBusiness().crawling(db=db)

@app.get("/soop")
async def start_afreeca_crawling():
    Soop().soop()
    return {"soop":"good"}

@app.get("/chzzk")
async def start_chzzk_crawling(db: Session = Depends(get_db)):
    Crawling().chzzk(db=db)
    return {"chzzk":"good"}