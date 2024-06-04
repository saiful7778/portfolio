import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto my-16 w-full max-w-sm rounded-md border bg-card p-4 text-card-foreground shadow-sm">
      {children}
    </div>
  );
}
