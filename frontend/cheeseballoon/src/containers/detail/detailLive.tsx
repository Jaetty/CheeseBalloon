"use client";

const API_URL = process.env.NEXT_PUBLIC_LIVE_CHECK_API_URL;

interface response {
  data: {
    live: boolean;
    streamUrl: string;
    thumbnailUrl: string;
  };
}

async function getData() {
  const res = await fetch(`${API_URL}1369`);

  return res.json();
}

export default async function DetailLive() {
  const data: response = await getData();

  return (
    <div>
      {data.data.live ? (
        <div>
          <div>라이브</div>
          <hr />
        </div>
      ) : null}
    </div>
  );
}
