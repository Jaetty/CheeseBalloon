import Cookies from "js-cookie";
import { useAccessToken } from "@/src/stores/store";

const REFRESH_API_URL = process.env.NEXT_PUBLIC_REFRESH_API_URL;

// accessToken 갱신
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  const { setAccessToken } = useAccessToken.getState();

  // refreshToken이 유효하면 accessToken갱신 및 반환
  // refreshToken이 유효하지 않으면 accessToken값 삭제 후 null값 반환
  if (refreshToken) {
    const response = await fetch(`${REFRESH_API_URL}`, {
      method: "POST",
    });
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.data.accessToken);
      return data.data.accessToken;
    }
    setAccessToken(null);
    return null;
  }
  setAccessToken(null);
  return null;
};

// 토큰 확인 후 Header에 담아 보내는 Fetch함수
export default async function customFetch(
  url: string,
  options: RequestInit = {}
) {
  let { accessToken } = useAccessToken.getState();

  // accessToken이 없는 경우, refreshAccessToken 함수 실행
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  // accessToken이 있는 경우, Header에 토큰을 담아 Fetch 실행
  if (accessToken) {
    const headers = new Headers(options.headers || {});
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(url, { ...options, headers });

    // accessToken이 유효하지 않은 경우 refreshAccessToken 함수 실행 후 재시도
    if (response.status === 401) {
      accessToken = await refreshAccessToken();
      // refreshToken이 유효하여 accessToken 갱신이 된 경우, Header 수정 후 fetch 실행 및 response 반환
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
        const newResponse = await fetch(url, { ...options, headers });
        return newResponse;
      }
      // refreshToken이 유효하지 않아 accessToken 갱신이 안된 경우, 토큰 없이 fetch 실행 및 response 반환
      const newResponse = await fetch(url, options);
      return newResponse;
    }

    // accessToken이 유효한 경우 response 반환
    return response;
  }

  // accessToken, refreshToken이 유효하지 않을 때, 토큰 없이 fetch 실행 및 response 반환
  const response = await fetch(url, options);

  return response;
}
