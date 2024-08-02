import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     // console.log(token, account, user);
  //     // console.log("jwt 콜백");
  //     if (account && user) {
  //       return {
  //         accessToken: account.access_token,
  //         accessTokenExpires: account.expires_at,
  //         refreshToken: account.refresh_token,
  //         provider: account.provider,
  //         user,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // console.log("session 콜백");
  //     const newSession = {
  //       ...session,
  //       user: token.user || session.user,
  //       accessToken: token.accessToken,
  //       refreshToken: token.refreshToken,
  //       provider: token.provider,
  //     };
  //     return newSession;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
