import styles from "src/components/nav/item/FavCard.module.scss";
import Image from "next/image";
import chzzk from "public/svgs/chzzk.svg";
import aflogo from "src/stores/afreeca.ico";
import { useToggleState } from "src/stores/store";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { LiveData } from "src/types/type";
import noimage from "public/svgs/blank_profile.png";
import Link from "next/link";
import decodeText from "src/lib/DecodeText";

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
                <div className={styles.titledisc}>
                  {decodeText(data?.name as string)}
                </div>
                {data?.platform === "A" || data?.platform === "S" ? (
                  <Image src={aflogo} alt="" width={14} height={14} />
                ) : (
                  <Image src={chzzk} alt="" width={14} height={14} />
                )}
              </div>
              <div className={styles.subcontent}>
                {decodeText(data?.category as string)}
              </div>
            </div>

            <div className={styles.viewer}>
              {data?.viewerCnt.toLocaleString()}
            </div>
          </div>
        )}
        {!value && (
          <div className={styles.closed_container}>
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
            <div className={styles.description_modal}>
              <div className={styles.modal_container}>
                <div className={styles.content}>
                  <div className={styles.closed_titledisc}>
                    {decodeText(data?.name as string)}
                  </div>
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
              <div className={styles.modal_subcontent}>
                {decodeText(data?.category as string)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
