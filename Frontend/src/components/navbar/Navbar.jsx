import "../navbar/navbar.css";
import { Link } from "react-router-dom";
import { BiLink } from "react-icons/bi";

export default function Navbar() {
  return (
    <nav className="navbar__container">
      <div className="px-[10px] py-[10px] sm:px-[30px] sm:py-[10px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BiLink className="text-white text-xl" />
          <h2 className="text-white font-medium">URL Shortener</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link className="text-white font-medium text-sm sm:text-base">
            Iniciar sesión
          </Link>
          <Link className="text-white font-medium text-sm sm:text-base">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}
