import { useEffect } from "react";

const ThemeHandler = () => {
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }, []);

  return null; // This component just sets the theme, no UI needed
};

export default ThemeHandler;
