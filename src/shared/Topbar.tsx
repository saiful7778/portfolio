import { SidebarTrigger } from "@/components/ui/sidebar";

const Topbar: React.FC = () => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <SidebarTrigger />
    </header>
  );
};

export default Topbar;
