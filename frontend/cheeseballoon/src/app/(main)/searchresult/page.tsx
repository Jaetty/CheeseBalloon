/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "src/app/(main)/searchresult/searchresult.module.scss";
import empty from "public/svgs/nofav.svg";
import fill from "public/svgs/fav.svg"; // 향후 사용할 이미지
import a_icon from "src/stores/afreeca.ico";
import no_image from "src/stores/no_image.png";
import no_image_profile from "src/stores/no_image_profile.png";
import on_air from "src/stores/on_air.png";
import c_icon from "public/svgs/chzzk.svg";
import Loading from "src/app/loading";

interface data_2 {
  data:
    | {
        streamerId: number;
        liveId: number;
        name: string;
        title: string;
        thumbnailUrl: string;
        platform: string;
        profileUrl: string;
        category: string; // category 속성 추가
        viewerCnt: number;
        streamUrl: string;
        channelUrl: string;
      }[]
    | null;
}

interface data_3 {
  data:
    | {
        streamerId: number;
        name: string;
        isLive: boolean;
        profileUrl: string;
        channelUrl: string;
        follower: number;
        platform: string;
      }[]
    | null;
}

export default function SearchResult() {
  const cheese_api = process.env.NEXT_PUBLIC_CHEESEBALLOON_API;
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [visibleStreamerCount, setVisibleStreamerCount] = useState(12);
  const [streamerIncrement, setStreamerIncrement] = useState(12);
  const [visibleLiveCount, setVisibleLiveCount] = useState(12);
  const [liveIncrement, setLiveIncrement] = useState(12);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [liveStatus, setLiveStatus] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);

  const [searchStreamerResults, setSearchStreamerResults] = useState<data_3>({
    data: null,
  });
  const [searchLiveResults, setSearchLiveResults] = useState<data_2>({
    data: null,
  });

  const loadMoreStreamers = () => {
    setVisibleStreamerCount((prevCount) => {
      const newCount = prevCount + streamerIncrement;
      return newCount > 24 ? 24 : newCount;
    });
  };
  const loadMoreLives = () => {
    setVisibleLiveCount((prevCount) => prevCount + liveIncrement);
  };

  useEffect(() => {
    setVisibleStreamerCount(12);
    setVisibleLiveCount(12);
    setLoading(true);

    const fetchStreamers = fetch(
      `${cheese_api}/streamer/search?query=${query}`,
      {}
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchStreamerResults(data);

        if (data?.data?.length > 0) {
          const liveStatusPromises = data.data.map((streamer: any) =>
            fetch(
              `${cheese_api}/streamer/live?streamerId=${streamer.streamerId}`,
              {}
            )
              .then((response) => response.json())
              .then((liveData) => {
                if (liveData?.data?.live) {
                  setLiveStatus((prevStatus) => ({
                    ...prevStatus,
                    [streamer.streamerId]: true,
                  }));
                }
              })
              .catch((error) => {})
          );

          return Promise.all(liveStatusPromises);
        }
        return undefined;
      })
      .catch((error) => {});

    const fetchLives = fetch(`${cheese_api}/live/search?query=${query}`, {})
      .then((response) => response.json())
      .then((data) => {
        setSearchLiveResults(data);
      })
      .catch((error) => {});

    Promise.all([fetchStreamers, fetchLives])
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [cheese_api, query]);

  if (loading) {
    return (
      <>
        <div className={styles.searchresult1}>
          <div className={styles.top}>
            <p className={styles.title}>검색결과</p>
            <p className={styles.sub_title}>
              입력하신 <span>‘{query}’ </span>을(를) 포함한 스트리머와 LIVE 방송
              결과입니다.
            </p>
          </div>
        </div>
        <Loading />
      </>
    );
  }

  return (
    <div className={styles.searchresult}>
      <div className={styles.top}>
        <p className={styles.title}>검색결과</p>
        <p className={styles.sub_title}>
          입력하신 <span>‘{query}’ </span>을(를) 포함한 스트리머와 LIVE 방송
          결과입니다.
        </p>
      </div>
      <div className={styles.streamer_title}>스트리머</div>
      <div className={styles.test}>
        <div className={styles.streamer_list}>
          {searchStreamerResults.data &&
          searchStreamerResults.data.length > 0 ? (
            searchStreamerResults.data
              .slice(0, visibleStreamerCount)
              .map((streamer) => (
                <div key={streamer.streamerId} className={styles.streamer}>
                  <a
                    href={`https://cheeseballoon.site/detail/${streamer.streamerId}`}
                    className={styles.hyper_link}
                  >
                    <div
                      className={`${styles.streamer_thumbnail} ${liveStatus[streamer.streamerId] ? styles.live_border : ""}`}
                    >
                      <img
                        src={streamer.profileUrl}
                        alt=""
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          e.currentTarget.src = no_image.src;
                        }}
                      />
                    </div>
                  </a>
                  {/* streamer_name, followers, 등 다른 요소들 */}
                  <div className={styles.streamer_info}>
                    <div className={styles.first_container}>
                      <div className={styles.pla_na}>
                        <div className={styles.platform}>
                          {/* 플랫폼 아이콘 */}
                          {streamer.platform === "S" && (
                            <img src={a_icon.src} alt="Platform A" />
                          )}{" "}
                          {streamer.platform === "C" && (
                            <img src={c_icon.src} alt="Platform A" />
                          )}
                        </div>
                        <a
                          href={`https://cheeseballoon.site/detail/${streamer.streamerId}`}
                          className={styles.hyper_link}
                        >
                          <div className={styles.streamer_name}>
                            {streamer.name}
                          </div>
                        </a>
                      </div>
                      <div className={styles.followers}>
                        팔로워 {streamer.follower}명
                      </div>
                    </div>
                  </div>
                  {/* <div
                  className={styles.favorites}
                  onClick={() => {
                    alert("로그인 기능 개발 중입니다.");
                    }}
                  >
                  <img src={empty.src} alt="favorite" />
                </div> */}
                </div>
              ))
          ) : (
            <div className={styles.no_data}>조회된 내역이 없습니다.</div>
          )}
        </div>
        {searchStreamerResults.data &&
          searchStreamerResults.data.length > visibleStreamerCount &&
          visibleStreamerCount < 24 && (
            <div className={styles.more} onClick={loadMoreStreamers}>
              <p>더보기 ▽</p>
            </div>
          )}
      </div>
      <div className={styles.live_list_title}>LIVE</div>
      <div className={styles.responsive_live_content}>
        <div className={styles.responsive_live_flexbox}>
          {searchLiveResults.data && searchLiveResults.data.length > 0 ? (
            searchLiveResults.data.map((live) => (
              <div key={live.liveId} className={styles.responsive_live_item}>
                <a
                  href={live.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.responsive_first_row}>
                    <div className={styles.responsive_live_thumbnail_box}>
                      <img
                        src={live.thumbnailUrl}
                        className={styles.responsive_live_thumbnail}
                        alt="123"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          e.currentTarget.src = no_image.src;
                        }}
                      />
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
                          e.currentTarget.src = no_image_profile.src;
                        }}
                      ></img>
                    </div>
                  </a>
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
                            src={c_icon.src}
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
            ))
          ) : (
            <div className={styles.no_data}>조회된 내역이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
