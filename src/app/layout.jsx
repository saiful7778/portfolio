import { Inter } from "next/font/google";
import "./globals.css";
// import TransitionProvider from "@/components/TransitionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Saiful Islam - Portfolio",
  description: "This is Saiful Islam personal portfolio website.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen w-full overflow-x-hidden bg-dark text-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
