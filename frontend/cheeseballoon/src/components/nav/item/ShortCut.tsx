import Image from "next/image";
import notice from "public/svgs/notice.svg";
import live from "public/svgs/live.svg";
import ranking from "public/svgs/rank.svg";
import Link from "next/link";
import style from "src/components/nav/item/ShortCut.module.scss";
import vercel from "public/svgs/vercel.svg";
import { isSignInState } from "src/stores/store";

interface ValueProps {
  value: boolean;
}

export default function Shortcut({ value }: ValueProps) {
  const descriptionClass = value
    ? style.open_description
    : style.closed_description;
  const listItemClass = value ? style.open_listItem : style.closed_listItem;
  const linkDecoClass = value ? style.open_linkdeco : style.closed_linkdeco;
  const navPillClass = value ? style.open_navPill : style.closed_navPill;
  const linkDeco1Class = value ? style.open_linkdeco1 : style.closed_linkdeco;
  const linkDeco2Class = value ? style.open_linkdeco2 : style.closed_linkdeco;
  const isSign = isSignInState((state) => state.isSignIn);

  return (
    <div className={style.fontname}>
      <div className={descriptionClass}>바로가기</div>
      <li className={listItemClass}>
        <Link href="/notice" className={linkDecoClass}>
          <div className={navPillClass}>
            <Image src={notice} alt="" width={20} height={20} />
            <div className={linkDeco1Class}>공지사항</div>
          </div>
        </Link>
      </li>
      <li className={listItemClass}>
        <Link href="/ranking" className={linkDecoClass}>
          <div className={navPillClass}>
            <Image src={ranking} alt="" width={20} height={20} />
            <div className={linkDeco2Class}>방송 랭킹</div>
          </div>
        </Link>
      </li>
      <li className={listItemClass}>
        <Link href="/live" className={linkDecoClass}>
          <div className={navPillClass}>
            <Image src={live} alt="" width={20} height={20} />
            <div className={linkDecoClass}>실시간 방송</div>
          </div>
        </Link>
      </li>
      {isSign && (
        <li className={listItemClass}>
          <Link href="/mypage" className={linkDecoClass}>
            <div className={navPillClass}>
              <Image src={vercel} alt="" width={20} height={20} />
              <div className={linkDecoClass}>마이페이지</div>
            </div>
          </Link>
        </li>
      )}
    </div>
  );
}
