import useAuth from "@/hooks/useAuth";
import type { LayoutProps } from "@/types/types";
import type { FC, ReactNode } from "react";

interface DashboardPageLayoutProps extends LayoutProps {
  users: ReactNode;
}

const DashboardPageLayout: FC<Readonly<DashboardPageLayoutProps>> = async ({
  children,
  users,
}) => {
  const session = await useAuth();

  return (
    <>
      {children}
      {session?.user.role === "admin" && users}
    </>
  );
};

export default DashboardPageLayout;
