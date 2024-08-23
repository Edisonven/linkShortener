import { useDispatch, useSelector } from "react-redux";
import DefaultButton from "../../components/buttons/DefaultButton";
import {
  setRegisterData,
  setRegisterErrors,
  setResetRegisterErrors,
  resetRegisterForm,
  resetToken,
} from "../../features/users/usersSlice";
import useFormSubmit from "../../../hooks/forms/useFormSubmit";
import { useEffect } from "react";
import usePathcUserPassword from "../../../hooks/users/usePatchUserPassword";
import { toast, Toaster } from "sonner";
import { FaCheck } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/input/InputField";

export default function EditUserPassword() {
  const { password, newPassword, errors, confirmPassword } = useSelector(
    (state) => state.registerReducer
  );
  const dispatch = useDispatch();
  const { handleSubmit } = useFormSubmit(setRegisterData);
  const { handleUpdateUserPassword } = usePathcUserPassword();
  const navigate = useNavigate();

  const handleSendNewPassword = async (e) => {
    e.preventDefault();

    if (password.trim() === "") {
      dispatch(
        setRegisterErrors({
          field: "password",
          error: "Ingresa tu contraseña actual",
        })
      );
    } else if (newPassword.trim() === "") {
      dispatch(
        setRegisterErrors({
          field: "newPassword",
          error: "Ingresa una contraseña nueva",
        })
      );
    } else if (newPassword.length < 8) {
      dispatch(
        setRegisterErrors({
          field: "newPassword",
          error: "La contraseña debe ser mínimo de 8 caracteres",
        })
      );
    } else if (newPassword !== confirmPassword) {
      dispatch(
        setRegisterErrors({
          field: "confirmPassword",
          error: "Las contraseñas no coinciden",
        })
      );
    } else if (newPassword === password) {
      dispatch(
        setRegisterErrors({
          field: "confirmPassword",
          error: "La contraseña no puede ser igual a la actual",
        })
      );
    } else {
      const data = await handleUpdateUserPassword(password, newPassword);
      if (data?.error === "Invalid password") {
        return toast("La contraseña actual es incorrecta", {
          icon: (
            <IoIosAlert className="text-white text-[20px] sm:text-[25px]" />
          ),
          duration: 3000,
          unstyled: true,
          classNames: {
            toast:
              "bg-red-600 rounded shadow px-[10px] py-[15px] w-[400px] flex items-center justify-center gap-2",
            title: "text-white font-medium text-sm sm:text-base",
          },
        });
      } else if (data?.error) {
        return toast("Ha ocurrido un error, intenta nuevamente", {
          icon: (
            <IoIosAlert className="text-white text-[20px] sm:text-[25px]" />
          ),
          duration: 3000,
          unstyled: true,
          classNames: {
            toast:
              "bg-red-600 rounded shadow px-[10px] py-[15px] w-[400px] flex items-center justify-center gap-2",
            title: "text-white font-medium text-sm sm:text-base",
          },
        });
      }

      toast("Contraseña actualizada con éxito", {
        icon: <FaCheck className="text-white text-[15px] sm:text-[25px]" />,
        duration: 1500,
        unstyled: true,
        classNames: {
          toast:
            "bg-green-600 rounded shadow px-[10px] py-[15px] w-full flex items-center justify-center gap-3",
          title: "text-white font-medium text-sm sm:text-base",
        },
      });
      setTimeout(() => {
        dispatch(resetRegisterForm());
        dispatch(resetToken());
        localStorage.removeItem("short-url");
        navigate("/");
      }, 1500);
    }
  };

  useEffect(() => {
    if (password !== "" || newPassword !== "" || confirmPassword !== "") {
      dispatch(setResetRegisterErrors());
    }
  }, [password, newPassword, confirmPassword]);

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[1000px] mx-auto p-4">
      <div className="max-w-[600px] mx-auto p-6 shadow rounded bg-white dark:bg-[#161B22]">
        <h1 className="text-slate-800 dark:text-white font-normal text-2xl">
          Contraseña
        </h1>
        <form
          onSubmit={handleSendNewPassword}
          className="mt-6 flex flex-col gap-6"
        >
          <InputField
            handleSubmit={handleSubmit}
            value={password}
            name="password"
            type="password"
            placeholder="Contraseña actual"
            error={errors.password}
          />
          <InputField
            handleSubmit={handleSubmit}
            value={newPassword}
            name="newPassword"
            type="password"
            placeholder="Nueva contraseña"
            error={errors.newPassword}
          />
          <InputField
            handleSubmit={handleSubmit}
            value={confirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            error={errors.confirmPassword}
          />
          <div className="mt-4">
            <DefaultButton className="default-button w-[max-content] text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none px-[15px] py-[10px] rounded-[30px] relative overflow-hidden">
              Guardar
            </DefaultButton>
          </div>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </section>
  );
}
