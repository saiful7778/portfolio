import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import StateContextProvider from "@/context/StateContext";
import { ReactNode } from "react";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <StateContextProvider>
      <header className="container">
        <Navbar />
      </header>
      <main className="container">{children}</main>
      <Footer />
    </StateContextProvider>
  );
}
