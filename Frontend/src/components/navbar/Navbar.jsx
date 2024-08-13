import "../navbar/navbar.css";
import { Link } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import DarkModeSwitch from "../darkModeSwitch/DarkModeSwitch";

export default function Navbar() {
  return (
    <nav className="navbar__container">
      <div className="px-[10px] py-[10px] sm:px-[30px] sm:py-[10px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BiLink className="text-slate-800 text-xl dark:text-white" />
          <h2 className="text-slate-800 font-medium dark:text-white">
            URL Shortener
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link className="text-slate-800 font-medium text-sm sm:text-base dark:text-white">
            Iniciar sesión
          </Link>
          <Link className="text-slate-800 font-medium text-sm sm:text-base dark:text-white">
            Registrarse
          </Link>
          <div>
            <DarkModeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}
