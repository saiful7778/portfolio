import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../prisma";
import { compare } from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          if (!user?.hashedPassword) return null;

          const isCorrect = await compare(
            credentials.password,
            user.hashedPassword,
          );

          if (isCorrect) {
            return {
              name: user.name,
              email: user.email,
              role: user.role,
              image: user.image.url,
            };
          }
          return null;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/authentication/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (Date.now() >= token.exp * 1000) {
        return null;
      }
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (Date.now() >= token.exp * 1000) {
        return null;
      }
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
