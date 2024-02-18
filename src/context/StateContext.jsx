"use client";
import getSettings from "@/lib/DB/getSettings";
import { createContext, useEffect, useState } from "react";

export const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [reFetch, setReFetch] = useState(false);
  const [showReCaptcha, setShowReCaptcha] = useState({
    show: "off",
    page: [],
  });

  const handleReFetch = () => setReFetch((l) => !l);

  useEffect(() => {
    (async () => {
      const res = await getSettings();
      if (res.success) {
        const data = res.data[0];
        if (data.reCaptcha === "on") {
          setShowReCaptcha({
            show: "on",
            page: [],
          });
        } else if (data.reCaptcha === "custom") {
          setShowReCaptcha({
            show: "custom",
            page: data.reCaptchaOnPage,
          });
        } else {
          setShowReCaptcha({
            show: "off",
            page: [],
          });
        }
      }
    })();
  }, [reFetch]);

  const handleShowReCaptcha = () => setShowReCaptcha((prop) => !prop);

  const handleSidebar = () => setSidebar((prop) => !prop);

  return (
    <StateContext.Provider
      value={{
        sidebar,
        handleSidebar,
        showReCaptcha,
        handleShowReCaptcha,
        handleReFetch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
