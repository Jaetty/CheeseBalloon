"use client";

/* eslint-disable camelcase */

// import { signIn, signOut } from "next-auth/react";
import { signInWithGoogle } from "@/src/serverActions/auth";
import logo from "public/svgs/logo.png";
import styles from "src/app/(login)/login2/page.module.scss";

export default function Login() {
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
            <form action={signInWithGoogle}>
              <button type="submit">구글 로그인</button>
            </form>
            {/* <div>
              <button
                type="button"
                onClick={() =>
                  signIn("google")
                }
              >
                구글 로그인
              </button>
            </div> */}
            {/* <div>
              <button
                type="button"
                onClick={() =>
                  signIn("kakao")
                }
              >
                카카오 로그인
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() =>
                  signIn("naver")
                }
              >
                네이버 로그인
              </button>
            </div> */}
            {/* <div>
              <button type="button" onClick={() => signOut()}>
                로그아웃
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
