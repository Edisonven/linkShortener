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
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/input/InputField";
import useToast from "../../../hooks/users/useToast";

export default function EditUserPassword() {
  const { password, newPassword, errors, confirmPassword } = useSelector(
    (state) => state.registerReducer
  );
  const dispatch = useDispatch();
  const { handleSubmit } = useFormSubmit(setRegisterData);
  const { handleUpdateUserPassword } = usePathcUserPassword();
  const navigate = useNavigate();
  const { showToast } = useToast();

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
        return showToast({
          message: "La contraseña actual es incorrecta.",
          error: true,
        });
      } else if (data?.error) {
        return showToast({
          message: "Ha ocurrido un error, intenta nuevamente.",
          error: true,
        });
      }
      showToast({
        message: "Contraseña actualizada con éxito.",
        duration: 1500,
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

  useEffect(() => {
    dispatch(resetRegisterForm());
  }, []);

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
