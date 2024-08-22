import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

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
    <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-full hover:brightness-90 transition-[filer] duration-300 shadow">
      {theme === "light" ? (
        <MdLightMode
          onClick={handleChangeTheme}
          className="text-yellow-500 dark:text-slate-white cursor-pointer text-[25px] select-none"
        />
      ) : (
        <MdDarkMode
          onClick={handleChangeTheme}
          className="text-gray-400 dark:text-slate-white cursor-pointer text-[25px] select-none"
        />
      )}
    </div>
  );
}
