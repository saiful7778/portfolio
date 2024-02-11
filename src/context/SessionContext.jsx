"use client";
import { SessionProvider } from "next-auth/react";

const SessionContext = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionContext;
