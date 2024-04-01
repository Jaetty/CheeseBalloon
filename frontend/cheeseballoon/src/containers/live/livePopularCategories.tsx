"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
async function getData() {
  const res = await fetch(
    `${API_URL}live/category/hot?limit=10`
  );

  if (!res.ok) {
    throw new Error("데이터 수신 실패");
  }
  return res.json();
}

export default async function LivePopularCategories() {
  const data = await getData();
  console.log(data.data.categories);
  return <div></div>;
}
