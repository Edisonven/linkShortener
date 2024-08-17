import { Link } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginData,
  setLoginErrors,
  setResetLoginErrors,
} from "../../features/users/usersSlice.js";
import { useEffect } from "react";

export default function SignIn() {
  const dispatch = useDispatch();
  const { email, password, errors } = useSelector(
    (state) => state.loginReducer
  );
  const emailRegexString = useSelector((state) => state.emailRegex);
  const emailRegex = new RegExp(emailRegexString);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginData({ field: name, value }));
  };

  const handleSubmitData = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      dispatch(setLoginErrors({ field: "email", error: "Ingresa tu correo" }));
    } else if (!emailRegex.test(email)) {
      dispatch(
        setLoginErrors({ field: "email", error: "Ingresa un correo válido" })
      );
    } else if (password.trim() === "") {
      dispatch(
        setLoginErrors({ field: "password", error: "Ingresa tu contraseña" })
      );
    }
  };

  useEffect(() => {
    if (email !== "" || password !== "") {
      dispatch(setResetLoginErrors());
    }
  }, [email, password]);

  return (
    <section className="signup__container mt-[50px] p-5">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center mb-2">
          <BiLink className="text-slate-800 text-xl dark:text-white" />
          <h1 className="text-slate-800 font-medium dark:text-white">
            URL Shortener
          </h1>
        </div>
        <form
          onSubmit={handleSubmitData}
          className="signup-form__container flex flex-col justify-between gap-2 border rounded-md shadow py-3 px-[20px] sm:px-[50px] w-full max-w-[550px] items-center bg-white dark:bg-[#161B22] min-h-[420px]"
        >
          <h2 className="text-center text-[30px] text-slate-800 dark:text-white font-medium">
            ¡Bienvenido!
          </h2>
          <hr className="w-full" />

          <p className="text-slate-800 dark:text-white text-center font-normal">
            Por favor, ingresa tus datos para ingresar
          </p>
          <div className="flex flex-col gap-5 w-full">
            <div className="base-input__container">
              <input
                onChange={handleSignInChange}
                value={email}
                name="email"
                className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
                type="text"
                placeholder=" "
              />
              <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
                Email
              </span>
              {errors.email && (
                <span className="text-red-600 font-medium">
                  {errors.email}.
                </span>
              )}
            </div>
            <div className="base-input__container">
              <input
                onChange={handleSignInChange}
                value={password}
                name="password"
                className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
                type="text"
                placeholder=" "
              />
              <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
                Contraseña
              </span>
              {errors.password && (
                <span className="text-red-600 font-medium">
                  {errors.password}.
                </span>
              )}
            </div>
          </div>
          <div>
            <button className="bg-teal-400 w-[180px] h-[45px] rounded-[50px] shadow text-slate-800 font-semibold dark:bg-slate-400 hover:brightness-75 transition duration-300">
              Iniciar sesión
            </button>
          </div>
          <hr className="w-full" />
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm text-slate-800 dark:text-white">
              ¿No tienes cuenta?
            </p>
            <Link
              to="/sign-up"
              className="font-medium text-slate-800 dark:text-white hover:underline hover:text-teal-600 dark:hover:text-teal-500"
            >
              Registrate gratis
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
