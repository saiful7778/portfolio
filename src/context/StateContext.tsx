"use client";
import getSettings from "@/lib/actions/settings/getSettings";
import { ReactNode, createContext, useLayoutEffect, useState } from "react";

interface StateContextProps {
  sidebar: boolean;
  handleSidebar: () => void;
  showReCaptcha: {
    show: "on" | "off" | "custom";
    page: string[];
  };
  handleReFetch: () => void;
  blockPage: string[];
}

export const StateContext = createContext<StateContextProps | null>(null);

export default function StateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [reFetch, setReFetch] = useState<boolean>(false);
  const [showReCaptcha, setShowReCaptcha] = useState<
    StateContextProps["showReCaptcha"]
  >({
    show: "off",
    page: [],
  });
  const [blockPage, setBlockPage] = useState<string[]>([]);

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

  const handleSidebar = () => setSidebar((prop) => !prop);
  const handleReFetch = () => setReFetch((l) => !l);

  return (
    <StateContext.Provider
      value={{
        sidebar,
        handleSidebar,
        showReCaptcha,
        handleReFetch,
        blockPage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
