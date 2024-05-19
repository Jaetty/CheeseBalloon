import Image from "next/legacy/image";
import notice from "public/svgs/notice.svg";
import live from "public/svgs/live.svg";
import ranking from "public/svgs/rank.svg";
import Link from "next/link";
import style from "src/components/nav/item/ShortCut.module.scss";
import { useToggleState } from "src/stores/store";

export default function Shortcut() {
  const { value } = useToggleState();

  return (
    <div>
      {value && (
        <div>
          <div className={style.open_description}>바로가기</div>
          <li className={style.open_listItem}>
            <Link href="/notice" className={style.open_linkdeco}>
              <div className={style.open_navPill}>
                <Image src={notice} alt="" width={20} height={20} />
                <div className={style.open_linkdeco}>공지사항</div>
              </div>
            </Link>
          </li>
          <li className={style.open_listItem}>
            <Link href="/ranking" className={style.open_linkdeco}>
              <div className={style.open_navPill}>
                <Image src={ranking} alt="" width={20} height={20} />
                <div className={style.open_linkdeco}>방송 랭킹</div>
              </div>
            </Link>
          </li>
          <li className={style.open_listItem}>
            <Link href="/live" className={style.open_linkdeco}>
              <div className={style.open_navPill}>
                <Image src={live} alt="" width={20} height={20} />
                <div className={style.open_linkdeco}>LIVE 모아보기</div>
              </div>
            </Link>
          </li>
        </div>
      )}
      {!value && (
        <div>
          <div className={style.closed_description}>바로가기</div>
          <li className={style.closed_listItem}>
            <Link href="/notice" className={style.closed_linkdeco}>
              <div className={style.closed_navPill}>
                <Image src={notice} alt="" width={20} height={20} />
                <div className={style.closed_linkdeco}>공지</div>
              </div>
            </Link>
          </li>
          <li className={style.closed_listItem}>
            <Link href="/ranking" className={style.closed_linkdeco}>
              <div className={style.closed_navPill}>
                <Image src={ranking} alt="" width={20} height={20} />
                <div className={style.closed_linkdeco}>랭킹</div>
              </div>
            </Link>
          </li>
          <li className={style.closed_listItem}>
            <Link href="/live" className={style.closed_linkdeco}>
              <div className={style.closed_navPill}>
                <Image src={live} alt="" width={20} height={20} />
                <div className={style.closed_linkdeco}>모아보기</div>
              </div>
            </Link>
          </li>
        </div>
      )}
    </div>
  );
}
