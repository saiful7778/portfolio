import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await useAuth();
  if (session?.user.role !== "admin") {
    redirect("/dashboard");
  }
  return <div>{children}</div>;
}
