import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Resend, GitHub],
});
