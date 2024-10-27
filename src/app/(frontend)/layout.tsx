// import UserAuthDropdown from "@/components/UserAuthDropdown";
// import Footer from "@/components/shared/Footer";
import Navbar from "@/shared/Navbar";
import type { LayoutProps } from "@/types";
// import { getServerSession } from "next-auth";

const FrontendLayout: React.FC<Readonly<LayoutProps>> = async ({
  children,
}) => {
  // const session = await getServerSession();
  return (
    <>
      <header className="container">
        <Navbar />
      </header>
      <main className="container">{children}</main>
      {/* {session && (
        <div className="fixed bottom-3 right-0 z-50 flex items-center justify-center rounded-l-full border bg-card p-2">
          <UserAuthDropdown user={session?.user} />
        </div>
      )} */}
      {/* <Footer /> */}
    </>
  );
};

export default FrontendLayout;
