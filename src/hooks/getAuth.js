import auth from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function getAuth() {
  return getServerSession(auth);
}
