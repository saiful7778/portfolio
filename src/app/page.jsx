import Navbar from "@/components/Navbar";
import Banner from "./sections/Banner";
import Footer from "@/components/Footer";

const HomePage = async () => {
  return (
    <>
      <header className="p-2">
        <Navbar />
        <Banner />
      </header>
      <main className="my-16 p-2">
        <h1>Saiful Islam</h1>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default HomePage;
