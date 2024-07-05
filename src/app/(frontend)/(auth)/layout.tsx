import StateContextProvider from "@/context/StateContext";
import { defaultLoginRedirect } from "@/lib/routes";
import type { LayoutProps } from "@/types/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const AuthLayout: FC<Readonly<LayoutProps>> = async ({ children }) => {
  const session = await getServerSession();
  if (!!session?.user) {
    redirect(defaultLoginRedirect);
  }
  return (
    <StateContextProvider>
      <div className="mx-auto my-16 w-full max-w-sm rounded-md border bg-card p-4 shadow-sm">
        {children}
      </div>
    </StateContextProvider>
  );
};

export default AuthLayout;
