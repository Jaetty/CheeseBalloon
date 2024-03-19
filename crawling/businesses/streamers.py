from sqlalchemy.orm import Session

from services.streamers import StreamerService
from schemas.streamers import StreamerCreate

class StreamerBusiness:
    def create(self, streamer: StreamerCreate, db: Session):
        return StreamerService().create(db=db, streamer=streamer)