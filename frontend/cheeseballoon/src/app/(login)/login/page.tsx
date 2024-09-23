"use client";

import { useRouter } from "next/navigation";
import logo from "public/svgs/logo.png";
import styles from "src/app/(login)/login/page.module.scss";
import googleLogo from "src/stores/google_logo.png";
import naverLogo from "src/stores/naver_logo.png";
import kakaoLogo from "src/stores/kakao_logo.png";

const googleRestApiKey = process.env.NEXT_PUBLIC_GOOGLE_REST_API;
const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
const kakaoRestApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API;
const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
const naverLoginUrl = process.env.NEXT_PUBLIC_NAVER_LOGIN_URL;

const logos = {
  google: googleLogo.src,
  naver: naverLogo.src,
  kakao: kakaoLogo.src,
};

export default function Login() {
  const router = useRouter();
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
  const googleURL = `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=email+profile&client_id=${googleRestApiKey}&redirect_uri=${googleRedirectUri}`;

  async function getUrl(url: string) {
    const res = await fetch(url);
    const response = await res.json();
    const signInUrl = response.data.naverLoginUrl;

    return signInUrl;
  }

  const handleLogin = async (provider: string) => {
    if (provider === "google") {
      router.replace(googleURL);
    } else if (provider === "kakao") {
      router.replace(kakaoURL);
    } else if (provider === "naver") {
      const naverURL = await getUrl(`${naverLoginUrl}`);

      router.replace(naverURL);
    }
  };

  function loginButton(provider: string, ko: string) {
    return (
      <div
        // role="button"
        // tabIndex={0}
        // onClick={() => handleLogin(provider)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     handleLogin(provider);
        //   }
        // }}
        className={`${styles["login-button-wrapper"]} ${styles[provider]}`}
      >
        <div className={styles["login-button-logo"]}>
          <img
            src={logos[provider as keyof typeof logos]}
            alt={`${provider}`}
            className={styles.logo}
          />
        </div>
        <div className={styles["login-button-text"]}>{ko} 로그인</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.left}>
          <video className={styles.video} muted autoPlay loop>
            <source src="/videos/login.mp4" type="video/mp4" />
          </video>
          <div className={styles.video_descript}>Welcome to CheeseBalloon</div>
        </div> */}
      <div className={styles.right}>
        <div className={styles.right_title}>
          <img src={logo.src} alt="asfd" className={styles.cheeseballoon} />
        </div>
        <div className={styles.sub}>소셜 로그인</div>
        <div className={styles["login-button"]}>
          {loginButton("google", "구글")}
          {/* {loginButton("naver", "네이버")} */}
          {loginButton("kakao", "카카오")}
        </div>
      </div>
    </div>
  );
}
