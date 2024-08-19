"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Card from "src/components/mypage/CardComponent";
import { FavState } from "src/types/type";
import customFetch from "src/lib/CustomFetch";

export default function MySwiper() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();

      const sortedData = responseData.data.sort(
        (a: FavState, b: FavState) => b.followerCnt - a.followerCnt
      );

      setData(sortedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        slidesPerGroup={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          450: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          1440: {
            slidesPerView: 8,
            slidesPerGroup: 8,
          },
        }}
        modules={[Navigation, Pagination]}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Card data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
