import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import db from "@/lib/db";
import { loginSchema } from "@/schemas/authentication";

const authConfig = {
  adapter: PrismaAdapter(db),
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
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const isValid = await loginSchema.isValid(credentials);

        if (!isValid) return null;

        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          const isCorrect = await compare(
            credentials.password,
            user.hashedPassword,
          );

          if (!isCorrect) return null;

          return {
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image.url,
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
};

export default authConfig;
