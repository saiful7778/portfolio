import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { EdgeStoreProvider } from "@/context/EdgeStoreContext";
import SessionContextProvider from "@/context/SessionContext";
import StateContextProvider from "@/context/StateContext";
import useAuth from "@/hooks/useAuth";
import { LayoutProps } from "@/types/layoutTypes";
import { Metadata } from "next";
import Link from "next/link";
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
          <footer className="border-t bg-card p-6 text-center text-sm text-muted-foreground">
            <p>
              © 2023 Saiful Islam. All rights reserved by{" "}
              <Link
                className="link"
                href="https://github.com/saiful7778"
                target="_blank"
              >
                Saiful Islam
              </Link>
            </p>
          </footer>
        </SessionContextProvider>
      </StateContextProvider>
    </EdgeStoreProvider>
  );
};

export default BackendLayout;
