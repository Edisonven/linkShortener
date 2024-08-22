import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import DefaultButton from "../buttons/DefaultButton";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("class", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.setAttribute("class", storedTheme);
      setTheme(storedTheme);
    }
  }, []);

  return (
    <DefaultButton
      onClick={handleChangeTheme}
      className="default-button bg-slate-200 dark:bg-slate-800 p-1 rounded-full hover:brightness-90 transition-[filer] duration-300 shadow relative"
    >
      {theme === "light" ? (
        <MdLightMode className="text-yellow-500 dark:text-slate-white cursor-pointer text-[25px] select-none w-full h-full" />
      ) : (
        <MdDarkMode className="text-gray-400 dark:text-slate-white cursor-pointer text-[25px] select-none w-full h-full" />
      )}
    </DefaultButton>
  );
}
