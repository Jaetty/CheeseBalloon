import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    //   KakaoProvider({
    //     clientId: process.env.KAKAO_CLIENT_ID as string,
    //     clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    //   }),
    //   NaverProvider({
    //     clientId: process.env.NAVER_CLIENT_ID as string,
    //     clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    //   }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
