import type { Metadata } from "next";
import { Inter } from "next/font/google";
import bannerImage from "../../public/saiful-islam-portfolio-banner.png";
import type { LayoutProps } from "@/types";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saiful Islam - Portfolio",
  description: "This is Saiful Islam personal portfolio website.",
  openGraph: {
    title: "Saiful Islam - Portfolio",
    description: "This is Saiful Islam personal portfolio website.",
    images: bannerImage.src,
  },
  authors: [
    {
      name: "Saiful Islam",
      url: "https://www.linkedin.com/in/saiful-islam-0471b924b",
    },
  ],
};

const RootLayout: React.FC<Readonly<LayoutProps>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-background w-full relative text-foreground selection:bg-primary selection:text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
