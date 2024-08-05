"use client";

/* eslint-disable camelcase */

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "src/styles/page.module.css";

// eslint-disable-next-line camelcase
import a_icon from "src/stores/afreeca_icon.png";
import cnt from "src/stores/cnt_icon.png";
import soop from "src/stores/soop_icon.png";
import no_image from "src/stores/no_image.png";
import no_image_profile from "src/stores/no_image_profile.png";
import on_air from "src/stores/on_air.png";

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
          <Link href="/notice" className={styles["notice-link"]}>
            <div className={styles.notice}>
              <div className={styles.content}>
                <div className={styles.pin}>공지</div>
                <div className={styles.notice_title}>
                  치즈벌룬에 오신 여러분 환영합니다
                </div>
                <div className={styles.date}>2024.03.04</div>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.ranking}>
          <div className={styles.title}>시청률 랭킹</div>
          <div className={styles.sub_title}>
            <p>최근 30일 기준의 랭킹 변동을 나타내는 그래프입니다</p>
          </div>
          {/* <div className={styles.border}>
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
          </div> */}
        </div>
        <div className={styles.title}>
          <p>LIVE 모아보기</p>
        </div>
        <div className={styles.responsive_live_content}>
          <div className={styles.responsive_live_flexbox}>
            {liveData.data &&
              liveData.data.map((live) => (
                <div key={live.liveId} className={styles.responsive_live_item}>
                  <a
                    href={live.streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.responsive_first_row}>
                      {/* 라이브 썸네일 */}
                      <div className={styles.responsive_live_thumbnail_box}>
                        <img
                          src={live.thumbnailUrl}
                          className={styles.responsive_live_thumbnail}
                          alt="123"
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement, Event>
                          ) => {
                            e.currentTarget.src = no_image.src; // Set the source to the fallback image
                          }}
                        />
                        {/* 가로정렬 */}
                        <div className={styles.responisve_on_air_box}>
                          <img
                            src={on_air.src}
                            alt="on_air"
                            className={styles.responisve_on_air}
                          />
                        </div>
                        <div className={styles.responisve_view}>
                          {live.viewerCnt}명 시청중
                        </div>
                      </div>
                    </div>
                  </a>
                  {/* bj 썸네일 & 제목 & bj 이름 가로정렬 */}
                  <div className={styles.responsive_second_row}>
                    <a
                      href={`https://cheeseballoon.site/detail/${live.streamerId}`}
                      className={styles.hyper_link}
                    >
                      <div className={styles.responisve_bj_thumbnail_box}>
                        <img
                          className={styles.responsive_bj_thumbnail}
                          src={live.profileUrl}
                          alt="ss"
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement, Event>
                          ) => {
                            e.currentTarget.src = no_image_profile.src; // Set the source to the fallback image
                          }}
                        ></img>
                      </div>
                    </a>
                    {/* 제목, bj 이름 세로정렬 */}
                    <div className={styles.responisve_info}>
                      <a
                        href={live.streamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.hyper_link}
                      >
                        <div className={styles.responisve_live_title}>
                          {live.title}
                        </div>
                      </a>
                      <a
                        href={`https://cheeseballoon.site/detail/${live.streamerId}`}
                        className={styles.hyper_link}
                      >
                        <div className={styles.responisve_bj_name}>
                          {live.name}
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className={styles.responsive_third_container}>
                    <div className={styles.responsive_platfrom_box}>
                      {live.platform === "A" && (
                        <img
                          className={styles.responisve_platform}
                          src={a_icon.src}
                          alt="Platform A"
                        />
                      )}
                      {live.platform === "C" && (
                        <img
                          className={styles.responisve_platform}
                          src="https://cdn.mhns.co.kr/news/photo/202401/570626_699706_5828.png"
                          alt="Platform C"
                        />
                      )}
                      {live.platform === "S" && (
                        <img
                          className={styles.responisve_platform}
                          src={a_icon.src}
                          alt="S"
                        />
                      )}
                    </div>
                    <div className={styles.responsive_category}>
                      {live.category}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
