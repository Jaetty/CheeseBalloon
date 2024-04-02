"use client";

/* eslint-disable camelcase */

import { useEffect, useState } from "react";
import styles from "./searchresult.module.scss";
import empty from "../../stores/Frame 114.png";
import a_icon from "../../stores/afreeca_icon.png";
import cnt from "../../stores/cnt_icon.png";

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
        followerCnt: number;
        platform: string;
      }[]
    | null;
}

export default function SearchResult() {
  const cheese_api = process.env.NEXT_PUBLIC_CHEESEBALLOON_API;
  const [query, setQuery] = useState<string | null>(""); // query 상태를 설정
  const [searchStreamerResults, setSearchStreamerResults] = useState<data_3>({
    data: null,
  }); // 검색 결과 상태를 설정
  const [searchLiveResults, setSearchLiveResults] = useState<data_2>({
    data: null,
  }); // 검색 결과 상태를 설정

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query_2 = urlSearchParams.get("query");
    setQuery(query_2); // query 값을 상태로 설정

    // API 요청 함수 호출
    fetch(`${cheese_api}/streamer/search?query=${query}`, {
      // mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchStreamerResults(data); // 검색 결과를 상태로 설정
      });
    // .catch((error) => {
    //   console.error("Error fetching search results:", error);
    // });

    // API 요청 함수 호출
    fetch(`${cheese_api}/live/search?query=${query}`, {
      // mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchLiveResults(data); // 검색 결과를 상태로 설정
      });
    // .catch((error) => {
    //   console.error("Error fetching search results:", error);
    // });
  }, [cheese_api, query]); // 빈 배열을 의존성 배열로 지정하여 최초 한 번만 실행되도록 설정
  // console.log(cheese_api);
  // console.log(searchStreamerResults);
  // console.log(searchLiveResults);
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
      <div className={styles.streamer_list}>
        {searchStreamerResults.data &&
          searchStreamerResults.data.map((streamer) => (
            <div key={streamer.streamerId} className={styles.streamer}>
              <div className={styles.streamer_thumbnail}>
                <img src={streamer.profileUrl} alt="" />
              </div>
              <div className={styles.streamer_info}>
                <div className={styles.first_container}>
                  <div className={styles.platform}>
                    {streamer.platform === "A" && (
                      <img src={a_icon.src} alt="Platform A" />
                    )}
                    {streamer.platform === "C" && (
                      <img
                        src="https://cdn.mhns.co.kr/news/photo/202401/570626_699706_5828.png"
                        alt="Platform C"
                      />
                    )}
                  </div>
                  <div className={styles.streamer_name}>{streamer.name}</div>
                </div>
                <div className={styles.followers}>
                  팔로워 {streamer.followerCnt}명
                </div>
              </div>
              <div className={styles.favorites}>
                <img src={empty.src} alt="ss" />
              </div>
            </div>
          ))}
      </div>
      <div className={styles.live_list_title}>LIVE</div>
      <div className={styles.live_list}>
        {searchLiveResults.data &&
          searchLiveResults.data.map((live) => (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.live}>
              <div className={styles.live_thumbnail}>
                <img src={live.thumbnailUrl} alt="123" />
              </div>
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
                </div>
                <div className={styles.bj_name}>{live.name}</div>
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
  );
}
