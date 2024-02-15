// next.js package
import { getServerSession } from "next-auth";
import Link from "next/link";
// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Avatar from "@/components/Avatar";
import Banner from "./sections/Banner";
// others
import { authOptions } from "./api/auth/[...nextauth]/route";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <header className="p-2">
        <Navbar />
        <Banner />
      </header>
      <main className="my-16 p-2">
        <h1 className="text-3xl font-bold">Saiful Islam</h1>
      </main>
      <footer>
        <Footer />
      </footer>
      {session && (
        <div className="fixed bottom-3 right-0 z-50 rounded-l-full border border-gray-700 bg-gray-800 p-2">
          <Link className="block h-8" href="/admin/dashboard">
            <Avatar size="sm" photoURL={session.user.image} />
          </Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
