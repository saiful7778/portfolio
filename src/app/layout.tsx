import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toaster from "@/components/ui/toaster";
import { FC } from "react";
import type { LayoutProps } from "@/types/types";
import bannerImage from "../../public/saiful-islam-portfolio-banner.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saiful Islam - Portfolio",
  authors: [
    {
      name: "Saiful Islam",
      url: "https://www.linkedin.com/in/saiful-islam-0471b924b",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Saiful Islam - Portfolio",
    description: "This is Saiful Islam personal portfolio website.",
    images: bannerImage.src,
  },
  description: "This is Saiful Islam personal portfolio website.",
};

const RootLayout: FC<Readonly<LayoutProps>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-foreground">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
