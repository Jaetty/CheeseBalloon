"use client";

/* eslint-disable camelcase */

import kakao_login from "src/stores/kakao_login_large_narrow.png";
import logo from "public/svgs/logo.png";
import styles from "src/app/(login)/login/page.module.scss";

export default function Login() {
  const rest_api_key = process.env.NEXT_PUBLIC_KAKAO_REST_API;
  const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  // const handleLogin = () => {
  //   window.location.href = kakaoURL;
  // };
  const handleLogin = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    alert("로그인 기능 개발 중입니다. 이용이 일시적으로 제한됩니다.");
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
            <img
              className={styles.login_img}
              src={kakao_login.src}
              alt="ss"
              onClick={handleLogin}
              role="presentation"
            />
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
