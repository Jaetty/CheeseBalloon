"use client";

export default function DetailLive() {
  const isLive = false;

  return (
    <div>
      {isLive ? (
        <div>
          <div>라이브</div>
          <hr />
        </div>
      ) : null}
    </div>
  );
}
