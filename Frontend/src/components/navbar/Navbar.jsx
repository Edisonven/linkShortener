import "../navbar/navbar.css";
import { useNavigate } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import DarkModeSwitch from "../darkModeSwitch/DarkModeSwitch";
import { useSelector } from "react-redux";
import Invited from "../invited/Invited";
import Perfil from "../perfil/Perfil";
import logo from "/images/application/logo.png";

export default function Navbar() {
  const userToken = useSelector((state) => state.userToken.token);
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <nav className="navbar__container bg-white dark:bg-[#161B22] shadow-sm dark:shadow-gray-800 h-[60px]">
      <div className="h-full px-[10px] py-[10px] sm:px-[30px] sm:py-[10px] flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2">
          <p className="text-slate-800 dark:text-white font-semibold">Short</p>
          <figure className="cursor-pointer" onClick={handleNavigateToHome}>
            <img
              className="w-full max-w-[50px] hover:scale-110 transition duration-300"
              src={logo}
              alt=""
            />
          </figure>
          <p className="text-slate-800 dark:text-white font-semibold">URL</p>
        </div>
        <div className="flex items-center gap-2">
          {userToken ? <Perfil /> : <Invited />}
          <DarkModeSwitch />
        </div>
      </div>
    </nav>
  );
}
