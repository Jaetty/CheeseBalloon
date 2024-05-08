from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from schemas.streamer_info import StreamerInfo

from loguru import logger
from typing import List
import re

from schemas.streamer_logs import StreamerLogCreate
from schemas.streamers import StreamerRead

import httpx
import json

# import os


class Soop:

    async def follower(self, origin_id: str):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36"
            }
            res = await client.get(f'https://bjapi.afreecatv.com/api/{origin_id}/station',
                                   headers=headers)
            return res.json()

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
            res = await client.get('https://live.afreecatv.com/api/main_broad_list_api.php?' +
                                   'callback=jQuery110208194747818255699_1715133203459&selectType=action&' +
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
            res = await client.get('https://live.afreecatv.com/api/main_broad_list_api.php?' +
                                   'callback=jQuery110208194747818255699_1715133203459&selectType=action&' +
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
            res = await client.get('https://live.afreecatv.com/script/locale/ko_KR/broad_category.js',
                                   headers=headers)
            content = res.text

            # JSONP 응답에서 순수 JSON 부분만 추출
            start = content.find('{')  # JSON 시작 위치 찾기
            end = content.rfind('}')  # JSON 종료 위치 찾기
            json_str = content[start:end + 1]  # JSON 문자열 추출

            # JSON 문자열을 파이썬 사전으로 변환
            data = json.loads(json_str)
            return data

    def make_category_map(self, category_list:list):
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
            streamer_info = StreamerInfo(
                origin_id=str(new_item['user_id']),
                name=str(new_item['user_nick']),
                profile_url=f"https://stimg.afreecatv.com/LOGO/{new_item['user_id'][0:2]}/{new_item['user_id']}" +
                            f"/m/{new_item['user_id']}.webp",
                channel_url=f"https://play.afreecatv.com/{new_item['user_id']}",
                platform="S",
                stream_url=f"https://play.afreecatv.com/{new_item['user_id']}/{new_item['broad_no']}",
                live_origin_id=int(new_item['broad_no']),
                thumbnail_url=str(new_item['broad_thumb']),
                category=str(map_category[new_item['broad_cate_no']]),
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
                streamer_info = StreamerInfo(
                    origin_id=str(new_item['user_id']),
                    name=str(new_item['user_nick']),
                    profile_url=f"https://stimg.afreecatv.com/LOGO/{new_item['user_id'][0:2]}/{new_item['user_id']}" +
                                f"/m/{new_item['user_id']}.webp",
                    channel_url=f"https://play.afreecatv.com/{new_item['user_id']}",
                    platform="S",
                    stream_url=f"https://play.afreecatv.com/{new_item['user_id']}/{new_item['broad_no']}",
                    live_origin_id=int(new_item['broad_no']),
                    thumbnail_url=str(new_item['broad_thumb']),
                    category=str(map_category[new_item['broad_cate_no']]),
                    title=str(new_item['broad_title']),
                    viewer_cnt=int(new_item['total_view_cnt'])
                )
                streamer_list.append(streamer_info)

        # print(streamer_list)
        logger.info("아프리카 크롤링을 종료합니다.")
        return streamer_list

    # def soop(self):
    #     # ChromeDriver 경로 설정
    #     # chrome_driver_path = '/usr/bin/chromedriver'  # ChromeDriver가 설치된 경로
    #     # Chrome 옵션 설정
    #     logger.info("아프리카 크롤링을 시작합니다.")
    #     chrome_options = Options()
    #     chrome_options.add_argument("headless")  # 헤드리스 모드 활성화
    #     chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화 (일부 시스템에서 필요)
    #     chrome_options.add_argument("--no-sandbox")  # 샌드박스 비활성화
    #     # chrome_options.add_argument("--disable-dev-shm-usage")  # 리소스 제한 문제 방지
    #     chrome_options.add_argument("--mute-audio")
    #
    #     # # 시청자 수를 저장할 리스트 초기화
    #     streamer_list = []
    #     # print("되라되라")
    #     try:
    #         # WebDriver 서비스 설정
    #         #    service = ChromeService(executable_path=chrome_driver_path)
    #         # Selenium WebDriver를 초기화하고 ChromeDriverManager를 통해 ChromeDriver 설치
    #         #    driver = webdriver.Chrome(service=service, options=chrome_options)
    #         driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)
    #         # print("되라되라2")
    #         # 웹사이트 열기ㄴ
    #         driver.get('https://www.afreecatv.com/?hash=all')
    #
    #         # 페이지 로드를 기다리기 위한 대기 시간 설정
    #         driver.implicitly_wait(3)
    #
    #         while True:
    #
    #             button = driver.find_element(By.XPATH, "//button[.//span[text()='더보기']]")
    #
    #             button.click()
    #
    #             view_cnt = driver.find_elements(By.XPATH, "//li[@data-type='cBox']")
    #
    #             last_view = view_cnt[len(view_cnt) - 1]
    #
    #             cnt = re.sub(r'\D', '', last_view.find_element(By.CLASS_NAME, "views").text.strip())
    #
    #             # print(cnt)
    #             if int(cnt) < 50:
    #                 break
    #
    #         # # 각 파트너 항목에서 시청자 수 추출
    #         streamer_items = driver.find_elements(By.XPATH, "//li[@data-type='cBox']")
    #         index = 0
    #         for item in streamer_items:
    #             index += 1
    #             # 'video_card_badge__w02UD' 클래스를 가진 요소의 텍스트 추출 - 시청자 수
    #             viewer_count = item.find_element(By.XPATH, ".//div[2]/div[1]/span/em")
    #             count = 0
    #             if viewer_count:
    #                 count = re.sub(r'\D', '', viewer_count.text.strip())
    #                 # print(str(index) + " " + count)
    #                 if int(count) < 50:
    #                     break
    #
    #             # 썸네일 추출
    #             streamer_thumbnail = None
    #             try:
    #                 thumbnail = item.find_element(By.CLASS_NAME, "thumbs-box")
    #                 live_url = thumbnail.find_element(By.TAG_NAME, "img")
    #                 streamer_thumbnail = live_url.get_attribute('src')
    #
    #             except NoSuchElementException:
    #                 logger.info("썸네일 없다!")
    #             # thumbnail = item.find_element(By.CLASS_NAME, "thumbs-box")
    #             #
    #             # live_url = thumbnail.find_element(By.TAG_NAME, "img")
    #             # streamer_thumbnail = live_url.get_attribute('src')
    #
    #             # 방송인 채널 추출
    #             streamer_channel = None
    #             try:
    #                 streamer_url = item.find_element(By.CLASS_NAME, "thumb")
    #                 streamer_channel = streamer_url.get_attribute('href')
    #
    #             except NoSuchElementException:
    #                 logger.info("방송인 채널 url 없다!!")
    #
    #             # streamer_url = item.find_element(By.CLASS_NAME, "thumb")
    #             # streamer_channel = streamer_url.get_attribute('href')
    #
    #             click_streamer = item.find_element(By.CLASS_NAME, "thumbs-box")
    #
    #             click_live = click_streamer.find_element(By.TAG_NAME, "a")
    #
    #             # <a> 태그의 href 속성 값을 가져옴
    #             href_value = click_live.get_attribute('href')
    #
    #             pattern = re.compile(r'afreecatv.com/([^/]+)/(\d+)$')
    #
    #             # 패턴으로부터 해당 부분 찾기
    #             match = pattern.search(href_value)
    #
    #             if match:
    #                 streamer_id = match.group(1)  # 첫 번째 괄호에 해당하는 부분 (username)
    #                 streamer_live_id = match.group(2)  # 두 번째 괄호에 해당하는 부분 (number)
    #             else:
    #                 streamer_id, streamer_live_id = None, None  # 패턴에 매칭되는 부분이 없을 경우
    #
    #             # 자바스크립트를 사용하여 새 탭에서 href URL 열기
    #             driver.execute_script(f"window.open('{href_value}');")
    #             # print(href_value)
    #             # 새 탭으로 스위치
    #             driver.switch_to.window(driver.window_handles[1])
    #             driver.set_window_size(1920, 1080)
    #             # 페이지 로드를 기다리기 위한 대기 시간 설정
    #             driver.implicitly_wait(100)
    #
    #             try:
    #                 live_btn = WebDriverWait(driver, 3).until(
    #                     EC.visibility_of_element_located((By.XPATH, "//*[@id='stop_screen']/dl/dd[2]/a"))
    #                 )
    #                 # 버튼이 화면에 나타나면 클릭
    #                 # print("방송 라이브 버튼을 클릭합니다.")
    #                 live_btn.click()
    #             except TimeoutException:
    #                 # 버튼이 지정된 시간 내에 나타나지 않으면 실행을 계속
    #                 logger.info("클릭할 수 없습니다.")
    #
    #             try:
    #                 WebDriverWait(driver, 5).until(
    #                     lambda x: x.find_element(By.XPATH,
    #                                              "//*[@id='player_area']/div[2]/div[2]/ul/li[2]/span").get_attribute(
    #                         'innerHTML').strip() != ""
    #                 )
    #                 # 버튼이 화면에 나타나면 클릭
    #                 # print("모든 정보가 나타났습니다.")
    #
    #             except TimeoutException:
    #                 logger.info("새 탭을 닫습니다.")
    #                 driver.close()  # 새 탭 닫기
    #                 driver.switch_to.window(driver.window_handles[0])  # 원래 탭으로 스위치
    #                 continue
    #
    #             # 스트리머 이름 //*[@id="player_area"]/div[2]/div[2]/div[1]
    #             streamer_name = driver.find_element(By.CLASS_NAME, "nickname")
    #
    #             streamer_title = driver.find_element(By.CLASS_NAME, 'broadcast_title')
    #
    #             view = driver.find_element(By.CLASS_NAME, "detail_view")
    #             detail_view = view.find_elements(By.TAG_NAME, "li")
    #             category = None
    #             try:
    #                 category = detail_view[1].find_element(By.TAG_NAME, "span").text.strip()
    #
    #             except NoSuchElementException:
    #                 logger.info("없다!")
    #
    #             streamer_profile = driver.find_element(By.XPATH,
    #                                                    ".//*[@id='player_area']/div[2]/div[1]/a/img").get_attribute(
    #                 'src')
    #
    #             # print(streamer_id)
    #             # print(streamer_name.text)
    #             # print(streamer_profile)
    #             # print(streamer_channel)
    #             # print(href_value)
    #             # print(streamer_live_id)
    #             # print(streamer_thumbnail)
    #             # print(category)
    #             # print(streamer_title.text.strip())
    #             # print(count)
    #             streamer_info = StreamerInfo(
    #                 origin_id=streamer_id,
    #                 name=streamer_name.text,
    #                 profile_url=streamer_profile,
    #                 channel_url=streamer_channel,
    #                 platform="S",
    #                 stream_url=href_value,
    #                 live_origin_id=streamer_live_id,
    #                 thumbnail_url=streamer_thumbnail,
    #                 category=category,
    #                 title=streamer_title.text.strip(),
    #                 viewer_cnt=count
    #             )
    #
    #             driver.close()  # 새 탭 닫기
    #             driver.switch_to.window(driver.window_handles[0])  # 원래 탭으로 스위치
    #
    #             streamer_list.append(streamer_info)
    #
    #         # 브라우저 종료
    #         driver.quit()
    #
    #     except Exception as e:
    #         logger.error(e)
    #
    #     # print(streamer_list)
    #     logger.info("아프리카 크롤링을 끝냅니다.")
    #     # print("예이에에에ㅔ")
    #     return streamer_list

    async def soop_follower(self, streamers: List[StreamerRead]):

        streamer_follower_list = []
        logger.info("아프리카 팔로우 크롤링 시작합니다.")
        for s in streamers:
            res = await self.follower(s.origin_id)
            if 'station' not in res:
                logger.info("밴 먹은 유저 입니다.")
                continue
            follower_text = res['station']['upd']['fan_cnt']
            follower_cnt = int(follower_text)
            # print(follower_cnt)
            streamer_follower_list.append(StreamerLogCreate(
                streamer_id=s.streamer_id,
                follower=follower_cnt
            ))

        # print(streamer_follower_list)
        logger.info("아프리카 팔로우 크롤링을 끝냅니다.")
        return streamer_follower_list
