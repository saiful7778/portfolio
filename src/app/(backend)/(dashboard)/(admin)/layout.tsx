import useAuth from "@/hooks/useAuth";
import { defaultLoginRedirect } from "@/lib/routes";
import type { LayoutProps } from "@/types/types";
import { redirect } from "next/navigation";
import { FC } from "react";

const AdminLayout: FC<Readonly<LayoutProps>> = async ({ children }) => {
  const session = await useAuth();
  if (session?.user.role !== "admin") {
    redirect(defaultLoginRedirect);
  }
  return <div>{children}</div>;
};

export default AdminLayout;
