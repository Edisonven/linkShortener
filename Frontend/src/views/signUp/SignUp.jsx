import { BiLink } from "react-icons/bi";
import google from "/images/application/google-logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setRegisterData,
  setRegisterErrors,
  resetRegisterForm,
  setResetRegisterErrors,
} from "../../features/users/signInSlice";
import { useEffect } from "react";

export default function SignUp() {
  const dispatch = useDispatch();
  const { name, email, password, confirmPassword, errors } = useSelector(
    (state) => state.registerReducer
  );

  const emailRegexString = useSelector((state) => state.emailRegex);
  const emailRegex = new RegExp(emailRegexString);

  useEffect(() => {
    dispatch(resetRegisterForm());
  }, [dispatch]);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    dispatch(setRegisterData({ field: name, value }));
  };

  const handleSubmitData = (e) => {
    if (name.trim() === "") {
      dispatch(
        setRegisterErrors({
          field: "name",
          error: "Ingresa tu nombre completo",
        })
      );
    } else if (email.trim() === "") {
      dispatch(
        setRegisterErrors({
          field: "email",
          error: "Ingresa tu correo",
        })
      );
    } else if (!emailRegex.test(email)) {
      dispatch(
        setRegisterErrors({
          field: "email",
          error: "Ingresa un formato de correo válido",
        })
      );
    } else if (password.trim() === "") {
      dispatch(
        setRegisterErrors({
          field: "password",
          error: "Ingresa una contraseña",
        })
      );
    } else if (password.trim().length < 8) {
      dispatch(
        setRegisterErrors({
          field: "password",
          error: "Ingresa mínimo 8 caracteres",
        })
      );
    } else if (confirmPassword.trim() === "") {
      dispatch(
        setRegisterErrors({
          field: "confirmPassword",
          error: "Confirma tu contraseña",
        })
      );
    } else if (confirmPassword.trim() !== password.trim()) {
      dispatch(
        setRegisterErrors({
          field: "confirmPassword",
          error: "Las contraseñas no son iguales",
        })
      );
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (
      name !== "" ||
      email !== "" ||
      password !== "" ||
      confirmPassword !== ""
    ) {
      dispatch(setResetRegisterErrors());
    }
  }, [name, email, password, confirmPassword]);

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
          className="signup-form__container flex flex-col justify-between gap-2 border rounded-md shadow py-3 px-[20px] sm:px-[50px] w-full max-w-[550px] items-center bg-white dark:bg-[#161B22] min-h-[620px]"
        >
          <h2 className="text-center text-[30px] text-slate-800 dark:text-white font-medium">
            ¡Hola Invitado!
          </h2>
          <hr className="w-full" />
          <div className="my-2 flex items-center gap-3 mb-2">
            <p className="text-slate-800 font-medium dark:text-white">
              Registrate con
            </p>
            <Link className="flex items-center gap-2 border-2 w-[max-content] px-3 py-1 rounded-md font-medium text-slate-800 dark:text-white hover:brightness-90">
              <img className="w-[22px]" src={google} alt="" />
              Google
            </Link>
          </div>
          <hr className="w-full" />
          <span className="text-slate-800 dark:text-white font font-medium">
            O si prefieres
          </span>
          <p className="text-slate-800 dark:text-white text-center font-normal">
            Ingresa tus datos para crear tu cuenta
          </p>
          <div className="flex flex-col gap-5 w-full">
            <div className="base-input__container">
              <input
                onChange={handleSignupChange}
                value={name}
                name="name"
                className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
                type="text"
                placeholder=" "
              />
              <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
                Nombre completo
              </span>
              {errors.name && (
                <span className="text-red-600 font-medium">{errors.name}.</span>
              )}
            </div>
            <div className="base-input__container">
              <input
                onChange={handleSignupChange}
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
                onChange={handleSignupChange}
                value={password}
                name="password"
                className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
                type="password"
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
            <div className="base-input__container">
              <input
                onChange={handleSignupChange}
                value={confirmPassword}
                name="confirmPassword"
                className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
                type="password"
                placeholder=" "
              />
              <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
                Confirmar contraseña
              </span>
              {errors.confirmPassword && (
                <span className="text-red-600 font-medium">
                  {errors.confirmPassword}.
                </span>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-teal-400 w-[180px] h-[45px] rounded-[50px] shadow text-slate-800 font-semibold dark:bg-slate-400 hover:brightness-75 transition duration-300"
            >
              Registrarse
            </button>
          </div>
          <hr className="w-full" />
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm text-slate-800 dark:text-white">
              ¿Ya tienes cuenta?
            </p>
            <Link
              to="/sign-in"
              className="font-medium text-slate-800 dark:text-white hover:underline hover:text-teal-600 dark:hover:text-teal-500"
            >
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
