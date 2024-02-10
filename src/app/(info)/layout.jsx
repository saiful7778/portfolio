import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const InfoLayout = ({ children }) => {
  return (
    <>
      <header className="p-2">
        <Navbar />
      </header>
      <main className="mt-16 p-2">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default InfoLayout;
