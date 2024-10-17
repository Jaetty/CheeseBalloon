from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from schemas.streamer_info import StreamerInfo, StreamerInfoUpdate

from loguru import logger
from typing import List
import re

from schemas.streamer_logs import StreamerLogCreate
from schemas.streamers import StreamerRead

import httpx
import json


# import os


class Soop:

    async def follower(self, streamers: list):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36"
            }

            streamer_follower_list = []
            logger.info("아프리카 팔로우 크롤링 시작합니다.")
            for s in streamers:
                response = await client.get(f'https://chapi.sooplive.co.kr/api/{s.origin_id}/station',
                                            headers=headers)
                res = response.json()
                if 'station' not in res:
                    logger.info("밴 먹은 유저 입니다.")
                    continue
                follower_text = res['station']['upd']['fan_cnt']
                follower_cnt = int(follower_text)
                # print(follower_cnt)

                streamer_profile = f'https:{res["profile_image"]}'
                if s.profile_url == streamer_profile:
                    streamer_profile = None

                streamer_name = res['station']['user_nick']
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
            }
            response = await client.get(f'https://chapi.sooplive.co.kr/api/{origin_id}/station',
                                        headers=headers)
            return response.json()

    async def init_live(self):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36",
                "Cookie": "PdboxTicket=.A32.7bbT56vyHM9fKZk.i1X9lq4v4APFEnNAH9ECmsFD2jSi63FL3X37NJADn8YDqUflh7arD_f3" +
                          "f0qdIiYeSYnt4YTpqu7v__WZKFrwxU57x0aecFzYuZWM5V1cQbsNiPo8MTbUA1yUU7noI2v9h8XcRn1aMv5LjSY3l" +
                          "qnOnFw-6ZaoiRE0nCyU8R5D8r2IuK52xOS0ByS57SG1DLVbojL9i_rClu1rE4HvlkNRh_aJ9XPNAsKXwKX-H59L0x" +
                          "qDdxuxE1AdS0rcNxL5ZrBeWnPaD3wVzA6P2PXl5IvBBgaWU7bDMc73PBT2yx5IHrcOKzWwPmPE3LYkkc_tytXn3ZL" +
                          "Efamh8Wk6YjBdyDz-tyMzSdfSIoIH5tSqTemNlyeSHRyiUiKctVDqIQ2QXAv4sg6Mk-T5oxaXUueZeG8BA4AHo9-T" +
                          "CVj_yATeDsJOKCp2mJJZhaktZRee3nJ2DYRc_MyOtYj8Fj34tyur20nxmIxUPnbaavYzIxSvwkfWh0tGqYM4V5wKc" +
                          "2FAMVZv1rQxYVpkqHKoQsmYt4oTexxYSeyeOsiM2uXVEiHoccYNUoFRcJm5sAnQDc73aqlroH_C; PdboxBbs=rud" +
                          "gns8285; PdboxUser=uid%3Drudgns8285%26uno%3D47695692%26age%3D0%26sex%3DC%26A%3DACA%26B%3D" +
                          "BCAA%26unick%3Drudgns8285%26apply_date%3D1711949431%26name_chk%3D1%26sess_adult_chk%3D0%2" +
                          "6broad_name_chk%3D0%26change_password%3D%26chnnl_cd%3D23%26chnnl_name_chk%3D0; isBbs=1;"
            }
            res = await client.get('https://live.sooplive.co.kr/api/main_broad_list_api.php?selectType=action&' +
                                   'selectValue=all&orderType=view_cnt&pageNo=1&lang=ko_KR&_=1714723094228',
                                   headers=headers)
            content = res.text

            # JSONP 응답에서 순수 JSON 부분만 추출
            start = content.find('{')  # JSON 시작 위치 찾기
            end = content.rfind('}')  # JSON 종료 위치 찾기
            json_str = content[start:end + 1]  # JSON 문자열 추출

            # JSON 문자열을 파이썬 사전으로 변환
            data = json.loads(json_str)
            return data

    async def more_live(self, page_no: int):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36",
                "Cookie": "PdboxTicket=.A32.7bbT56vyHM9fKZk.i1X9lq4v4APFEnNAH9ECmsFD2jSi63FL3X37NJADn8YDqUflh7arD_f3" +
                          "f0qdIiYeSYnt4YTpqu7v__WZKFrwxU57x0aecFzYuZWM5V1cQbsNiPo8MTbUA1yUU7noI2v9h8XcRn1aMv5LjSY3l" +
                          "qnOnFw-6ZaoiRE0nCyU8R5D8r2IuK52xOS0ByS57SG1DLVbojL9i_rClu1rE4HvlkNRh_aJ9XPNAsKXwKX-H59L0x" +
                          "qDdxuxE1AdS0rcNxL5ZrBeWnPaD3wVzA6P2PXl5IvBBgaWU7bDMc73PBT2yx5IHrcOKzWwPmPE3LYkkc_tytXn3ZL" +
                          "Efamh8Wk6YjBdyDz-tyMzSdfSIoIH5tSqTemNlyeSHRyiUiKctVDqIQ2QXAv4sg6Mk-T5oxaXUueZeG8BA4AHo9-T" +
                          "CVj_yATeDsJOKCp2mJJZhaktZRee3nJ2DYRc_MyOtYj8Fj34tyur20nxmIxUPnbaavYzIxSvwkfWh0tGqYM4V5wKc" +
                          "2FAMVZv1rQxYVpkqHKoQsmYt4oTexxYSeyeOsiM2uXVEiHoccYNUoFRcJm5sAnQDc73aqlroH_C; PdboxBbs=rud" +
                          "gns8285; PdboxUser=uid%3Drudgns8285%26uno%3D47695692%26age%3D0%26sex%3DC%26A%3DACA%26B%3D" +
                          "BCAA%26unick%3Drudgns8285%26apply_date%3D1711949431%26name_chk%3D1%26sess_adult_chk%3D0%2" +
                          "6broad_name_chk%3D0%26change_password%3D%26chnnl_cd%3D23%26chnnl_name_chk%3D0; isBbs=1;"
            }
            res = await client.get('https://live.sooplive.co.kr/api/main_broad_list_api.php?selectType=action&' +
                                   f'selectValue=all&orderType=view_cnt&pageNo={page_no}&lang=ko_KR&_=1714723094228',
                                   headers=headers)
            content = res.text

            # JSONP 응답에서 순수 JSON 부분만 추출
            start = content.find('{')  # JSON 시작 위치 찾기
            end = content.rfind('}')  # JSON 종료 위치 찾기
            json_str = content[start:end + 1]  # JSON 문자열 추출

            # JSON 문자열을 파이썬 사전으로 변환
            data = json.loads(json_str)
            return data

    async def broad_category(self):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36"
            }
            res = await client.get('https://live.sooplive.co.kr/script/locale/ko_KR/broad_category.js',
                                   headers=headers)
            content = res.text

            # JSONP 응답에서 순수 JSON 부분만 추출
            start = content.find('{')  # JSON 시작 위치 찾기
            end = content.rfind('}')  # JSON 종료 위치 찾기
            json_str = content[start:end + 1]  # JSON 문자열 추출

            # JSON 문자열을 파이썬 사전으로 변환
            data = json.loads(json_str)
            return data

    def make_category_map(self, category_list: list):
        map_category = dict()
        for category in category_list:
            map_category[category['cate_no']] = category['cate_name']
            if category['child'] is not None:
                for child_category in category['child']:
                    map_category[child_category['cate_no']] = child_category['cate_name']

        return map_category

    async def soop(self):
        logger.info("아프리카 크롤링을 시작합니다.")
        category = await self.broad_category()
        category_list = category['CHANNEL']['BROAD_CATEGORY']
        map_category = self.make_category_map(category_list)
        streamer_list = []
        live_list = await self.init_live()
        item_list = live_list['broad']
        cur_cnt = 0
        for new_item in item_list:
            if new_item['broad_cate_no'] == '00730000':
                cate = "파리올림픽"
            else:
                cate = str(map_category[new_item['broad_cate_no']])
            # logger.info(print(type(new_item['broad_cate_no'])))
            streamer_info = StreamerInfo(
                origin_id=str(new_item['user_id']),
                name=str(new_item['user_nick']),
                profile_url=f"https://profile.img.sooplive.co.kr/LOGO/{new_item['user_id'][0:2]}/{new_item['user_id']}" +
                            f"/{new_item['user_id']}.jpg",
                channel_url=f"https://ch.sooplive.co.kr/{new_item['user_id']}",
                platform="S",
                stream_url=f"https://play.sooplive.co.kr/{new_item['user_id']}/{new_item['broad_no']}",
                live_origin_id=int(new_item['broad_no']),
                live_start=datetime.strptime(new_item['broad_start'], '%Y-%m-%d %H:%M:%S'),
                thumbnail_url=str(new_item['broad_thumb']),
                category=cate,
                title=str(new_item['broad_title']),
                viewer_cnt=int(new_item['total_view_cnt'])
            )
            cur_cnt = int(new_item['total_view_cnt'])
            streamer_list.append(streamer_info)
        page_no = 2
        while cur_cnt >= 50:
            new_list = await self.more_live(page_no)
            page_no += 1
            new_item_list = new_list['broad']
            for new_item in new_item_list:
                cur_cnt = int(new_item['total_view_cnt'])
                if cur_cnt < 50:
                    break

                if new_item['broad_cate_no'] == '00730000':
                    cate = "파리올림픽"
                else:
                    cate = str(map_category[new_item['broad_cate_no']])

                streamer_info = StreamerInfo(
                    origin_id=str(new_item['user_id']),
                    name=str(new_item['user_nick']),
                    profile_url=f"https://profile.img.sooplive.co.kr/LOGO/{new_item['user_id'][0:2]}/{new_item['user_id']}" +
                                f"/m/{new_item['user_id']}.webp",
                    channel_url=f"https://ch.sooplive.co.kr/{new_item['user_id']}",
                    platform="S",
                    stream_url=f"https://play.sooplive.co.kr/{new_item['user_id']}/{new_item['broad_no']}",
                    live_origin_id=int(new_item['broad_no']),
                    live_start=datetime.strptime(new_item['broad_start'], '%Y-%m-%d %H:%M:%S'),
                    thumbnail_url=str(new_item['broad_thumb']),
                    category=cate,
                    title=str(new_item['broad_title']),
                    viewer_cnt=int(new_item['total_view_cnt'])
                )
                streamer_list.append(streamer_info)

        # print(streamer_list)
        logger.info("아프리카 크롤링을 종료합니다.")
        return streamer_list

    async def soop_follower(self, streamers: List[StreamerRead]):

        logger.info("아프리카 팔로우 크롤링 시작합니다.")
        streamer_follower_list = await self.follower(streamers)
        logger.info("아프리카 팔로우 크롤링을 끝냅니다.")
        return streamer_follower_list

    async def soop_profile(self, streamer: StreamerRead):
        res = await self.streamer_info(streamer.origin_id)
        streamer_profile = res['profile_image']
        return streamer_profile
