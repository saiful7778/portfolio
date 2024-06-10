import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toaster from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saiful Islam - Portfolio",
  authors: [
    {
      name: "Saiful Islam",
      url: "https://www.linkedin.com/in/saiful-islam-0471b924b",
    },
  ],
  description: "This is Saiful Islam personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
}
