import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Providers from "@/contexts/Providers";
import CursorFollow from "@/components/CursorFollow";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - Saiful Islam Portfolio",
  description: "This is home page of the Saiful Islam portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${urbanist.variable}`}
        data-new-gr-c-s-check-loaded="14.1220.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
      >
        <Providers>
          {children}
          <CursorFollow />
        </Providers>
      </body>
    </html>
  );
}
