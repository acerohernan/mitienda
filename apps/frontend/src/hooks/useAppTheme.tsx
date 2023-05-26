import { useTheme } from "next-themes";

export function useAppTheme() {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  function handleTheme() {
    setTheme(isLight ? "dark" : "light");
  }

  return { theme, handleTheme, isLight };
}
