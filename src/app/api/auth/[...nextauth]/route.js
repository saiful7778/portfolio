import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connectToDB } from "@/lib/server-helper";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../prisma";
import { compare } from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "authentication",
      credentials: {},
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        try {
          await connectToDB();
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
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/authentication/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
