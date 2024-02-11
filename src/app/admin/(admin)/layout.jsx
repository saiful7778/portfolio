import cn from "@/lib/cn";
import useStateData from "@/hooks/useStateData";

const ClientAdminLayout = ({ children }) => {
  const { sidebar } = useStateData();
  return (
    <main
      className={cn(
        "mt-10 p-2 duration-300",
        sidebar ? "md:ml-36" : "md:ml-[43px]",
      )}
    >
      {children}
    </main>
  );
};

export default ClientAdminLayout;
