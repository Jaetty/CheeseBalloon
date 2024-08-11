"use client";

import { useRouter } from "next/navigation";
import kakaoLogin from "src/stores/kakao_login_large_narrow.png";
import logo from "public/svgs/logo.png";
import styles from "src/app/(login)/login/page.module.scss";

const googleRestApiKey = process.env.NEXT_PUBLIC_GOOGLE_REST_API;
const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
const kakaoRestApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API;
const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export default function Login() {
  const router = useRouter();
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
  const googleURL = `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=email+profile&client_id=${googleRestApiKey}&redirect_uri=${googleRedirectUri}`;
  const handleLogin = (provider: string) => {
    if (provider === "google") {
      router.replace(googleURL);
    } else if (provider === "kakao") {
      router.replace(kakaoURL);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <video className={styles.video} muted autoPlay loop>
          <source src="/videos/login.mp4" type="video/mp4" />
        </video>
        <div className={styles.video_descript}>Welcome to CheeseBalloon</div>
      </div>
      <div className={styles.right}>
        <div className={styles.right_title}>
          <img src={logo.src} alt="asfd" />
        </div>
        <div className={styles.social_login}>
          <div className={styles.sub}>소셜 로그인</div>
          <div className={styles.login_button}>
            {/* <button type="button" onClick={() => handleLogin("google")}>
              구글 로그인
            </button> */}
            <img
              className={styles.login_img}
              src={kakaoLogin.src}
              alt="ss"
              onClick={() => handleLogin("kakao")}
              role="presentation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
