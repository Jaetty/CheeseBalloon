import styles from "src/components/footer/index.module.scss";
import githubmark from "public/svgs/githubmark.svg";
import email from "public/svgs/email.png";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.contactLinks}>
        <a
          href="mailto:cheeseballoon24@gmail.com"
          target="_blank"
          rel="noreferrer"
          aria-label="이메일 링크"
        >
          <Image src={email} alt="" width={33} height={33} />
        </a>
      </div>
      <div className={styles.info}>
        <p>
          본 사이트는 비영리로 운영되며 방송인 데이터 등의 모든 지적재산권은
          각각 치지직과 아프리카(숲)에 있습니다.
        </p>
        <p>
          본 웹사이트는 (주)공게임즈 이사만루체, GMarketSans 폰트를 사용하여
          제작되었습니다.
        </p>
        <p>@2024 cheeseballoon all right reserved. Presented by 푸른소나무</p>
      </div>
    </div>
  );
}
