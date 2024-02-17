import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function getAuth() {
  return getServerSession(authOptions);
}
