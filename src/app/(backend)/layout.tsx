import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { EdgeStoreProvider } from "@/context/EdgeStoreContext";
import SessionContextProvider from "@/context/SessionContext";
import StateContextProvider from "@/context/StateContext";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { ReactNode } from "react";

export default async function BackendLayout({
  children,
}: {
  children: ReactNode;
}) {
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
}
