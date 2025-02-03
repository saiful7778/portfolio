"use client";

import { ThemeProvider } from "next-themes";

const ThemeContext: React.FC<
  {
    children: React.ReactNode;
  } & React.ComponentProps<typeof ThemeProvider>
> = ({ children, ...props }) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default ThemeContext;
