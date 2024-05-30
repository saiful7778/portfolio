import Banner from "@/components/shared/Banner";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="container">
        <Navbar />
        <Banner />
      </header>
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}
