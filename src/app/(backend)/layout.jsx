import { EdgeStoreProvider } from "@/context/EdgeStoreContext";
import Sidebar from "../sections/Sidebar";
import Topbar from "../sections/Topbar";
import SessionContext from "@/context/SessionContext";
import StateProvider from "@/context/StateContext";

const BackendLayout = ({ children }) => {
  return (
    <EdgeStoreProvider>
      <StateProvider>
        <SessionContext>
          <Topbar />
          <aside>
            <Sidebar />
          </aside>
          {children}
        </SessionContext>
      </StateProvider>
    </EdgeStoreProvider>
  );
};

export default BackendLayout;
