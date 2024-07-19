"use client";

/* eslint-disable camelcase */

import { useSession, signIn, signOut } from "next-auth/react";
import kakao_login from "src/stores/kakao_login_large_narrow.png";
import logo from "public/svgs/logo.png";
import styles from "src/app/(login)/login2/page.module.scss";

export default function Login() {
  const rest_api_key = process.env.NEXT_PUBLIC_KAKAO_REST_API;
  const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
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
            {/* <img
              className={styles.login_img}
              src={kakao_login.src}
              alt="ss"
              onClick={handleLogin}
              role="presentation"
            /> */}
            <div>
              <button
                type="button"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
                  })
                }
              >
                구글 로그인
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() =>
                  signIn("kakao", {
                    callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
                  })
                }
              >
                카카오 로그인
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() =>
                  signIn("naver", {
                    callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
                  })
                }
              >
                네이버 로그인
              </button>
            </div>
            <div>
              <button type="button" onClick={() => signOut()}>
                로그아웃
              </button>
            </div>
          </div>
        </div>
        {/* <div className={styles.sign_in}>
          <div className={styles.sub}>계정이 없으신가요?</div>
          <div className={styles.kakao}>카카오 로고</div>
        </div> */}
      </div>
    </div>
  );
}
