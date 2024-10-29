import authConfig from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default function getAuth() {
  return getServerSession(authConfig);
}
