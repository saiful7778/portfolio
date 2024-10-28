import type { LayoutProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const AuthLayout: React.FC<Readonly<LayoutProps>> = ({ children }) => {
  return (
    <div className="mx-auto my-16 w-full max-w-md rounded-md border bg-card p-4 shadow-sm">
      {children}
    </div>
  );
};

export default AuthLayout;
