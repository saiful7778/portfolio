import { EdgeStoreProvider } from "@/context/EdgeStoreContext";
import SessionContextProvider from "@/context/SessionContext";
import StateContextProvider from "@/context/StateContext";
import Link from "next/link";
import { ReactNode } from "react";

export default function BackendLayout({ children }: { children: ReactNode }) {
  return (
    <EdgeStoreProvider>
      <StateContextProvider>
        <SessionContextProvider>
          {children}
          <footer className="border-t border-gray-700 bg-gray-800 p-6 text-center text-sm text-gray-400">
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
