from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
#from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from schemas.streamer_info import StreamerInfo

from datetime import datetime
import re
# import os


class Soop:
    @property
    def soop(self):
        # ChromeDriver 경로 설정
        #chrome_driver_path = '/usr/bin/chromedriver'  # ChromeDriver가 설치된 경로
        # Chrome 옵션 설정
        print("아프리카 크롤링을 시작합니다.")
        chrome_options = Options()
        chrome_options.add_argument("headless")  # 헤드리스 모드 활성화
        chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화 (일부 시스템에서 필요)
        chrome_options.add_argument("--no-sandbox")  # 샌드박스 비활성화
       # chrome_options.add_argument("--disable-dev-shm-usage")  # 리소스 제한 문제 방지
        chrome_options.add_argument("--mute-audio")

        # # 시청자 수를 저장할 리스트 초기화
        streamer_list = []
        # print("되라되라")
        try:
            # WebDriver 서비스 설정
        #    service = ChromeService(executable_path=chrome_driver_path)
            # Selenium WebDriver를 초기화하고 ChromeDriverManager를 통해 ChromeDriver 설치
        #    driver = webdriver.Chrome(service=service, options=chrome_options)
            driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)
            # print("되라되라2")
            # 웹사이트 열기ㄴ
            driver.get('https://www.afreecatv.com/?hash=all')

            # 페이지 로드를 기다리기 위한 대기 시간 설정
            driver.implicitly_wait(3)

            while True:

                button = driver.find_element(By.XPATH, "//button[.//span[text()='더보기']]")

                button.click()

                view_cnt = driver.find_elements(By.XPATH, "//li[@data-type='cBox']")

                last_view = view_cnt[len(view_cnt) - 1]

                cnt = re.sub(r'\D', '', last_view.find_element(By.CLASS_NAME, "views").text.strip())

                # print(cnt)
                if int(cnt) < 50:
                    break

            # # 각 파트너 항목에서 시청자 수 추출
            streamer_items = driver.find_elements(By.XPATH, "//li[@data-type='cBox']")
            index = 0
            for item in streamer_items:
                index += 1
                # 'video_card_badge__w02UD' 클래스를 가진 요소의 텍스트 추출 - 시청자 수
                viewer_count = item.find_element(By.XPATH, ".//div[2]/div[1]/span/em")
                count = 0
                if viewer_count:
                    count = re.sub(r'\D', '', viewer_count.text.strip())
                    # print(str(index) + " " + count)
                    if int(count) < 50:
                        break

                # 썸네일 추출
                streamer_thumbnail = None
                try:
                    thumbnail = item.find_element(By.CLASS_NAME, "thumbs-box")
                    live_url = thumbnail.find_element(By.TAG_NAME, "img")
                    streamer_thumbnail = live_url.get_attribute('src')

                except NoSuchElementException:
                    print("썸네일 없다!")
                # thumbnail = item.find_element(By.CLASS_NAME, "thumbs-box")
                #
                # live_url = thumbnail.find_element(By.TAG_NAME, "img")
                # streamer_thumbnail = live_url.get_attribute('src')

                # 방송인 채널 추출
                streamer_channel = None
                try:
                    streamer_url = item.find_element(By.CLASS_NAME, "thumb")
                    streamer_channel = streamer_url.get_attribute('href')

                except NoSuchElementException:
                    print("방송인 채널 url 없다!!")

                # streamer_url = item.find_element(By.CLASS_NAME, "thumb")
                # streamer_channel = streamer_url.get_attribute('href')

                click_streamer = item.find_element(By.CLASS_NAME, "thumbs-box")

                click_live = click_streamer.find_element(By.TAG_NAME, "a")

                # <a> 태그의 href 속성 값을 가져옴
                href_value = click_live.get_attribute('href')

                pattern = re.compile(r'afreecatv.com/([^/]+)/(\d+)$')

                # 패턴으로부터 해당 부분 찾기
                match = pattern.search(href_value)

                if match:
                    streamer_id = match.group(1)  # 첫 번째 괄호에 해당하는 부분 (username)
                    streamer_live_id = match.group(2)  # 두 번째 괄호에 해당하는 부분 (number)
                else:
                    streamer_id, streamer_live_id = None, None  # 패턴에 매칭되는 부분이 없을 경우

                # 자바스크립트를 사용하여 새 탭에서 href URL 열기
                driver.execute_script(f"window.open('{href_value}');")
                # print(href_value)
                # 새 탭으로 스위치
                driver.switch_to.window(driver.window_handles[1])
                driver.set_window_size(1920, 1080)
                # 페이지 로드를 기다리기 위한 대기 시간 설정
                driver.implicitly_wait(100)

                try:
                    live_btn = WebDriverWait(driver, 3).until(
                        EC.visibility_of_element_located((By.XPATH, "//*[@id='stop_screen']/dl/dd[2]/a"))
                    )
                    # 버튼이 화면에 나타나면 클릭
                    # print("방송 라이브 버튼을 클릭합니다.")
                    live_btn.click()
                except TimeoutException:
                    # 버튼이 지정된 시간 내에 나타나지 않으면 실행을 계속
                    print("클릭할 수 없습니다.")

                try:
                    WebDriverWait(driver, 5).until(
                        lambda x: x.find_element(By.XPATH,
                                                 "//*[@id='player_area']/div[2]/div[2]/ul/li[2]/span").get_attribute(
                            'innerHTML').strip() != ""
                    )
                    # 버튼이 화면에 나타나면 클릭
                    # print("모든 정보가 나타났습니다.")

                except TimeoutException:
                    print("새 탭을 닫습니다.")
                    driver.close()  # 새 탭 닫기
                    driver.switch_to.window(driver.window_handles[0])  # 원래 탭으로 스위치
                    continue

                # 스트리머 이름 //*[@id="player_area"]/div[2]/div[2]/div[1]
                streamer_name = driver.find_element(By.CLASS_NAME, "nickname")

                streamer_title = driver.find_element(By.CLASS_NAME, 'broadcast_title')

                view = driver.find_element(By.CLASS_NAME, "detail_view")
                detail_view = view.find_elements(By.TAG_NAME, "li")
                category = None
                try:
                    category = detail_view[1].find_element(By.TAG_NAME, "span").text.strip()

                except NoSuchElementException:
                    print("없다!")

                streamer_profile = driver.find_element(By.XPATH,
                                                       ".//*[@id='player_area']/div[2]/div[1]/a/img").get_attribute(
                    'src')

                # print(streamer_id)
                # print(streamer_name.text)
                # print(streamer_profile)
                # print(streamer_channel)
                # print(href_value)
                # print(streamer_live_id)
                # print(streamer_thumbnail)
                # print(category)
                # print(streamer_title.text.strip())
                # print(count)
                streamer_info = StreamerInfo(
                    origin_id=streamer_id,
                    name=streamer_name.text,
                    profile_url=streamer_profile,
                    channel_url=streamer_channel,
                    platform="S",
                    stream_url=href_value,
                    live_origin_id=streamer_live_id,
                    thumbnail_url=streamer_thumbnail,
                    category=category,
                    title=streamer_title.text.strip(),
                    viewer_cnt=count
                )

                driver.close()  # 새 탭 닫기
                driver.switch_to.window(driver.window_handles[0])  # 원래 탭으로 스위치

                streamer_list.append(streamer_info)

            # 브라우저 종료
            driver.quit()

        except Exception as e:
            print(e)

        # print(streamer_list)
        print("아프리카 크롤링을 끝냅니다.")
        return streamer_list
