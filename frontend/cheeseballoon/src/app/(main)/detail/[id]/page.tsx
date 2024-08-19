import { Metadata } from "next";
import DetailViewer from "src/containers/detail/DetailViewer";
import style from "src/app/(main)/detail/[id]/page.module.scss";

const STREAMER_API_URL = process.env.NEXT_PUBLIC_STREAMER_API_URL;
const SUMMARY_API_URL = process.env.NEXT_PUBLIC_SUMMARY_API_URL;

const getData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const streamerData = await getData(`${STREAMER_API_URL}${params.id}`);
  const summaryData = await getData(`${SUMMARY_API_URL}${params.id}`);

  return {
    title: `${streamerData.data.name}`,
    description: `${streamerData.data.name}의 방송기록. 랭킹: ${summaryData.data.rank}, 평균 시청자: ${summaryData.data.avgViewer}, 팔로워: ${summaryData.data.follow}, 평균 시청률: ${summaryData.data.rating}`,
    keywords: [
      `${streamerData.data.name}`,
      `${streamerData.data.name} 통계`,
      `${streamerData.data.name} 방송 정보`,
      `${streamerData.data.name} 시청자수`,
      `${streamerData.data.name} 평균 시청자수`,
      `${streamerData.data.name} 최고 시청자수`,
      `${streamerData.data.name} 시청률`,
      `${streamerData.data.name} 평균 시청률`,
      `${streamerData.data.name} 최고 시청률`,
      `${streamerData.data.name} 팔로워`,
      `${streamerData.data.name} 팔로워수`,
      `${streamerData.data.name} 방송시간`,
    ],
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
