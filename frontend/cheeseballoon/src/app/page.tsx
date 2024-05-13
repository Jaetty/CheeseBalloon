"use client";

/* eslint-disable camelcase */

import { useEffect, useState } from "react";
import styles from "src/styles/page.module.css";

// eslint-disable-next-line camelcase
import a_icon from "src/stores/afreeca_icon.png";
import cnt from "src/stores/cnt_icon.png";
import soop from "src/stores/soop_icon.png";
import no_image from "src/stores/no_image.png";
import no_image_profile from "src/stores/no_image_profile.png";

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
              <div className={styles.animation_container}>
                <div className={styles.rankbox}>
                  <img className={styles.teamlogo} src={soop.src} alt="133" />
                  <img
                    className={styles.playerimage}
                    alt="33"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/394353/faker.png"
                  />
                  <div className={styles.rankingcontainer}>
                    <h1 className={styles.ranking}>#1</h1>
                  </div>
                  <h1 className={styles.playername}>침착맨</h1>
                </div>
                <div className={styles.rankbox}>
                  <img className={styles.teamlogo} alt="1" src={a_icon.src} />
                  <img
                    className={styles.playerimage}
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/394353/bjergerking.png"
                    alt="2"
                  />
                  <div className={styles.rankingcontainer}>
                    <h1 className={styles.ranking}>#2</h1>
                  </div>
                  <h1 className={styles.playername}>통닭천사</h1>
                </div>
                <div className={styles.rankbox}>
                  <img
                    className={styles.teamlogo}
                    src="https://cdn.mhns.co.kr/news/photo/202401/570626_699706_5828.png"
                    alt="12"
                  />
                  <img
                    className={styles.playerimage}
                    alt="13"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/394353/jensen.png"
                  />
                  <div className={styles.rankingcontainer}>
                    <h1 className={styles.ranking}>#3</h1>
                  </div>
                  <h1 className={styles.playername}>철면수심</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.title}>
          <p>LIVE 모아보기</p>
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
                    <img
                      src={live.thumbnailUrl}
                      alt="123"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.src = no_image.src; // Set the source to the fallback image
                      }}
                    />
                  </div>
                </a>
                <div className={styles.second_container}>
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
                    {live.platform === "S" && <img src={soop.src} alt="S" />}
                  </div>
                  <div className={styles.bj_name}>{live.name}</div>
                  <div className={styles.category}>{live.category}</div>
                </div>
                <div className={styles.third_container}>
                  <div className={styles.bj_thumbnail}>
                    <img
                      src={live.profileUrl}
                      alt=""
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.src = no_image_profile.src; // Set the source to the fallback image
                      }}
                    />
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
  );
}
