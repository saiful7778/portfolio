"use client";
import type { LayoutProps } from "@/types";
import { createContext, useState } from "react";

interface StateContextProps {
  sidebarCollapse: boolean;
  handleSidebar: (prop?: boolean | undefined) => void;
}

export const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: React.FC<Readonly<LayoutProps>> = ({
  children,
}) => {
  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(false);

  const handleSidebar = (prop?: boolean | undefined) => {
    setSidebarCollapse((prev) => prop || !prev);
  };

  return (
    <StateContext.Provider value={{ sidebarCollapse, handleSidebar }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
