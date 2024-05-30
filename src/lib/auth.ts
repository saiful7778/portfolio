import { AuthOptions, User } from "next-auth";
import { LoginSchema } from "@/lib/schemas/auth";
import Credentials from "next-auth/providers/credentials";
import db from "@/lib/db";
import { compare } from "bcrypt";

const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        try {
          const user = await db.user.findFirst({
            where: { email: email },
            include: {
              image: true,
            },
          });

          if (!user) return null;

          const passwordsMatch = await compare(password, user.hashedPassword);

          if (!passwordsMatch) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image[0]?.url || null,
          };
        } catch {
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
