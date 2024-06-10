import { AuthOptions } from "next-auth";
import { loginSchema } from "@/lib/schemas/auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import db from "./db";

const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        try {
          const user = await db.user.findFirst({
            where: {
              email,
            },
            include: {
              image: true,
            },
          });

          if (!user) return null;

          if (!user.isVerified) return null;

          const passwordsMatch = await compare(password, user.hashedPassword);

          if (!passwordsMatch) return null;

          if (!user?.isVerified) return null;

          if (!user?.access) return null;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user?.image?.url || null,
          };
        } catch {
          return null;
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
    signIn: "/login",
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

export default authConfig;
