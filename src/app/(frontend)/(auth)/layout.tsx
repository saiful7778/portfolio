import StateContextProvider from "@/context/StateContext";
import { defaultLoginRedirect } from "@/lib/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  if (!!session?.user) {
    redirect(defaultLoginRedirect);
  }
  return (
    <StateContextProvider>
      <div className="mx-auto my-16 w-full max-w-sm rounded-md border bg-card p-4 text-card-foreground shadow-sm">
        {children}
      </div>
    </StateContextProvider>
  );
}
