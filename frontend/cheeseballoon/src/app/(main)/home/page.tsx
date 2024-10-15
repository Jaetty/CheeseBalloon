/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
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
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// 이미지 임포트 및 기타 설정
import a_icon from "src/stores/afreeca.ico";
import c_icon from "src/stores/chee_icon.png";
import no_image from "src/stores/no_image.png";
import no_image_profile from "src/stores/no_image_profile.png";
import on_air from "src/stores/on_air.png";

interface DataContext {
  platform: "S" | "C"; // 플랫폼을 나타내는 문자열
}

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

interface ApiResponseItem {
  streamerId: number;
  averageViewer: number;
  date: string;
  profileUrl: string;
  platform: string;
}

interface StreamerData {
  averageViewer: number;
  profileUrl: string;
  platform: string;
}

interface AllData {
  [date: string]: {
    [streamerId: string]: StreamerData;
  };
}

interface ResponseItem {
  date: string;
  dataList: {
    name: string;
    average_viewer: number;
    profile_url: string;
    platform: string;
  }[];
}

export default function Home() {
  const a_icon_real = a_icon.src;
  const c_icon_real = c_icon.src;
  const [liveData, setLiveData] = useState<live_data>({ data: null });
  const [rankings, setRankings] = useState<Streamer[]>([]);
  const [platform, setPlatform] = useState<"C" | "S">("C");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(a_icon_real);
  const cheese_api = process.env.NEXT_PUBLIC_CHEESEBALLOON_API;
  const rank_api = process.env.NEXT_PUBLIC_AVG_RANK;
  const [barchartData, setBarchartData] = useState<AllData | null>(null);

  // /live 데이터 가져오기
  useEffect(() => {
    fetch(`${cheese_api}/live?offset=0&limit=100`)
      .then((response) => response.json())
      .then((data) => setLiveData(data));
  }, [cheese_api]);

  // 랭킹 데이터 가져오기
  const fetchRankings = async (platform: "C" | "S") => {
    try {
      const response = await fetch(`${rank_api}?date=3&platform=${platform}`);
      const data = await response.json();
      if (data.status === "OK") {
        setRankings(data.data.slice(0, 9));
      }
    } catch (error) {
      // console.error("Error fetching rankings:", error);
    }
  };

  useEffect(() => {
    fetchRankings(platform);
  }, [platform]);

  // BarChart 데이터를 가져오는 useEffect
  useEffect(() => {
    fetch(`${cheese_api}/live/barchart`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        // console.log("Fetched data:", responseData); // 서버 응답 데이터 출력

        if (responseData.status === "OK") {
          // status 확인
          const newAllData: AllData = {};

          responseData.data.forEach((item: ResponseItem) => {
            // data 처리
            const { date, dataList } = item;
            if (!newAllData[date]) {
              newAllData[date] = {};
            }

            dataList.forEach((streamer) => {
              let { name, average_viewer, profile_url, platform } = streamer;
              name = name.replace(/\[/g, "[[").replace(/\]/g, "]]");
              newAllData[date][name] = {
                averageViewer: average_viewer,
                profileUrl: profile_url,
                platform: platform,
              };
            });
          });

          // console.log("Processed barchartData:", newAllData); // 변환된 데이터 출력
          setBarchartData(newAllData);
        } else {
          // console.error("Error:", responseData.message); // status가 OK가 아닌 경우 에러 처리
        }
      })
      .catch((error) => {
        // console.error("There was a problem with the fetch operation:", error);
      });
  }, [cheese_api]);

  // amCharts 설정 useEffect
  useEffect(() => {
    const root = am5.Root.new("chartdiv");

    root.numberFormatter.setAll({
      numberFormat: "#",
      bigNumberPrefixes: [
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ],
      smallNumberPrefixes: [],
    });

    const stepDuration = 2000;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 100,
      })
    );

    chart.plotContainer.set(
      "background",
      am5.RoundedRectangle.new(root, {
        fill: am5.color("#313338"),
        opacity: 0.5,
        cornerRadiusBL: 5,
        cornerRadiusTL: 5,
        cornerRadiusBR: 10,
        cornerRadiusTR: 10,
      })
    );
    chart.zoomOutButton.set("forceHidden", true);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 20,
      inversed: true,
      minorGridEnabled: true,
    });

    yRenderer.grid.template.set("visible", false);

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "name", // 'network'에서 'name'으로 수정
        renderer: yRenderer,
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color("#FFFFFF"),
      text: "{category}",
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        strictMinMax: true,
        extraMax: 0.06,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );
    // x축 그리드 선의 색을 설정 (예: 파란색)
    xAxis.get("renderer").grid.template.setAll({
      stroke: am5.color("#808080"), // 원하는 색상 코드로 변경 가능
    });

    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color("#FFFFFF"),
    });

    xAxis.set("interpolationDuration", stepDuration / 10);
    xAxis.set("interpolationEasing", am5.ease.linear);

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        categoryYField: "name", // 'network'에서 'name'으로 수정
      })
    );

    series.columns.template.setAll({
      cornerRadiusBR: 5,
      cornerRadiusTR: 5,
    });

    // 막대의 색상을 초록색과 파란색 두 가지로 설정

    series.columns.template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem;

      if (dataItem) {
        // dataContext의 타입을 명시적으로 지정
        const context = dataItem.dataContext as DataContext;

        if (context.platform === "S") {
          const platformColor = am5.color("#6794DC" as any); // 파란색
          target.set("stroke", platformColor); // stroke 색상 설정
          return platformColor;
        } else if (context.platform === "C") {
          const platformColor = am5.color("#67DC75" as any); // 초록색
          target.set("stroke", platformColor); // stroke 색상 설정
          return platformColor;
        }
      }

      return fill;
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueXWorking.formatNumber('#. a')}",
          fill: root.interfaceColors.get("alternativeText"),
          centerX: am5.p100,
          centerY: am5.p50,
          populateText: true,
        }),
      });
    });

    const label = chart.plotContainer.children.push(
      am5.Label.new(root, {
        fontSize: "4em",
        fill: am5.color("#FFFFFF"),
        opacity: 0.2,
        x: am5.p100,
        y: am5.p100,
        centerY: am5.p100,
        centerX: am5.p100,
      })
    );

    function getSeriesItem(category: string) {
      for (let i = 0; i < series.dataItems.length; i++) {
        const dataItem = series.dataItems[i];
        if (dataItem.get("categoryY") === category) {
          return dataItem;
        }
      }
    }

    function sortCategoryAxis() {
      series.dataItems.sort(
        (x, y) => (y.get("valueX") ?? 0) - (x.get("valueX") ?? 0)
      ); // Optional chaining으로 get 호출

      am5.array.each(yAxis.dataItems, (dataItem) => {
        // category가 undefined일 경우 빈 문자열로 처리
        const category = dataItem?.get("category") ?? "";
        const seriesDataItem = getSeriesItem(category); // 이제 category는 항상 string 타입

        if (seriesDataItem) {
          const index = series.dataItems.indexOf(seriesDataItem);
          const deltaPosition =
            (index - (dataItem?.get("index", 0) ?? 0)) /
            series.dataItems.length;
          if (dataItem?.get("index") !== index) {
            dataItem.set("index", index);
            dataItem.set("deltaPosition", -deltaPosition);
            dataItem.animate({
              key: "deltaPosition",
              to: 0,
              duration: stepDuration / 2,
              easing: am5.ease.out(am5.ease.cubic),
            });
          }
        }
      });

      yAxis.dataItems.sort(
        (x, y) => (x.get("index") ?? 0) - (y.get("index") ?? 0)
      ); // Optional chaining으로 get 호출
    }

    let currentDateIndex = 0;
    const dateKeys = barchartData ? Object.keys(barchartData) : [];

    const interval = setInterval(() => {
      currentDateIndex++;

      // 마지막 데이터를 받을 때도 updateData를 호출하여 차트를 업데이트
      if (currentDateIndex >= dateKeys.length - 1) {
        updateData(); // 마지막 데이터를 적용
        setTimeout(() => {
          clearInterval(interval);
          clearInterval(sortInterval);
        }, stepDuration); // 애니메이션이 끝날 시간을 줌
      } else {
        updateData(); // 정상적인 데이터 업데이트
      }
    }, stepDuration);

    const sortInterval = setInterval(() => {
      sortCategoryAxis();
    }, 100);

    // function escapeLabelText(text: string) {
    //   return text.replace(/\[/g, "[[").replace(/\]/g, "]]");
    // }

    function setInitialData() {
      if (!barchartData || !dateKeys[currentDateIndex]) return;

      const currentDate = dateKeys[currentDateIndex];
      const d = barchartData[currentDate];

      for (const n in d) {
        series.data.push({
          name: n, // name을 y축에 사용하도록 설정
          value: d[n].averageViewer,
          profileUrl: d[n].profileUrl,
          platform: d[n].platform,
        });
        yAxis.data.push({ name: n });
      }
    }

    function updateData() {
      let itemsWithNonZero = 10;
      if (!barchartData || !dateKeys[currentDateIndex]) return;

      const currentDate = dateKeys[currentDateIndex];
      label.set("text", currentDate);

      am5.array.each(series.dataItems, (dataItem) => {
        const category = dataItem.get("categoryY");

        // category 또는 barchartData[currentDate][category]가 존재하는지 확인
        if (category && barchartData[currentDate]?.[category]) {
          const value = barchartData[currentDate][category]?.averageViewer || 0;

          dataItem.animate({
            key: "valueX",
            to: Math.round(value),
            duration: stepDuration,
            easing: am5.ease.linear,
          });
          dataItem.animate({
            key: "valueXWorking",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          });
        } else {
          // console.warn("Category or barchartData entry is undefined");
        }
      });

      yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
    }

    setInitialData();
    setTimeout(() => {
      currentDateIndex++;
      updateData();
    }, 50);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [barchartData]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.border}>
          <Link href="/notice" className={styles["notice-link"]}>
            <div className={styles.notice}>
              <div className={styles.content}>
                <div className={styles.pin}>공지</div>
                <div className={styles.notice_title}>
                  치즈벌룬에 오신 것을 환영합니다
                </div>
                <div className={styles.date}>2024.09.25</div>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.ranking}>
          <div className={styles.title}>
            <p>일일 평균 시청자 수 랭킹</p>
          </div>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
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
