"use client";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// async function getData() {
//   const res = await fetch(`${API_URL}/streamer/live`);

//   return res.json();
// }

const data = {
  isLive: true,
  streamUrl: 'https://chzzk.naver.com/live/75cbf189b3bb8f9f687d2aca0d0a382b',
  thumbnailUrl: 'https://livecloud-thumb.akamaized.net/chzzk/livecl…570458/thumbnail/image_480.jpg?date=1712037630000',
}

export default async function DetailLive() {
  // const data = await getData();
  return (
    <div>
      {data.isLive ? (
        <div>
          <div>라이브</div>
          <hr />
        </div>
      ) : null}
    </div>
  );
}