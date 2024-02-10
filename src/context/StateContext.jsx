"use client";
import { createContext, useState } from "react";

export const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [showReCaptcha, setShowReCaptcha] = useState(false);

  const handleShowReCaptcha = () => setShowReCaptcha((prop) => !prop);

  const handleSidebar = () => setSidebar((prop) => !prop);

  return (
    <StateContext.Provider
      value={{
        sidebar,
        handleSidebar,
        showReCaptcha,
        handleShowReCaptcha,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
