import { useDispatch, useSelector } from "react-redux";
import useFetchUser from "../../../hooks/users/useFetchUser";
import DefaultButton from "../../components/buttons/DefaultButton";
import useFormSubmit from "../../../hooks/forms/useFormSubmit";
import {
  setRegisterData,
  setRegisterErrors,
  setResetRegisterErrors,
} from "../../features/users/usersSlice";
import { useEffect } from "react";

export default function EditUserInfo() {
  const { user } = useFetchUser();
  const dispatch = useDispatch();
  const { name, errors } = useSelector((state) => state.registerReducer);
  const { handleSubmit } = useFormSubmit(setRegisterData);

  const handleSendUpdatedData = (e) => {
    e.preventDefault();

    if (name.trim() === "" || name.trim().length < 10) {
      dispatch(
        setRegisterErrors({
          field: "name",
          error: "Ingresa tu nombre completo",
        })
      );
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
          <div className="base-input__container">
            <input
              onChange={handleSubmit}
              value={name}
              name="name"
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
              type="text"
              placeholder=" "
            />
            <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
              Nombre
            </span>
            {errors.name && (
              <span className="text-red-600 font-medium">{errors.name}.</span>
            )}
          </div>
          <div className="mt-4">
            <DefaultButton className="default-button w-[max-content] text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none px-[15px] py-[10px] rounded-[30px] relative overflow-hidden">
              Guardar
            </DefaultButton>
          </div>
        </form>
      </div>
    </section>
  );
}
