import { loginSchema } from "@/schemas/authentication";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import { compare } from "bcrypt";
import authConfig from "@/config/auth.config";

const auth = {
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
  ...authConfig,
};

export default auth;
