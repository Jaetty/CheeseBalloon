/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */

"use client";

/* eslint-disable camelcase */

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "src/styles/page.module.css";

// eslint-disable-next-line camelcase
import a_icon from "src/stores/afreeca.ico";
import c_icon from "src/stores/chee_icon.png";
import cnt from "src/stores/cnt_icon.png";
import no_image from "src/stores/no_image.png";
import no_image_profile from "src/stores/no_image_profile.png";
import on_air from "src/stores/on_air.png";
import first from "src/stores/1st_image.png";
import second from "src/stores/2nd_image.png";
import third from "src/stores/3rd_image.png";

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

interface Streamer {
  streamerId: number;
  name: string;
  rank: number;
  platform: string;
  profileUrl: string;
  averageViewer: number;
  rankDiff: number;
  diff: number;
  bookmark: boolean;
}

export default function Home() {
  const a_icon_real = a_icon.src;
  const c_icon_real = c_icon.src;
  const [liveData, setLiveData] = useState<live_data>({
    data: null,
  });
  const [rankings, setRankings] = useState<Streamer[]>([]);
  const [platform, setPlatform] = useState<"C" | "S">("C"); // 플랫폼 상태 추가
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(a_icon_real);
  const cheese_api = process.env.NEXT_PUBLIC_CHEESEBALLOON_API;
  const rank_api = process.env.NEXT_PUBLIC_AVG_RANK;

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
  const fetchRankings = async (platform: "C" | "S") => {
    try {
      const response = await fetch(`${rank_api}?date=3&platform=${platform}`);
      const data = await response.json();
      if (data.status === "OK") {
        setRankings(data.data.slice(0, 9)); // 1~9위까지의 데이터 사용
        // console.log(rankings);
      }
    } catch (error) {
      // console.error("Error fetching rankings:", error);
    }
  };

  const handleClick = () => {
    setLoading(true);
    setLoadingImage(platform === "C" ? a_icon_real : c_icon_real);
    setPlatform((prevPlatform) => (prevPlatform === "C" ? "S" : "C"));
  };

  useEffect(() => {
    fetchRankings(platform);
  }, [platform]); // 플랫폼이 변경될 때마다 fetchRankings 호출
  // console.log(liveData);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1600); // 로딩 시간 설정 (1초)
      return () => clearTimeout(timer);
    }
  }, [platform]);

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
        {/* <div className={styles.ranking}>
          <div className={styles.title}>일일 시청률 랭킹</div>
          <div className={styles.sub_title}>
            <p className={styles.toggleText} onClick={handleClick}>
              {platform === "C" ? (
                <>
                  <img
                    src="https://cdn.mhns.co.kr/news/photo/202401/570626_699706_5828.png"
                    alt="cheese Icon"
                    className={`${styles.text_icon} ${styles.bounce}`}
                  />
                  치치직의 일일 시청자수 랭킹입니다.
                </>
              ) : (
                <>
                  <img
                    src={a_icon.src}
                    alt="Afreeca Icon"
                    className={`${styles.text_icon} ${styles.bounce}`}
                  />
                  아프리카의 일일 시청자수 랭킹입니다.
                </>
              )}
            </p>
          </div>
        </div>
        <div className={styles.leaderboard}>
          {loading ? (
            <div className={styles.leaderboard_loading}>
              <img
                src={loadingImage}
                alt="Loading Icon"
                className={styles.loadingIcon}
              />
            </div>
          ) : (
            <div className={styles.leaderboard_content}>
              <div className={styles.topThree}>
                {rankings[1] && (
                  <div className={`${styles.rankItem} ${styles.second}`}>
                    <div className={`${styles.rank} ${styles.silver}`}>2nd</div>
                    <a
                      href={`https://cheeseballoon.site/detail/${rankings[1].streamerId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.hyper_link}
                    >
                      <img
                        src={rankings[1].profileUrl}
                        className={styles.profileMedium}
                        alt="Profile"
                      />
                    </a>
                    <div className={styles.info}>
                      <a
                        href={`https://cheeseballoon.site/detail/${rankings[1].streamerId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.hyper_link}
                      >
                        <div className={styles.name}>{rankings[1].name}</div>
                      </a>
                      <div className={styles.id}>
                        {rankings[1].averageViewer}
                      </div>
                    </div>
                    <img
                      src={second.src}
                      className={styles.rankImage}
                      alt="2nd"
                    />
                  </div>
                )}
                {rankings[0] && (
                  <div className={`${styles.rankItem} ${styles.first}`}>
                    <div className={`${styles.rank} ${styles.gold}`}>1st</div>
                    <a
                      href={`https://cheeseballoon.site/detail/${rankings[0].streamerId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.hyper_link}
                    >
                      <img
                        src={rankings[0].profileUrl}
                        className={styles.profileLarge}
                        alt="Profile"
                      />
                    </a>
                    <div className={styles.info}>
                      <a
                        href={`https://cheeseballoon.site/detail/${rankings[0].streamerId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.hyper_link}
                      >
                        <div className={styles.name}>{rankings[0].name}</div>
                      </a>
                      <div className={styles.id}>
                        {rankings[0].averageViewer}
                      </div>
                    </div>
                    <img
                      src={first.src}
                      className={styles.rankImage}
                      alt="1st"
                    />
                  </div>
                )}
                {rankings[2] && (
                  <div className={`${styles.rankItem} ${styles.third}`}>
                    <div className={`${styles.rank} ${styles.bronze}`}>3rd</div>
                    <a
                      href={`https://cheeseballoon.site/detail/${rankings[1].streamerId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.hyper_link}
                    >
                      <img
                        src={rankings[2].profileUrl}
                        className={styles.profileMedium}
                        alt="Profile"
                      />
                    </a>
                    <div className={styles.info}>
                      <a
                        href={`https://cheeseballoon.site/detail/${rankings[1].streamerId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.hyper_link}
                      >
                        <div className={styles.name}>{rankings[2].name}</div>
                      </a>
                      <div className={styles.id}>
                        {rankings[2].averageViewer}
                      </div>
                    </div>
                    <img
                      src={third.src}
                      className={styles.rankImage}
                      alt="3rd"
                    />
                  </div>
                )}
              </div>
              <div className={styles.rest}>
                {rankings.map((streamer, index) => (
                  <div key={streamer.streamerId} className={styles.rankItem}>
                    <div className={styles.rank}>{index + 1}th</div>
                    <div className={styles.profileContainer}>
                      <a
                        href={`https://cheeseballoon.site/detail/${streamer.streamerId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.hyper_link}
                      >
                        <img
                          src={streamer.profileUrl}
                          className={styles.profileSmall}
                          alt="Profile"
                        />
                      </a>
                      <div className={styles.info}>
                        <a
                          href={`https://cheeseballoon.site/detail/${streamer.streamerId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.hyper_link}
                        >
                          <div className={styles.name}>{streamer.name}</div>
                        </a>
                        <div className={styles.id}>
                          {streamer.averageViewer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div> */}
        <div className={styles.title}>
          <p>실시간 방송</p>
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
                          <a
                            href={`https://cheeseballoon.site/detail/${live.streamerId}`}
                            className={styles.hyper_link}
                          >
                            <div className={styles.responisve_bj_name}>
                              {live.name}
                            </div>
                          </a>
                        </div>
                        <div className={styles.responsive_category}>
                          <a
                            href={`https://cheeseballoon.site/live?category=${live.category}`}
                            className={styles.hyper_link}
                          >
                            {live.category}
                          </a>
                        </div>
                      </div>
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
