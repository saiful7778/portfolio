/* eslint-disable no-unused-vars */
import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: "user" | "admin";
      image?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: "user" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: "user" | "admin";
  }
}
