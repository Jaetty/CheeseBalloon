import { NextRequest, NextResponse, userAgent } from "next/server";

export default function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();
  response.cookies.set("viewport", viewport, { path: "/" });

  if (pathname === "/login") {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return response;
  }

  return response;
}
