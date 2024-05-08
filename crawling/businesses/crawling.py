import datetime
from typing import List
from loguru import logger
from sqlalchemy.orm import Session

from schemas.streamer_info import StreamerInfo
from schemas.streamer_logs import StreamerLogCreate
from services.streamers import StreamerService
from services.streamer_logs import StreamerLogService
from services.categories import CategoryService
from services.lives import LiveService
from services.live_logs import LiveLogService
from services.cycle_logs import CycleLogService

from schemas.streamers import StreamerCreate
from schemas.categories import CategoryCreate
from schemas.lives import LiveCreate
from schemas.live_logs import LiveLogCreate
from schemas.cycle_logs import CycleLogCreate

from crawlings.soop import Soop
from crawlings.chzzk import Chzzk


class CrawlingBusiness:
    async def crawling(self, db: Session):
        logger.info("크롤링 시작합니다.")
        start_time = datetime.datetime.now()
        try:
            streamers_list = []
            live_id_list = []
            # 아
            streamers_list.extend(await Soop().soop())
            streamers_list.extend(await Chzzk().chzzk())

            logger.info("데이터 입력이 시작됩니다.")

            cycle = CycleLogCreate(
                afreeca_viewer_cnt=sum(item.viewer_cnt for item in streamers_list if item.platform == "S"),
                chzzk_viewer_cnt=sum(item.viewer_cnt for item in streamers_list if item.platform == "C"),
            )
            cycle_id = CycleLogService().create(db=db, cycle_log=cycle).cycle_log_id
            for streamer_info in streamers_list:
                if streamer_info.category is not None:
                    category_id = CategoryService().is_category(db=db, category=streamer_info.category)
                    if category_id is None:
                        # print("카테고리 데이터 넣기")
                        categories = CategoryCreate(
                            category=streamer_info.category
                        )
                        CategoryService().create(db=db, category=categories)
                else:
                    category_id = None

                if not StreamerService().is_streamer(db=db, origin_id=streamer_info.origin_id):
                    # print("스트리머 데이터 넣기")
                    if streamer_info.profile_url is None:
                        streamer_info.profile_url = "default"
                    streamer = StreamerCreate(
                        origin_id=streamer_info.origin_id,
                        name=streamer_info.name,
                        profile_url=streamer_info.profile_url,
                        channel_url=streamer_info.channel_url,
                        platform=streamer_info.platform
                    )
                    StreamerService().create(db=db, streamer=streamer)
                streamer_id = StreamerService().get_streamer(db=db, origin_id=streamer_info.origin_id)
                # print("스트리머 로그 데이터 넣기")
                # StreamerLogService().create(db=db, follower=streamer_info.follower, streamer_id=streamer_id)

                # 라이브가 있다면 라이브 로그 넣기
                # 라이브가 없다면 라이브 추가하고 라이브 로그 넣기
                # 이전 라이브 로그는 있었는데 현재 라이브 목록에는 없다면..? <- 끝나고 체크해야할듯..
                # 라이브가 없다면 라이브 추가
                if not LiveService().is_live(db=db, streamer_id=streamer_id,
                                             live_origin_id=streamer_info.live_origin_id):
                    # print("라이브 데이터 넣기")
                    live = LiveCreate(
                        streamer_id=streamer_id,
                        live_origin_id=streamer_info.live_origin_id,
                        stream_url=streamer_info.stream_url,
                        thumbnail_url=streamer_info.thumbnail_url,
                        is_live=True
                    )
                    LiveService().create(db=db, live=live)
                live_id = LiveService().get_live(db=db, streamer_id=streamer_id,
                                                 live_origin_id=streamer_info.live_origin_id)
                live_id_list.append(live_id)
                # print("라이브 로그 데이터 넣기")
                live_log = LiveLogCreate(
                    live_id=live_id,
                    cycle_log_id=cycle_id,
                    category_id=category_id,
                    title=streamer_info.title,
                    viewer_cnt=streamer_info.viewer_cnt
                )
                LiveLogService().create(db=db, live_log=live_log)
            logger.info("데이터 입력이 종료됩니다.")
            logger.info("라이브 상태를 업데이트 합니다.")
            if cycle_id != 1:
                end_live_list = LiveLogService().get_end_live_id(db=db, cycle_log_id=cycle_id-1, live_list=live_id_list)
                LiveService().update_is_live(db=db, live_list=end_live_list)
                logger.info("업데이트 완료")

        except Exception as e:
            logger.error(e)
        end_time = datetime.datetime.now()
        logger.info("크롤링 완료되었습니다. 소요 시간 : " + str(end_time - start_time))
        return {"result": "good"}

    async def follow_crawling(self, db: Session):
        logger.info("팔로우 크롤링 시작합니다.")
        start_time = datetime.datetime.now()
        try:
            soop_streamers = StreamerService().get_streamers_per_platform(db=db, platform="S")
            chzzk_streamers = StreamerService().get_streamers_per_platform(db=db, platform="C")
            soop_followers = await Soop().soop_follower(streamers=soop_streamers)
            chzzk_followers = await Chzzk().chzzk_follower(streamers=chzzk_streamers)
            followers_list = []
            followers_list.extend(soop_followers)
            followers_list.extend(chzzk_followers)
            # List[StreamerLogCreate] = soop_followers.extend(chzzk_followers)

            for f in followers_list:
                # print("넣을게")
                StreamerLogService().create(db=db, follower=f.follower, streamer_id=f.streamer_id)
            # print(chzzk_followers)
        except Exception as e:
            print(e)
        end_time = datetime.datetime.now()
        logger.info("팔로우 크롤링 완료되었습니다. 소요 시간 : " + str(end_time - start_time))

        return {"result": "good"}