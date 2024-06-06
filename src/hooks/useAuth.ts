import authConfig from "@/lib/auth";
import { getServerSession } from "next-auth";

export default function useAuth() {
  return getServerSession(authConfig);
}
