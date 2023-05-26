import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";

import { useAppTheme } from "../../hooks/useAppTheme";

const ThemeSwitch = () => {
  const { handleTheme, isLight } = useAppTheme();
  const { pathname } = useRouter();

  const isStore = pathname === "/[domain]";

  return (
    <NoSSR>
      {!isStore ? (
        <button
          className="fixed bottom-0 right-0 mx-6 my-6  p-3 bg-dark-900 hover:scale-110 transition-all rounded-full shadow-lg group z-20 bg-white dark:bg-dark-800"
          onClick={handleTheme}
        >
          {isLight ? (
            <MoonIcon className="w-8 h-8 text-dark-500 group-hover:scale-110" />
          ) : (
            <SunIcon className="w-8 h-8 text-white group-hover:scale-1100" />
          )}
        </button>
      ) : null}
    </NoSSR>
  );
};

export default ThemeSwitch;
