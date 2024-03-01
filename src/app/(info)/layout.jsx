import StateProvider from "@/context/StateContext";
import Footer from "../sections/Footer";
import Navbar from "../sections/Navbar";

const InfoLayout = ({ children }) => {
  return (
    <StateProvider>
      <header>
        <Navbar />
      </header>
      <main className="mt-16 p-2">{children}</main>
      <footer>
        <Footer />
      </footer>
    </StateProvider>
  );
};

export default InfoLayout;
