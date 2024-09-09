from datetime import datetime
from typing import List
from schemas.streamer_info import StreamerInfo, StreamerInfoUpdate
from schemas.streamers import StreamerRead
from loguru import logger
import httpx


class Chzzk:
    async def init_live(self):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36",
                "Cookie": "NID_AUT=I58Oif+3Btp/hYwcTgTlJAXgMWfkYspueOc2OmZoHaEFtMBaD2xxzTpKAbTEngm/;" +
                          "NID_SES=AAABtMwu8y9tY3HFKfSjls8xog+irUnRjolMWKVo1oBUxL/sBFwrJ1G8zP4cdS9Bp" +
                          "oqQbAkZa84I7oaD4LnxM3re2P5m38r4KNgc5PmWzYxEqrpZy0Q5RJ+qR6mJaUErEdkXS6GQNZYMNSot" +
                          "BIQeze0/dW9mB/rPEqQXqzmka9I8qb7gOBsTul1sEn+AGYxBvtPUZ37jQrH6HVmP7oNWbYfYgoW6JNZ8FZ" +
                          "XgRICIws+7iAi2os4dny6FXO3epC/x+wc+haIlE+CMalMNSs4ZbfwK/4BzdWssbD9O8SOpxKCZAFrisgoWaj9" +
                          "9ZwtCwd3m3P6hMl7mYQ004XhTUTIcY+1EWOwPNj+zay4AdE+GMNAmYCdmKCsUnUSLEIvVXHkhKWr9cz0w99J" +
                          "suGliyG7ETAJsZSwF6pGncDsL608pw7o3/O7gzfK17hQLqAEpUpOdZ0EHoFPseMwUv6sUHwQuBqUTmHV9jqC" +
                          "QZ3GpjQ9KefjgwlK3rDGbnAo8akseBS52QMh6eTBZTRpov05fkdpkgB0ItYMkp0ExpLzYWSxyfCd+aT0YlG2t" +
                          "Hit2IgkWvyU4qCukdyEULnAaO/Z1Tg3mCu+emoU=;"
            }
            res = await client.get('https://api.chzzk.naver.com/service/v1/lives?size=50&sortType=POPULAR',
                                   headers=headers)
            return res.json()

    async def more_live(self, concurrent_user_count: int, live_id: int):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36",
                "Cookie": "NID_AUT=I58Oif+3Btp/hYwcTgTlJAXgMWfkYspueOc2OmZoHaEFtMBaD2xxzTpKAbTEngm/;" +
                          "NID_SES=AAABtMwu8y9tY3HFKfSjls8xog+irUnRjolMWKVo1oBUxL/sBFwrJ1G8zP4cdS9Bp" +
                          "oqQbAkZa84I7oaD4LnxM3re2P5m38r4KNgc5PmWzYxEqrpZy0Q5RJ+qR6mJaUErEdkXS6GQNZYMNSot" +
                          "BIQeze0/dW9mB/rPEqQXqzmka9I8qb7gOBsTul1sEn+AGYxBvtPUZ37jQrH6HVmP7oNWbYfYgoW6JNZ8FZ" +
                          "XgRICIws+7iAi2os4dny6FXO3epC/x+wc+haIlE+CMalMNSs4ZbfwK/4BzdWssbD9O8SOpxKCZAFrisgoWaj9" +
                          "9ZwtCwd3m3P6hMl7mYQ004XhTUTIcY+1EWOwPNj+zay4AdE+GMNAmYCdmKCsUnUSLEIvVXHkhKWr9cz0w99J" +
                          "suGliyG7ETAJsZSwF6pGncDsL608pw7o3/O7gzfK17hQLqAEpUpOdZ0EHoFPseMwUv6sUHwQuBqUTmHV9jqC" +
                          "QZ3GpjQ9KefjgwlK3rDGbnAo8akseBS52QMh6eTBZTRpov05fkdpkgB0ItYMkp0ExpLzYWSxyfCd+aT0YlG2t" +
                          "Hit2IgkWvyU4qCukdyEULnAaO/Z1Tg3mCu+emoU=;"
            }

            res = await client.get(f'https://api.chzzk.naver.com/service/v1/lives?' +
                                   f'concurrentUserCount={concurrent_user_count}&' +
                                   f'liveId={live_id}&size=50&sortType=POPULAR',
                                   headers=headers)
            return res.json()

    async def follower(self, streamers: list):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36",
                "Cookie": "NID_AUT=I58Oif+3Btp/hYwcTgTlJAXgMWfkYspueOc2OmZoHaEFtMBaD2xxzTpKAbTEngm/;" +
                          "NID_SES=AAABtMwu8y9tY3HFKfSjls8xog+irUnRjolMWKVo1oBUxL/sBFwrJ1G8zP4cdS9Bp" +
                          "oqQbAkZa84I7oaD4LnxM3re2P5m38r4KNgc5PmWzYxEqrpZy0Q5RJ+qR6mJaUErEdkXS6GQNZYMNSot" +
                          "BIQeze0/dW9mB/rPEqQXqzmka9I8qb7gOBsTul1sEn+AGYxBvtPUZ37jQrH6HVmP7oNWbYfYgoW6JNZ8FZ" +
                          "XgRICIws+7iAi2os4dny6FXO3epC/x+wc+haIlE+CMalMNSs4ZbfwK/4BzdWssbD9O8SOpxKCZAFrisgoWaj9" +
                          "9ZwtCwd3m3P6hMl7mYQ004XhTUTIcY+1EWOwPNj+zay4AdE+GMNAmYCdmKCsUnUSLEIvVXHkhKWr9cz0w99J" +
                          "suGliyG7ETAJsZSwF6pGncDsL608pw7o3/O7gzfK17hQLqAEpUpOdZ0EHoFPseMwUv6sUHwQuBqUTmHV9jqC" +
                          "QZ3GpjQ9KefjgwlK3rDGbnAo8akseBS52QMh6eTBZTRpov05fkdpkgB0ItYMkp0ExpLzYWSxyfCd+aT0YlG2t" +
                          "Hit2IgkWvyU4qCukdyEULnAaO/Z1Tg3mCu+emoU=;"
            }
            streamer_follower_list = []
            for s in streamers:
                # print(s.origin_id)
                response = await client.get(f'https://api.chzzk.naver.com/service/v1/channels/{s.origin_id}',
                                            headers=headers)
                res = response.json()
                if res['code'] != '200':
                    continue
                follower_text = res['content']['followerCount']
                follower_cnt = int(follower_text)

                streamer_profile = res['content']['channelImageUrl']
                if s.profile_url == streamer_profile:
                    streamer_profile = None

                streamer_name = res['content']['channelName']
                if s.name == streamer_name:
                    streamer_name = None

                streamer_follower_list.append(StreamerInfoUpdate(
                    streamer_id=s.streamer_id,
                    profile_url=streamer_profile,
                    name=streamer_name,
                    follower=follower_cnt
                ))

        return streamer_follower_list

    async def streamer_info(self, origin_id: str):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36",
                "Cookie": "NID_AUT=I58Oif+3Btp/hYwcTgTlJAXgMWfkYspueOc2OmZoHaEFtMBaD2xxzTpKAbTEngm/;" +
                          "NID_SES=AAABtMwu8y9tY3HFKfSjls8xog+irUnRjolMWKVo1oBUxL/sBFwrJ1G8zP4cdS9Bp" +
                          "oqQbAkZa84I7oaD4LnxM3re2P5m38r4KNgc5PmWzYxEqrpZy0Q5RJ+qR6mJaUErEdkXS6GQNZYMNSot" +
                          "BIQeze0/dW9mB/rPEqQXqzmka9I8qb7gOBsTul1sEn+AGYxBvtPUZ37jQrH6HVmP7oNWbYfYgoW6JNZ8FZ" +
                          "XgRICIws+7iAi2os4dny6FXO3epC/x+wc+haIlE+CMalMNSs4ZbfwK/4BzdWssbD9O8SOpxKCZAFrisgoWaj9" +
                          "9ZwtCwd3m3P6hMl7mYQ004XhTUTIcY+1EWOwPNj+zay4AdE+GMNAmYCdmKCsUnUSLEIvVXHkhKWr9cz0w99J" +
                          "suGliyG7ETAJsZSwF6pGncDsL608pw7o3/O7gzfK17hQLqAEpUpOdZ0EHoFPseMwUv6sUHwQuBqUTmHV9jqC" +
                          "QZ3GpjQ9KefjgwlK3rDGbnAo8akseBS52QMh6eTBZTRpov05fkdpkgB0ItYMkp0ExpLzYWSxyfCd+aT0YlG2t" +
                          "Hit2IgkWvyU4qCukdyEULnAaO/Z1Tg3mCu+emoU=;"
            }
            response = await client.get(f'https://api.chzzk.naver.com/service/v1/channels/{origin_id}',
                                        headers=headers)

            return response.json()

    async def chzzk(self):
        logger.info("치지직 크롤링을 시작합니다.")
        # StreamerInfo 객체 저장 딕셔너리 생성
        streamers_dict = {}

        live_list = await self.init_live()
        concurrent_user_count = live_list['content']['page']['next']['concurrentUserCount']
        live_id = live_list['content']['page']['next']['liveId']
        item_list = live_list['content']['data']

        for new_item in item_list:
            if new_item['liveImageUrl'] is None:
                continue
            profile = str(new_item['channel']['channelImageUrl'])
            if profile is None:
                profile = "default"
            streamer_info = StreamerInfo(
                origin_id=str(new_item['channel']['channelId']),
                name=str(new_item['channel']['channelName']),
                profile_url=profile,
                channel_url=f"https://chzzk.naver.com/{new_item['channel']['channelId']}",
                platform="C",
                stream_url=f"https://chzzk.naver.com/live/{new_item['channel']['channelId']}",
                live_origin_id=int(new_item['liveId']),
                live_start=datetime.strptime(new_item['openDate'], '%Y-%m-%d %H:%M:%S'),
                thumbnail_url=str(new_item['liveImageUrl']).format(type=480),
                category=str(new_item['liveCategoryValue']),
                title=str(new_item['liveTitle']),
                viewer_cnt=int(new_item['concurrentUserCount'])
            )
            streamers_dict[streamer_info.live_origin_id] = streamer_info

        # live_id를 키로 하는 딕셔너리로 변환
        # live_dict = {item["liveId"]: item for item in item_list}

        while concurrent_user_count >= 20:
            new_list = await self.more_live(concurrent_user_count, live_id)
            concurrent_user_count = new_list['content']['page']['next']['concurrentUserCount']
            live_id = new_list['content']['page']['next']['liveId']
            streamer_item_list = new_list['content']['data']

            for new_item in streamer_item_list:
                if new_item['liveImageUrl'] is None:
                    continue
                concurrent_user_count = int(new_item['concurrentUserCount'])
                if concurrent_user_count < 20:
                    break
                new_profile = str(new_item['channel']['channelImageUrl'])
                if not new_profile:
                    new_profile = "default"
                streamer_info = StreamerInfo(
                    origin_id=str(new_item['channel']['channelId']),
                    name=str(new_item['channel']['channelName']),
                    profile_url=new_profile,
                    channel_url=f"https://chzzk.naver.com/{new_item['channel']['channelId']}",
                    platform="C",
                    stream_url=f"https://chzzk.naver.com/live/{new_item['channel']['channelId']}",
                    live_origin_id=int(new_item['liveId']),
                    live_start=datetime.strptime(new_item['openDate'], '%Y-%m-%d %H:%M:%S'),
                    thumbnail_url=str(new_item['liveImageUrl']).format(type=480),
                    category=str(new_item['liveCategoryValue']),
                    title=str(new_item['liveTitle']),
                    viewer_cnt=int(new_item['concurrentUserCount'])
                )
                streamers_dict[streamer_info.live_origin_id] = streamer_info

        streamers_list = list(streamers_dict.values())
        # print(tabulate(streamers_list, headers=["origin_id", "name", "profile_url", "channel_url", "platform", "stream_url", "live_origin_id", "thumbnail_url", "category", "title", "viewer_cnt"]))
        # print(streamers_list)
        logger.info("치지직 크롤링을 끝냅니다.")
        return streamers_list

    async def chzzk_follower(self, streamers: List[StreamerRead]):
        # streamer_follower_list = []
        logger.info("치지직 팔로우 크롤링 시작합니다.")
        streamer_follower_list = await self.follower(streamers)
        logger.info("치지직 팔로우 크롤링 끝냅니다.")
        # print(streamer_follower_list)
        return streamer_follower_list

    async def chzzk_profile(self, streamer: StreamerRead):
        res = await self.streamer_info(streamer.origin_id)
        if res['code'] == '200':
            streamer_profile = res['content']['channelImageUrl']
            return streamer_profile
        else:
            return None
