"use client";

/* eslint-disable camelcase */

import { useEffect, useState } from "react";
import styles from "src/styles/page.module.css";
import ChartRace from "react-chart-race";
// eslint-disable-next-line camelcase
import a_icon from "src/stores/afreeca_icon.png";
import cnt from "src/stores/cnt_icon.png";

interface live_data {
  data:
    | {
        streamerId: number;
        liveId: number;
        name: string;
        title: string;
        thumbnailUrl: string;
        platform: string;
        profileUrl: string;
        category: string;
        viewerCnt: number;
        streamUrl: string;
        channelUrl: string;
      }[]
    | null;
}

export default function Home() {
  const [liveData, setLiveData] = useState<live_data>({
    data: null,
  });
  const cheese_api = process.env.NEXT_PUBLIC_CHEESEBALLOON_API;
  const [raceData, setRaceData] = useState([{}]);

  useEffect(() => {
    fetch(`${cheese_api}/live?offset=0&limit=100`)
      .then((response) => response.json())
      .then((data) => {
        // 가져온 데이터를 liveData 상태로 설정
        setLiveData(data);
      });
    // .catch((error) => {
    //   console.error("Error fetching live data:", error);
    // });
  }, [cheese_api]); // 빈 배열을 의존성 배열로 지정하여 최초 한 번만 실행되도록 설정

  useEffect(() => {
    const exampleData = [
      { id: "Alice", title: "침착맨", value: 10, color: "#2c2c2c" },
      { id: "Bob", title: "혁근맨", value: 20, color: "#c33178" },
      { id: "Charlie", title: "경훈맨", value: 15, color: "423bce" },
      { id: 2, title: "상재맨", value: 12, color: "#c33178" },
      { id: 3, title: "승민맨", value: 11, color: "#423bce" },
      { id: 4, title: "우찬맨", value: 14, color: "#c8303b" },
      { id: 5, title: "창근맨", value: 17, color: "#2c2c2c" },
    ];

    const intervalId = setInterval(() => {
      const updatedData = exampleData.map((item) => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 10),
      }));

      setRaceData(updatedData);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // console.log(liveData);

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
              <ChartRace
                data={raceData}
                backgroundColor="#000"
                width={1080}
                padding={12}
                itemHeight={58}
                gap={12}
                titleStyle={{ font: "normal 400 13px Arial", color: "#fff" }}
                valueStyle={{
                  font: "normal 400 11px Arial",
                  color: "rgba(255,255,255, 0.42)",
                }}
              />
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
            {liveData.data &&
              liveData.data.map((live) => (
                <div key={live.liveId} className={styles.live}>
                  <a
                    href={live.streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.live_thumbnail}>
                      <img src={live.thumbnailUrl} alt="123" />
                    </div>
                  </a>
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
