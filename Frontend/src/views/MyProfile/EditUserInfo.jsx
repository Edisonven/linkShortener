import { useDispatch, useSelector } from "react-redux";
import useFetchUser from "../../../hooks/users/useFetchUser";
import DefaultButton from "../../components/buttons/DefaultButton";
import useFormSubmit from "../../../hooks/forms/useFormSubmit";
import {
  setRegisterData,
  setRegisterErrors,
  setResetRegisterErrors,
  resetRegisterForm,
} from "../../features/users/usersSlice";
import { useEffect } from "react";
import usePatchUserData from "../../../hooks/users/usePatchUserData";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/input/InputField";
import useToast from "../../../hooks/users/useToast";

export default function EditUserInfo() {
  const { user } = useFetchUser();
  const dispatch = useDispatch();
  const { name, errors } = useSelector((state) => state.registerReducer);
  const { handleSubmit } = useFormSubmit(setRegisterData);
  const { showToast } = useToast();
  const { handleUpdateUserData } = usePatchUserData(name);
  const navigate = useNavigate();

  const handleSendUpdatedData = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || name.trim().length < 10) {
      dispatch(
        setRegisterErrors({
          field: "name",
          error: "Ingresa tu nombre completo",
        })
      );
    } else {
      const data = await handleUpdateUserData(name);
      if (data?.error) {
        return showToast({
          message: "Error al actualizar usuario, intenta nuevamente.",
          error: true,
        });
      }

      dispatch(resetRegisterForm());
      showToast({
        message: "Datos actualizados con éxito.",
        duration: 1500,
      });

      setTimeout(() => {
        navigate("/my-profile");
      }, 1500);
    }
  };

  useEffect(() => {
    if (name !== "") {
      dispatch(setResetRegisterErrors());
    }
  }, [name]);

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[1000px] mx-auto p-4">
      <h1 className="text-slate-800 dark:text-white font-medium text-[30px] mb-2">
        Mis datos
      </h1>
      <div className="max-w-[600px] mx-auto p-6 shadow rounded bg-white dark:bg-[#161B22]">
        <h1 className="text-slate-800 dark:text-white font-normal text-2xl">
          Cuenta
        </h1>
        <form onSubmit={handleSendUpdatedData} className="mt-6">
          <h1 className="text-slate-800 dark:text-gray-300 mb-6 ml-2 font-medium">
            Correo asociado * <span>{user?.email}</span>
          </h1>
          <InputField
            handleSubmit={handleSubmit}
            value={name}
            name="name"
            type="text"
            placeholder="Nombre"
            error={errors.name}
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
