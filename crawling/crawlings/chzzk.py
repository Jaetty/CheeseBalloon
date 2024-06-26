from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from tabulate import tabulate

from sqlalchemy.orm import Session
from schemas.streamer_info import StreamerInfo
from services.streamers import StreamerService
from services.streamer_logs import StreamerLogService
from services.categories import CategoryService
from schemas.streamers import StreamerCreate
from schemas.categories import CategoryCreate

from datetime import datetime
import time
import re

import httpx


class Chzzk:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                      "Chrome/123.0.0.0 Safari/537.36"
    }

    async def init_live(self):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36"
            }
            res = await client.get('https://api.chzzk.naver.com/service/v1/lives?size=50&sortType=POPULAR',
                                   headers=headers)
            return res.json()

    async def more_live(self, concurrent_user_count: int, live_id: int):
        async with httpx.AsyncClient() as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
                              "Chrome/123.0.0.0 Safari/537.36"
            }

            res = await client.get(f'https://api.chzzk.naver.com/service/v1/lives?' +
                                   f'concurrentUserCount={concurrent_user_count}&' +
                                   f'liveId={live_id}&size=50&sortType=POPULAR',
                                   headers=headers)
            return res.json()

    async def chzzk(self):

        # StreamerInfo 객체 저장 딕셔너리 생성
        streamers_dict = {}

        live_list = await self.init_live()
        concurrent_user_count = live_list['content']['page']['next']['concurrentUserCount']
        live_id = live_list['content']['page']['next']['liveId']
        item_list = live_list['content']['data']

        for new_item in item_list:
            streamer_info = StreamerInfo(
                origin_id=str(new_item['channel']['channelId']),
                name=str(new_item['channel']['channelName']),
                profile_url=str(new_item['channel']['channelImageUrl']),
                channel_url=f"https://chzzk.naver.com/{new_item['channel']['channelId']}",
                platform="C",
                stream_url=f"https://chzzk.naver.com/live/{new_item['channel']['channelId']}",
                live_origin_id=int(new_item['liveId']),
                thumbnail_url=str(new_item['liveImageUrl']).format(type=480),
                category=str(new_item['liveCategoryValue']),
                title=str(new_item['liveTitle']),
                viewer_cnt=int(new_item['concurrentUserCount'])
            )
            streamers_dict[streamer_info.live_origin_id] = streamer_info

        # live_id를 키로 하는 딕셔너리로 변환
        # live_dict = {item["liveId"]: item for item in item_list}

        while concurrent_user_count > 20:
            new_list = await self.more_live(concurrent_user_count, live_id)
            concurrent_user_count = new_list['content']['page']['next']['concurrentUserCount']
            live_id = new_list['content']['page']['next']['liveId']
            streamer_item_list = new_list['content']['data']
            for new_item in streamer_item_list:

                streamer_info = StreamerInfo(
                    origin_id=str(new_item['channel']['channelId']),
                    name=str(new_item['channel']['channelName']),
                    profile_url=str(new_item['channel']['channelImageUrl']),
                    channel_url=f"https://chzzk.naver.com/{new_item['channel']['channelId']}",
                    platform="C",
                    stream_url=f"https://chzzk.naver.com/live/{new_item['channel']['channelId']}",
                    live_origin_id=int(new_item['liveId']),
                    thumbnail_url=str(new_item['liveImageUrl']).format(type=480),
                    category=str(new_item['liveCategoryValue']),
                    title=str(new_item['liveTitle']),
                    viewer_cnt=int(new_item['concurrentUserCount'])
                )
                streamers_dict[streamer_info.live_origin_id] = streamer_info

        streamers_list = list(streamers_dict.values())
        # print(streamers_list)
        return streamers_list

    def chzzk_crawling(self, db: Session):
        # Chrome 옵션 설정
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # 헤드리스 모드 활성화
        chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화 (일부 시스템에서 필요)
        chrome_options.add_argument("--no-sandbox")  # 샌드박스 비활성화
        chrome_options.add_argument("--disable-dev-shm-usage")  # 리소스 제한 문제 방지

        try:
            # Selenium WebDriver를 초기화하고 ChromeDriverManager를 통해 ChromeDriver 설치
            driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

            # 웹사이트 열기
            driver.get('https://chzzk.naver.com/lives')

            # 페이지 로드를 기다리기 위한 대기 시간 설정
            driver.implicitly_wait(10)

            # 스크롤을 위한 대기 시간 설정
            SCROLL_PAUSE_TIME = 0.5

            # 페이지 스크롤 다운을 위한 루프
            scroll_position = 0
            last_height = 0
            pre_height = driver.execute_script("return document.body.scrollHeight")
            while True:
                new_height = driver.execute_script("return document.body.scrollHeight")

                if pre_height != new_height:
                    last_height = pre_height
                    pre_height = new_height

                # 페이지를 조금씩 내리는 스크롤 (예: 100픽셀씩)
                scroll_position += (new_height - last_height) * 1 / 5

                driver.execute_script(f"window.scrollTo(0, {scroll_position});")

                # 새로운 페이지 콘텐츠 로드를 기다림
                time.sleep(SCROLL_PAUSE_TIME)

                view_cnt = driver.find_elements(By.XPATH, "//*[@id='layout-body']/div/section/ul/li")

                last_view = view_cnt[len(view_cnt) - 1]

                last_view_cnt = last_view.find_element(By.CLASS_NAME, "video_card_badge__w02UD")

                cnt = re.sub(r'\D', '', last_view_cnt.text.strip())

                if int(cnt) < 20:
                    break

                # 시청자 수를 저장할 리스트 초기화
            streamer_list = []

            # 각 파트너 항목에서 시청자 수 추출
            streamer_items = driver.find_elements(By.XPATH, "//*[@id='layout-body']/div/section/ul/li")
            index = 0
            for item in streamer_items:
                # 'video_card_badge__w02UD' 클래스를 가진 요소의 텍스트 추출 - 시청자 수
                viewer_count = item.find_element(By.CLASS_NAME, "video_card_badge__w02UD")
                if viewer_count:
                    count = re.sub(r'\D', '', viewer_count.text.strip())
                    if int(count) < 20:
                        break
                data = []
                index += 1
                data.append(index)

                # 'name_text__yQG50' 클래스를 가진 요소의 텍스트 추출 - 방송인 이름
                streamer_name = item.find_element(By.CLASS_NAME, 'name_text__yQG50')
                print(streamer_name.text)
                if streamer_name:
                    data.append(streamer_name.text.strip())
                # print(streamer_name.text) video_card_image__yHXqv video_card_image__yHXqv video_card_image__yHXqv
                # a_tag = item.find_element(By.CLASS_NAME, 'video_card_image__yHXqv')
                a_tag = item.find_element(By.XPATH, ".//div/div/div[1]/a[@class='video_card_image__yHXqv']")

                # <a> 태그의 href 속성 값을 가져옴
                href = a_tag.get_attribute('href')
                print(href)
                # 자바스크립트를 사용하여 새 탭에서 href URL 열기
                driver.execute_script(f"window.open('{href}');")

                # 새 탭으로 스위치
                driver.switch_to.window(driver.window_handles[1])

                follower = driver.find_element(By.CLASS_NAME, 'channel_profile_cell__kkiQb')
                follower_str = follower.text.replace("팔로워 ", "")
                if "만" in follower_str:
                    numbers = float(follower_str.replace("만명", ""))
                    followers = int(numbers * 10000)
                elif "천" in follower_str:
                    numbers = float(follower_str.replace("천명", ""))
                    followers = int(numbers * 1000)
                else:
                    followers = int(follower_str.replace("명", ""))
                print(followers)
                data.append(followers)

                driver.close()  # 새 탭 닫기
                driver.switch_to.window(driver.window_handles[0])  # 원래 탭으로 스위치

                # 'video_card_title__Amjk2' 클래스를 가진 요소의 텍스트 추출 - 제목
                live_title = item.find_element(By.CLASS_NAME, 'video_card_title__Amjk2')
                if live_title:
                    blind_text = live_title.find_element(By.CLASS_NAME, 'blind').text
                    data.append(live_title.text.replace(blind_text, '').strip())

                # 시청자 수 데이터
                data.append(viewer_count.text.strip())
                try:
                    # 'video_card_category__xQ15T' 클래스를 가진 요소의 텍스트 추출 - 태그
                    live_tag = item.find_element(By.XPATH, ".//div/div/div[2]/div[2]/a/span")

                    if live_tag:
                        if not CategoryService().get_category(db=db, category=live_tag.text):
                            # print("데이터 넣기")
                            categories = CategoryCreate(
                                category=live_tag.text
                            )
                            CategoryService().create(db=db, category=categories)

                    data.append(live_tag.text.strip())
                except NoSuchElementException:
                    data.append("없음")

                # 'video_card_image__yHXqv' 클래스를 가진 요소의 텍스트 추출 - 썸네일
                live_img = item.find_element(By.CLASS_NAME, 'video_card_image__yHXqv')
                if live_img:
                    data.append(live_img.get_attribute('src'))

                streamer_id = re.search(r'/([^/]*)$', href).group(1)
                print(streamer_id)
                if streamer_id:
                    if not StreamerService().get_streamer(db=db, origin_id=streamer_id):
                        # print("데이터 넣기")
                        streamer = StreamerCreate(
                            origin_id=streamer_id,
                            name=streamer_name.text.strip(),
                            profile_url=a_tag.find_element(By.TAG_NAME, "img").get_attribute('src'),
                            channel_url=href,
                            platform="C"
                        )
                        StreamerService().create(db=db, streamer=streamer)

                    StreamerLogService().create(db=db, follower=followers, origin_id=streamer_id)

                streamer_list.append(data)

            # 결과 출력
            print(tabulate(streamer_list, headers=["번호", "방송인", "팔로우", "제목", "시청자 수", "태그", "썸네일"]))

            # 브라우저 종료
            driver.quit()
        except Exception as e:
            print(e)
