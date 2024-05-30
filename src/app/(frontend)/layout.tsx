import Banner from "@/components/shared/Banner";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
        <Banner />
      </header>
      <main>{children}</main>
    </>
  );
}
