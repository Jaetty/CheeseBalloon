import { Metadata } from "next";
import DetailViewer from "src/containers/detail/DetailViewer";
import style from "src/app/(main)/detail/[id]/page.module.scss";

const STREAMER_API_URL = process.env.NEXT_PUBLIC_STREAMER_API_URL;

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const response = await fetch(`${STREAMER_API_URL}${params.id}`);
  const streamerData = await response.json();

  return {
    title: `${streamerData.name}`,
    description: `${streamerData.name}의 방송기록`,
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
