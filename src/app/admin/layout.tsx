import AppSidebar from "@/shared/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import StateContextProvider from "@/context/StateContext";
import Topbar from "@/shared/Topbar";
import type { LayoutProps } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const AdminLayout: React.FC<Readonly<LayoutProps>> = ({ children }) => {
  return (
    <StateContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Topbar />
          <div className="p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </StateContextProvider>
  );
};

export default AdminLayout;
