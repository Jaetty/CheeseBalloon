import styles from "src/components/nav/item/FavCard.module.scss";
import Image from "next/image";
import chzzk from "public/svgs/chzzk.svg";
import aflogo from "public/svgs/afreeca.svg";
import { useToggleState } from "src/stores/store";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { LiveData } from "src/types/type";
import noimage from "public/svgs/blank_profile.png";
import Link from "next/link";

type Props = {
  data: LiveData | undefined;
};

function noop() {}

const fixProfileUrl = (url: string) => {
  if (url === "default" || url === "None") {
    return noimage.src;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return url;
};

export default function RecomendCard({ data }: Props) {
  const { value } = useToggleState();
  const [isHovered, setIsHovered] = useState(false);
  const [modalStyle, setModalStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");

  const handleImageError = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PF_UPDATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ streamer_id: id }),
      });
      const datas = await response.json();
      const newProfileUrl = datas.detail.profile_url;
      if (newProfileUrl) {
        setProfileUrl(fixProfileUrl(newProfileUrl));
      }
    } catch (error) {
      noop();
    }
  };

  useEffect(() => {
    if (data) {
      setProfileUrl(fixProfileUrl(data.profileUrl));
    }
  }, [data]);

  useLayoutEffect(() => {
    if (containerRef.current && isHovered) {
      const { top, left } = containerRef.current.getBoundingClientRect();
      setModalStyle({
        top: `${top}px`,
        left: `${left + 60}px`,
      });
    }
  }, [isHovered]);

  return (
    <Link href={data?.streamUrl || ""} className={styles.link} target="_blank">
      <div>
        {value && (
          <div className={styles.open_container}>
            <div className={styles.on_image}>
              <Image
                src={profileUrl || noimage.src}
                alt=""
                width={28}
                height={28}
                onError={() => {
                  if (data?.streamId !== undefined) {
                    handleImageError(data.streamId);
                  }
                }}
              />
            </div>
            <div>
              <div className={styles.content}>
                <div className={styles.titledisc}>{data?.name}</div>
                {data?.platform === "A" || data?.platform === "S" ? (
                  <Image src={aflogo} alt="" width={14} height={14} />
                ) : (
                  <Image src={chzzk} alt="" width={14} height={14} />
                )}
              </div>
              <div className={styles.subcontent}>{data?.category}</div>
            </div>

            <div className={styles.viewer}>
              {data?.viewerCnt.toLocaleString()}
            </div>
          </div>
        )}
        {!value && (
          <div
            className={styles.closed_container}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={containerRef}
          >
            <div className={styles.on_image}>
              <Image
                src={profileUrl || noimage.src}
                alt=""
                width={32}
                height={32}
                onError={() => {
                  if (data?.streamId !== undefined) {
                    handleImageError(data.streamId);
                  }
                }}
              />
            </div>
            {isHovered && (
              <div className={styles.description_modal} style={modalStyle}>
                <div className={styles.modal_container}>
                  <div className={styles.content}>
                    <div className={styles.closed_titledisc}>{data?.name}</div>
                    {data?.platform === "A" || data?.platform === "S" ? (
                      <Image src={aflogo} alt="" width={14} height={14} />
                    ) : (
                      <Image src={chzzk} alt="" width={14} height={14} />
                    )}
                  </div>
                  <div className={styles.viewer}>
                    {data?.viewerCnt.toLocaleString()}
                  </div>
                </div>
                <div className={styles.modal_subcontent}>{data?.category}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
