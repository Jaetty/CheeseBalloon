import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://example.com/api", // API의 기본 URL
  timeout: 1000, // 요청의 타임아웃 시간 (밀리초)
  headers: {
    "Content-Type": "application/json", // 요청의 헤더
  },
});

const axiosClient2 = axios.create({
  baseURL: "https://example.com/api", // API의 기본 URL
  timeout: 1000, // 요청의 타임아웃 시간 (밀리초)
  headers: {
    "Content-Type": "application/json", // 요청의 헤더
  },
});

export { axiosClient, axiosClient2 };
