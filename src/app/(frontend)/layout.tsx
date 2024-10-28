// import UserAuthDropdown from "@/components/UserAuthDropdown";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import type { LayoutProps } from "@/types";
import type { Metadata } from "next";
// import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

const FrontendLayout: React.FC<Readonly<LayoutProps>> = async ({
  children,
}) => {
  // const session = await getServerSession();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="container">
        <Navbar />
      </header>
      <main className="container">{children}</main>
      {/* {session && (
        <div className="fixed bottom-3 right-0 z-50 flex items-center justify-center rounded-l-full border bg-card p-2">
          <UserAuthDropdown user={session?.user} />
        </div>
      )} */}
      <Footer />
    </div>
  );
};

export default FrontendLayout;
