"use client";

import { symlink } from "fs";
import { useEffect, useState } from "react";
import styles from "src/styles/page.module.css";
import a_icon from "src/stores/afreeca_icon.png";
import cnt from "src/stores/cnt_icon.png";

export default function Home() {
  const [liveData, setLiveData] = useState(null);
  const cheese_api = process.env.NEXT_PUBLIC_CHEESEBALLOON_API;
  useEffect(() => {
    fetch(`${cheese_api}/live?offset=0&limit=100`)
      .then((response) => response.json())
      .then((data) => {
        // 가져온 데이터를 liveData 상태로 설정
        setLiveData(data);
      })
      .catch((error) => {
        console.error("Error fetching live data:", error);
      });
  }, []); // 빈 배열을 의존성 배열로 지정하여 최초 한 번만 실행되도록 설정

  console.log(liveData);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.border}>
          <div className={styles.notice}>
            <div className={styles.content}>
              <div className={styles.pin}>공지</div>
              <div className={styles.notice_title}>
                치즈벌룬에 오신 여러분 환영합니다
              </div>
              <div className={styles.date}>2024.03.04</div>
            </div>
          </div>
        </div>
        <div className={styles.ranking}>
          <div className={styles.title}>시청률 랭킹</div>
          <div className={styles.sub_title}>
            <p>최근 30일 기준의 랭킹 변동을 나타내는 그래프입니다</p>
          </div>
          <div className={styles.border}>
            <div className={styles.animation}>
              <p>animation div</p>
            </div>
          </div>
        </div>
        <div className={styles.live_main}>
          <div className={styles.title}>
            <p>LIVE 모아보기</p>
          </div>
          <div className={styles.more}>
            <p>더보기</p>
          </div>
          <div className={styles.streaming_list}>
            {liveData &&
              liveData.data.map((live) => (
                <div key={live.liveId} className={styles.live}>
                  <div className={styles.live_thumbnail}>
                    <img src={live.thumbnailUrl} alt="123" />
                  </div>
                  <div className={styles.second_container}>
                    <div className={styles.ff}>
                      <div className={styles.platform_icon}>
                        {live.platform === "A" && (
                          <img src={a_icon.src} alt="Platform A" />
                        )}
                        {live.platform === "C" && (
                          <img
                            src="https://cdn.mhns.co.kr/news/photo/202401/570626_699706_5828.png"
                            alt="Platform C"
                          />
                        )}
                      </div>
                      <div className={styles.bj_name}>{live.name}</div>
                    </div>
                    <div className={styles.category}>{live.category}</div>
                  </div>
                  <div className={styles.third_container}>
                    <div className={styles.bj_thumbnail}>
                      <img src={live.profileUrl} alt="" />
                    </div>
                    <div className={styles.live_title}>{live.title}</div>
                  </div>
                  <div className={styles.cnt}>
                    <div className={styles.cnt_icon}>
                      <img src={cnt.src} alt="cnt" />
                    </div>
                    <div className={styles.viewer}>{live.viewerCnt}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
