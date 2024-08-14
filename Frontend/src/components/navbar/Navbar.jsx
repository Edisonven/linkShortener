import "../navbar/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import DarkModeSwitch from "../darkModeSwitch/DarkModeSwitch";

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <nav className="navbar__container bg-white dark:bg-[#161B22] shadow-sm dark:shadow-gray-800">
      <div className="px-[10px] py-[10px] sm:px-[30px] sm:py-[10px] flex items-center justify-between max-w-[1600px] mx-auto">
        <div
          onClick={handleNavigateToHome}
          className="flex items-center gap-3 cursor-pointer"
        >
          <BiLink className="text-slate-800 text-xl dark:text-white" />
          <h2 className="text-slate-800 font-medium dark:text-white">
            URL Shortener
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="sign-in"
            className="text-slate-800 font-medium text-sm sm:text-base dark:text-white"
          >
            Iniciar sesión
          </Link>
          <Link
            to="sign-up"
            className="text-slate-800 font-medium text-sm sm:text-base dark:text-white"
          >
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
