import authConfig from "@/config/auth.config";
import { getServerSession } from "next-auth";

export default async function getAuth() {
  return getServerSession(authConfig);
}
