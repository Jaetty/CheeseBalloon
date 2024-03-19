from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from tabulate import tabulate

from sqlalchemy.orm import Session
from services.streamers import StreamerService
from services.streamer_logs import StreamerLogService
from services.categories import CategoryService
from schemas.streamers import StreamerCreate
from schemas.categories import CategoryCreate

import time
import re




class Crawling:
    def chzzk(self, db: Session):
        # Chrome 옵션 설정
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # 헤드리스 모드 활성화
        chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화 (일부 시스템에서 필요)
        chrome_options.add_argument("--no-sandbox")  # 샌드박스 비활성화
        chrome_options.add_argument("--disable-dev-shm-usage")  # 리소스 제한 문제 방지

        try:
            # Selenium WebDriver를 초기화하고 ChromeDriverManager를 통해 ChromeDriver 설치
            driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
            # 페이지 로드를 기다리기 위한 대기 시간 설정
            driver.implicitly_wait(10)
            # 웹사이트 열기
            driver.get('https://chzzk.naver.com/lives')

            # 웹사이트의 동적 컨텐츠가 로드될 때까지 기다림 (필요에 따라 시간 조정)
            time.sleep(5)  # 적절한 로딩 시간을 기다림

            # 페이지의 소스 가져오기
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')

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
                # print(scroll_position)
                # scroll_position += 700
                driver.execute_script(f"window.scrollTo(0, {scroll_position});")

                # 새로운 페이지 콘텐츠 로드를 기다림
                time.sleep(SCROLL_PAUSE_TIME)

                view_cnt = driver.find_elements(By.XPATH, "//*[@id='layout-body']/div/section/ul/li")

                last_view = view_cnt[len(view_cnt) - 1]

                last_view_cnt = last_view.find_element(By.CLASS_NAME, "video_card_badge__w02UD")

                cnt = re.sub(r'\D', '', last_view_cnt.text.strip())

                if int(cnt) < 20:
                    break
                # if last_height != new_height:
                #     print("last가 달라" + str(last_height) + " " + str(new_height))
                #     last_height = new_height
                #     scroll_position = new_height / 2
                # else:
                #     print("last가 같아" + str(last_height) + " " + str(new_height))
                #     scroll_position = last_height / 2

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
                # // *[ @ id = "layout-body"] / div / section / ul / li[2] / div / div / div[1] / a
                # // *[ @ id = "layout-body"] / div / section / ul / li[3] / div / div / div[1] / a
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
                follower_str = follower.text.replace("팔로워 ","")
                if "만" in follower_str:
                    numbers = float(follower_str.replace("만명",""))
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
                            profile_url= a_tag.find_element(By.TAG_NAME, "img").get_attribute('src'),
                            channel_url= href,
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

    def afreeca(self, db: Session):
        # Chrome 옵션 설정
        # Chrome 옵션 설정
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # 헤드리스 모드 활성화
        chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화 (일부 시스템에서 필요)
        chrome_options.add_argument("--no-sandbox")  # 샌드박스 비활성화
        chrome_options.add_argument("--disable-dev-shm-usage")  # 리소스 제한 문제 방지

        try:
            # Selenium WebDriver를 초기화하고 ChromeDriverManager를 통해 ChromeDriver 설치
            driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
            # 페이지 로드를 기다리기 위한 대기 시간 설정
            driver.implicitly_wait(10)
            # 웹사이트 열기ㄴ
            driver.get('https://www.afreecatv.com/?hash=all')

            # 웹사이트의 동적 컨텐츠가 로드될 때까지 기다림 (필요에 따라 시간 조정)
            time.sleep(5)  # 적절한 로딩 시간을 기다림

            while True:

                button = driver.find_element(By.XPATH, "//button[.//span[text()='더보기']]")

                button.click()

                view_cnt = driver.find_elements(By.XPATH, "//li[@data-type='cBox']")

                last_view = view_cnt[len(view_cnt) - 1]

                cnt = re.sub(r'\D', '', last_view.find_element(By.CLASS_NAME, "views").text.strip())

                # print(cnt)
                if int(cnt) < 50:
                    break
            #
            # # 시청자 수를 저장할 리스트 초기화
            streamer_list = []
            #
            # # 각 파트너 항목에서 시청자 수 추출
            streamer_items = driver.find_elements(By.XPATH, "//li[@data-type='cBox']")
            index = 0
            for item in streamer_items:
                # 'video_card_badge__w02UD' 클래스를 가진 요소의 텍스트 추출 - 시청자 수
                viewer_count = item.find_element(By.XPATH, ".//div[2]/div[1]/span/em")

                if viewer_count:
                    count = re.sub(r'\D', '', viewer_count.text.strip())
                    if int(count) < 50:
                        break

                click_streamer = item.find_element(By.CLASS_NAME, "thumbs-box")

                click_live = click_streamer.find_element(By.TAG_NAME, "a")

                # print(click_live.get_attribute('href'))

                # <a> 태그의 href 속성 값을 가져옴
                href_value = click_live.get_attribute('href')

                # print(href_value)

                # 자바스크립트를 사용하여 새 탭에서 href URL 열기
                driver.execute_script(f"window.open('{href_value}');")

                # 새 탭으로 스위치
                driver.switch_to.window(driver.window_handles[1])
                # 페이지 로드를 기다리기 위한 대기 시간 설정
                driver.implicitly_wait(100)

                try:
                    live_btn = WebDriverWait(driver, 5).until(
                        EC.visibility_of_element_located((By.XPATH, "//*[@id='stop_screen']/dl/dd[2]/a"))
                    )
                    # 버튼이 화면에 나타나면 클릭
                    # print("방송 라이브 버튼을 클릭합니다.")
                    live_btn.click()
                except TimeoutException:
                    # 버튼이 지정된 시간 내에 나타나지 않으면 실행을 계속
                    print("클릭할 수 없습니다.")

                try:
                    WebDriverWait(driver, 10).until(
                        lambda x: x.find_element(By.XPATH,
                                                 "//*[@id='player_area']/div[2]/div[2]/ul/li[2]/span").get_attribute(
                            'innerHTML').strip() != ""
                    )
                    # 버튼이 화면에 나타나면 클릭
                    # print("모든 정보가 나타났습니다.")

                except TimeoutException:
                    # 버튼이 지정된 시간 내에 나타나지 않으면 실행을 계속
                    # print("정보가 뜨지 않습니다. 다음으로 넘어갑니다.")
                    driver.close()  # 새 탭 닫기
                    driver.switch_to.window(driver.window_handles[0])  # 원래 탭으로 스위치
                    continue

                streamer_url = driver.find_element(By.XPATH, "//*[@id='player_area']/div[2]/div[2]/ul/li[5]/span/a")
                streamer_id_pattern = re.compile(r'bj.afreecatv.com/([^/]+)')

                # 정규 표현식을 사용하여 스트리머 아이디 찾기
                streamer_id_match = streamer_id_pattern.search(streamer_url.text)
                streamer_id = streamer_id_match.group(1) if streamer_id_match else None

                data = []
                index += 1
                data.append(index)

                streamer_name = driver.find_element(By.XPATH, "//*[@id='player_area']/div[2]/div[2]/div[1]")
                if streamer_name:
                    data.append(streamer_name.text.strip())

                streamer_follow = driver.find_element(By.XPATH, "//li[@class='boomark_cnt']")
                bookmark = streamer_follow.find_element(By.TAG_NAME, "span")
                if bookmark:
                    # print(bookmark.text.strip())
                    data.append(bookmark.text.strip())
                else:
                    data.append("없음")

                streamer_title = driver.find_element(By.CLASS_NAME, 'broadcast_title')
                # print(streamer_title.text)
                # title = streamer_title.find_element(By.TAG_NAME, "span")
                if streamer_title:
                    # print(streamer_title.text.strip())
                    data.append(streamer_title.text.strip())
                else:
                    data.append("없음")

                # 시청자 수 데이터
                streamer_viewer = driver.find_element(By.CLASS_NAME, "broadcast_viewer_cnt")
                # print(streamer_viewer.text.strip())
                data.append(streamer_viewer.text.strip())

                view = driver.find_element(By.CLASS_NAME, "detail_view")

                detail_view = view.find_elements(By.TAG_NAME, "li")
                try:

                    category = detail_view[1].find_element(By.TAG_NAME, "span").text.strip()
                    # print(category)
                    data.append(category)

                    if category:
                        if not CategoryService().get_category(db=db, category=category):
                            # print("데이터 넣기")
                            categories = CategoryCreate(
                                category=category
                            )
                            CategoryService().create(db=db, category=categories)
                except NoSuchElementException:
                    print("없다!")

                if streamer_id:
                    if not StreamerService().get_streamer(db=db, origin_id=streamer_id):
                        # print("데이터 넣기")
                        streamer = StreamerCreate(
                            origin_id=streamer_id,
                            name=streamer_name.text.strip(),
                            profile_url=driver.find_element(By.XPATH, "//*[@id='player_area']/div[2]/div[1]/a/img")
                            .get_attribute('src'),
                            channel_url=streamer_url.text.strip(),
                            platform="A"
                        )
                        StreamerService().create(db=db, streamer=streamer)

                    follower_cnt = int(bookmark.text.replace(",", ""))
                    StreamerLogService().create(db=db, follower=follower_cnt, origin_id=streamer_id)


                driver.close()  # 새 탭 닫기
                driver.switch_to.window(driver.window_handles[0])  # 원래 탭으로 스위치

                # 'video_card_image__yHXqv' 클래스를 가진 요소의 텍스트 추출 - 썸네일
                click_streamer = driver.find_element(By.CLASS_NAME, "thumbs-box")
                if click_streamer:
                    live_url = click_streamer.find_element(By.TAG_NAME, "img")
                    data.append(live_url.get_attribute('src'))

                streamer_list.append(data)

            # 결과 출력
            print(tabulate(streamer_list, headers=["번호", "방송인", "팔로우", "제목", "시청자 수", "태그", "썸네일"]))

            # 브라우저 종료
            driver.quit()

        except Exception as e:
            print(e)
