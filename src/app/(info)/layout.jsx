import Footer from "../sections/Footer";
import Navbar from "../sections/Navbar";

const InfoLayout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="px-2">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default InfoLayout;
