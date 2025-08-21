"use client";
import { useTheme } from "next-themes";

export const useThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  return { theme, changeTheme };
};
