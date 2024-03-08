"use client";
import getSettings from "@/lib/actions/settings/getSettings";
import { createContext, useLayoutEffect, useState } from "react";

export const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [reFetch, setReFetch] = useState(false);
  const [showReCaptcha, setShowReCaptcha] = useState({
    show: "off",
    page: [],
  });
  const [blockPage, setBlockPage] = useState([]);

  const handleReFetch = () => setReFetch((l) => !l);

  useLayoutEffect(() => {
    (async () => {
      const settings = await getSettings();
      if (settings) {
        if (settings.reCaptcha === "on") {
          setShowReCaptcha({
            show: "on",
            page: [],
          });
        } else if (settings.reCaptcha === "custom") {
          setShowReCaptcha({
            show: "custom",
            page: settings.reCaptchaOnPage,
          });
        } else {
          setShowReCaptcha({
            show: "off",
            page: [],
          });
        }
        if (settings.blockPage) {
          setBlockPage(settings.blockPage);
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
        blockPage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
