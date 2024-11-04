"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Card from "src/components/mypage/CardComponent";
import { FavState } from "src/types/type";
import styles from "src/components/mypage/CardCarousel.module.scss";

interface CardCarouselProps {
  data: FavState[];
}

export default function MySwiper({ data }: CardCarouselProps) {
  const [favData, setData] = useState(data);

  if (data.length === 0) {
    return (
      <div className={styles.centerMessage}>
        <p className={styles.centerMessageText}>즐겨찾기 목록이 없습니다</p>
      </div>
    );
  }

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
        {favData.map((item, index) => (
          <SwiperSlide key={index}>
            <Card data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
