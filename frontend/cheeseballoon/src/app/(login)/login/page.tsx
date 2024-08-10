"use client";

import { useRouter } from "next/navigation";
import kakaoLogin from "src/stores/kakao_login_large_narrow.png";
import logo from "public/svgs/logo.png";
import styles from "src/app/(login)/login/page.module.scss";

export default function Login() {
  const router = useRouter();
  const restApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  const handleLogin = () => {
    // event.preventDefault();
    router.replace(kakaoURL);
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
              src={kakaoLogin.src}
              alt="ss"
              onClick={handleLogin}
              role="presentation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
