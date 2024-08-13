import "../navbar/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar__container">
      <div className="px-[30px] py-[10px] flex items-center justify-between">
        <div>
          <h2 className="text-white font-medium">URL Shortener</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link className="text-white font-medium">Iniciar sesión</Link>
          <Link className="text-white font-medium">Registrarse</Link>
        </div>
      </div>
    </nav>
  );
}
