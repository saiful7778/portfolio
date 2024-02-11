import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import SessionContext from "@/context/SessionContext";
import StateProvider from "@/context/StateContext";

export const metadata = {
  title: "Admin - Saiful Islam Portfolio",
  description: "This is admin page of Saiful Islam portfolio website.",
};

const AdminLayout = ({ children }) => {
  return (
    <StateProvider>
      <SessionContext>
        <Topbar />
        <aside>
          <Sidebar />
        </aside>
        {children}
      </SessionContext>
    </StateProvider>
  );
};

export default AdminLayout;
