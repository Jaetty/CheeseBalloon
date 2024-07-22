import { NextResponse } from "next/server";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API}?offset=0&limit=15`,
    { next: { revalidate: 300 } }
  );
  const data = await response.json();

  return NextResponse.json(data);
}
