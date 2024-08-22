import { Link } from "react-router-dom";
import useFetchUser from "../../../hooks/users/useFetchUser";
import { BiEdit } from "react-icons/bi";
import { FaKey } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";

export default function MyProfile() {
  const { user } = useFetchUser();
  const formatedName = user?.name ? user.name.split(" ") : [];

  const initial1 = formatedName[0]?.charAt(0).toUpperCase() || "";
  const initial2 = formatedName[1]?.charAt(0).toUpperCase() || "";

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[1000px] mx-auto p-4">
      <h1 className="text-slate-800 dark:text-white font-medium text-[30px] mb-2">
        Mi Perfil
      </h1>
      <div className="max-w-[600px] mx-auto p-6 shadow rounded bg-white dark:bg-[#161B22]">
        <div className="bg-teal-500 w-[200px] h-[200px] mx-auto dark:bg-blue-900">
          <h1 className="text-slate-800 dark:text-white text-[100px] font-medium flex items-center justify-center h-full">
            {initial1 + initial2}
          </h1>
        </div>
        <div className="mt-[60px] flex flex-col gap-4">
          <Link
            aria-label="Editar información del usuario"
            className="text-slate-800 dark:text-white font-normal flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400"
          >
            <BiEdit className="text-[22px] text-green-700" />
            Editar información personal
          </Link>
          <Link
            aria-label="Editar información del usuario"
            className="text-slate-800 dark:text-white font-normal flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400"
          >
            <FaKey className="text-[22px] text-gray-500" />
            Cambiar contraseña
          </Link>
          <Link
            aria-label="Editar información del usuario"
            className="text-slate-800 dark:text-white font-normal flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400"
          >
            <TbTrashXFilled className="text-[22px] text-red-600" />
            Eliminar cuenta
          </Link>
        </div>
      </div>
    </section>
  );
}
