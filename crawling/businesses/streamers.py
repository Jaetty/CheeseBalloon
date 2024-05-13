from sqlalchemy.orm import Session

from services.streamers import StreamerService
from schemas.streamers import StreamerCreate, StreamerUpdate
from loguru import logger

from crawlings.chzzk import Chzzk
from crawlings.soop import Soop


class StreamerBusiness:
    def create(self, streamer: StreamerCreate, db: Session):
        return StreamerService().create(db=db, streamer=streamer)

    async def update_profile(self, streamer: StreamerUpdate, db: Session):
        streamer = StreamerService().get_streamer_by_id(db=db, streamer_id=streamer.streamer_id)
        if streamer is None:
            logger.error("streamer가 없습니다.")
            return None
        streamer_profile = streamer.profile_url
        # 치지직인 경우
        if streamer.platform is "C":
            streamer_profile = Chzzk().chzzk_profile(streamer)
        if streamer.platform is "S":
            streamer_profile = Soop().soop_profile(streamer)

        StreamerService().update_profile(db=db, streamer_id=streamer.streamer_id, profile_url=streamer_profile)
        return streamer_profile
