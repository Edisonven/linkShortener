import { useState } from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import useDeleteAccount from "../../../hooks/users/useDeleteAccount";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { resetToken } from "../../features/users/usersSlice";
import { useDispatch } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

export default function DeleteUserAccount() {
  const [accepted, setAccepted] = useState(false);
  const { handleDeleteUserAccount } = useDeleteAccount();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAccepted(e.target.checked);
  };

  const handleDeleAccount = () => {
    if (accepted) {
      handleDeleteUserAccount(accepted);
      toast("Cuenta eliminada exitosamente", {
        icon: <FaCheck className="text-white text-[15px] sm:text-[25px]" />,
        duration: 1000,
        unstyled: true,
        classNames: {
          toast:
            "bg-green-600 rounded shadow px-[10px] py-[15px] w-full flex items-center justify-center gap-3",
          title: "text-white font-medium text-sm sm:text-base",
        },
      });
      setTimeout(() => {
        dispatch(resetToken());
        localStorage.removeItem("short-url");
        navigate("/");
      }, 2000);
    } else {
      toast("Confirma que deseas elminar tu cuenta.", {
        icon: <IoIosAlert className="text-white text-[20px] sm:text-[25px]" />,
        duration: 3000,
        unstyled: true,
        classNames: {
          toast:
            "bg-red-600 rounded shadow px-[10px] py-[15px] w-[400px] flex items-center justify-center gap-2",
          title: "text-white font-medium text-sm sm:text-base",
        },
      });
    }
  };

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[1000px] mx-auto p-4">
      <div className="max-w-[600px] mx-auto p-6 shadow rounded bg-white dark:bg-[#161B22]">
        <h1 className="text-slate-800 dark:text-white font-normal text-xl text-center">
          Eliminación de mi cuenta
        </h1>
        <p className="text-center text-slate-800 dark:text-white mt-4 font-normal">
          Lamentamos esta noticia... si continua , esta cuenta no podrá
          recuperarse.
        </p>
        <div className="flex items-baseline gap-2 mt-4">
          <input onChange={handleChange} value={accepted} type="checkbox" />
          <p className="text-slate-800 dark:text-white font-medium">
            Entiendo que al eliminar mi cuenta, se eliminará toso los enlaces
            cortos asociados a esta cuenta, asumiendo lo que esto implique en
            mis datos almacenados.
            <span className="font-medium text-red-600">
              Esta acción es irreversible*.
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 justify-center mt-6">
          <DefaultButton
            onClick={handleDeleAccount}
            className="default-button w-[max-content] text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none px-[15px] py-[10px] rounded-[30px] relative overflow-hidden"
          >
            Eliminar
          </DefaultButton>
          <button
            onClick={() => {
              navigate("/my-profile");
            }}
            className="font-medium hover:text-teal-500 text-slate-800 dark:text-white hover:dark:text-teal-400"
          >
            Cancelar
          </button>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </section>
  );
}
