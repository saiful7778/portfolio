import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { EdgeStoreProvider } from "@/context/EdgeStoreContext";
import SessionContextProvider from "@/context/SessionContext";
import StateContextProvider from "@/context/StateContext";
import useAuth from "@/hooks/useAuth";
import type { LayoutProps } from "@/types/types";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const BackendLayout: FC<Readonly<LayoutProps>> = async ({ children }) => {
  const session = await useAuth();
  return (
    <EdgeStoreProvider>
      <StateContextProvider>
        <SessionContextProvider>
          <header>
            <Topbar user={session?.user} />
          </header>
          <Sidebar role={session?.user.role} />
          {children}
        </SessionContextProvider>
      </StateContextProvider>
    </EdgeStoreProvider>
  );
};

export default BackendLayout;
