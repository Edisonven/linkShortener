import { Link, useNavigate } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {setLoginData,setLoginErrors,setResetLoginErrors,setUserToken,resetLoginForm,} from "../../features/users/usersSlice.js";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { RotatingLines } from "react-loader-spinner";
import useFormSubmit from "../../../hooks/forms/useFormSubmit.js";
import { regex } from "../../../utils/regex/regex.js";
import config from "../../../config/config.js";
import InputField from "../../components/input/InputField.jsx";
import DefaultButton from "../../components/buttons/DefaultButton.jsx";
import useToast from "../../../hooks/users/useToast.js";

export default function SignIn() {
  const dispatch = useDispatch();
  const { email, password, errors } = useSelector(
    (state) => state.loginReducer
  );
  const emailRegex = regex.emailRegex;
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useFormSubmit(setLoginData);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleloginRegisteredUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.backendUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let message = "Error al ingresar, intenta nuevamente.";
        if (errorData.message === "User not found") {
          message = `El usuario ${email} no está registrado.`;
        } else if (errorData.message === "Invalid credentials") {
          message = "Usuario o contraseña inválidos.";
        }

        showToast({ message, error: true, duration: 2000 });

        return false;
      }

      const data = await response.json();
      dispatch(setUserToken(data.token));
      return true;
    } catch (error) {
      showToast({
        message: "Error al ingresar, intenta nuevamente",
        error: true,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      dispatch(setLoginErrors({ field: "email", error: "Ingresa tu correo" }));
      return;
    }
    if (!emailRegex.test(email)) {
      dispatch(
        setLoginErrors({ field: "email", error: "Ingresa un correo válido" })
      );
      return;
    }
    if (password.trim() === "") {
      dispatch(
        setLoginErrors({ field: "password", error: "Ingresa tu contraseña" })
      );
      return;
    }

    const loginSuccessful = await handleloginRegisteredUser();
    if (loginSuccessful) {
      dispatch(resetLoginForm());
      navigate("/");
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
            <InputField
              handleSubmit={handleSubmit}
              value={email}
              name="email"
              type="text"
              placeholder="Email"
              error={errors.email}
            />
            <InputField
              handleSubmit={handleSubmit}
              value={password}
              name="password"
              type="password"
              placeholder="Contraseña"
              error={errors.password}
            />
          </div>
          <div>
            {loading ? (
              <RotatingLines
                height="50"
                width="50"
                color="gray"
                strokeColor="gray"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            ) : (
              <DefaultButton
                animated={false}
                className="bg-teal-400 w-[180px] h-[45px] rounded-[50px] shadow text-slate-800 font-semibold dark:bg-slate-400 overflow-hidden relative"
              >
                Iniciar sesión
              </DefaultButton>
            )}
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
      <Toaster position="bottom-center" />
    </section>
  );
}
