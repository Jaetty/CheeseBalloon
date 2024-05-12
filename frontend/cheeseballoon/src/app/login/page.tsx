"use client";

/* eslint-disable camelcase */

import kakao_login from "src/stores/kakao_login_large_narrow.png";
import logo from "../../../public/svgs/logo.png";
import styles from "./page.module.scss";

export default function Login() {
  const Rest_api_key = "7702937d531e0282b892372f6c6fa6f1";
  const redirect_uri = "https://cheeseballoon.site/api/member/login/kakao";
  // oauth 요청 URL

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
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
          <div className={styles.login_button} onClick={handleLogin}>
            <img className={styles.login_img} src={kakao_login.src} alt="ss" />
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
