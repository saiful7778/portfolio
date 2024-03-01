// next.js package
import Link from "next/link";
// components
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Avatar from "@/components/Avatar";
import Banner from "./sections/Banner";
// others
import getAuth from "@/hooks/getAuth";
import Skills from "./sections/Skills";

const HomePage = async () => {
  const session = await getAuth();
  return (
    <>
      <header>
        <Navbar />
        <Banner />
      </header>
      <main className="my-16 p-2">
        <Skills />
      </main>
      <footer>
        <Footer />
      </footer>
      {session && (
        <div className="fixed bottom-3 right-0 z-50 flex items-center justify-center rounded-l-full border border-gray-700 bg-gray-800 p-2">
          <Link className="block h-8" href="/admin/dashboard">
            <Avatar size="sm" photoURL={session.user.image} />
          </Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
