import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export default function () {
  const [theme, setTheme] = useState(false);

  const handleChangeTheme = () => {
    setTheme(!theme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div>
      {theme ? (
        <MdLightMode
          onClick={handleChangeTheme}
          className="text-yellow-400 dark:text-slate-white cursor-pointer text-[25px] select-none"
        />
      ) : (
        <MdDarkMode
          onClick={handleChangeTheme}
          className="text-gray-600 dark:text-slate-white cursor-pointer text-[25px] select-none"
        />
      )}
    </div>
  );
}
