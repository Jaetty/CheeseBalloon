from sqlalchemy.orm import Session

from services.streamers import StreamerService
from services.streamer_logs import StreamerLogService
from services.categories import CategoryService

from schemas.streamers import StreamerCreate
from schemas.categories import CategoryCreate
from schemas.lives import LiveCreate

from crawling import Crawling


class CrawlingBusiness:
    def crawling(self, db: Session):

        streamer_list = Crawling().afreeca()

        for streamer_info in streamer_list:

            if not CategoryService().get_category(db=db, category=streamer_info.category):
                print("카테고리 데이터 넣기")
                categories = CategoryCreate(
                    category=streamer_info.category
                )
                CategoryService().create(db=db, category=categories)

            if not StreamerService().is_streamer(db=db, origin_id=streamer_info.origin_id):
                print("스트리머 데이터 넣기")
                streamer = StreamerCreate(
                    origin_id=streamer_info.origin_id,
                    name=streamer_info.name,
                    profile_url=streamer_info.profile_url,
                    channel_url=streamer_info.channel_url,
                    platform="A"
                )
                StreamerService().create(db=db, streamer=streamer)
            streamer_id = StreamerService().get_streamer(db=db, origin_id=streamer_info.origin_id)
            print("스트리머 로그 데이터 넣기")
            StreamerLogService().create(db=db, follower=streamer_info.follower, streamer_id=streamer_id)

            print("라이브 데이터 넣기")
            # 라이브가 있다면 라이브 로그 넣기
            # 라이브가 없다면 라이브 추가하고 라이브 로그 넣기
            # 이전 라이브 로그는 있었는데 현재 라이브 목록에는 없다면..? <- 끝나고 체크해야할듯..
            live = LiveCreate(
                streamer_id= streamer_id,
                streamer_url= streamer_info.stream_url,
                thumbnail_url= streamer_info.thumbnail_url,
                start_dt= streamer_info.start_dt
            )

        return {"result": "good"}
