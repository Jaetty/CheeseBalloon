import { Metadata } from "next";
import DetailViewer from "src/containers/detail/DetailViewer";
import style from "src/app/(main)/detail/[id]/page.module.scss";

const STREAMER_API_URL = process.env.NEXT_PUBLIC_STREAMER_API_URL;

export const getData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const streamerData = await getData(`${STREAMER_API_URL}${params.id}`);

  return {
    title: `${streamerData.data.name}`,
    description: `${streamerData.data.name}의 방송기록`,
  };
};

export default function DetailPage() {
  return (
    <div>
      <div className={style.wrapper}>
        <DetailViewer />
      </div>
    </div>
  );
}
