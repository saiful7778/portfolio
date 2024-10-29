"use client";
import type { LayoutProps } from "@/types";
import { SessionProvider } from "next-auth/react";

const SessionContextProvider: React.FC<Readonly<LayoutProps>> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionContextProvider;
