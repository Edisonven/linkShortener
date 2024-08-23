import { BiLink } from "react-icons/bi";
import google from "/images/application/google-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setRegisterData,
  setRegisterErrors,
  resetRegisterForm,
  setResetRegisterErrors,
} from "../../features/users/usersSlice.js";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { IoIosAlert } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import useFormSubmit from "../../../hooks/forms/useFormSubmit.js";
import config from "../../../config/config.js";
import InputField from "../../components/input/InputField.jsx";
import { regex } from "../../../utils/regex/regex.js";
import DefaultButton from "../../components/buttons/DefaultButton.jsx";
import useToast from "../../../hooks/users/useToast.js";

export default function SignUp() {
  const dispatch = useDispatch();
  const { name, email, password, confirmPassword, errors } = useSelector(
    (state) => state.registerReducer
  );
  const { showToast } = useToast();
  const emailRegex = regex.emailRegex;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useFormSubmit(setRegisterData);

  useEffect(() => {
    dispatch(resetRegisterForm());
  }, [dispatch]);

  const handleRegisterNewUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.backendUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error data");
      }

      await response.json();
    } catch (error) {
      console.error(error.message);
      if (error.message === "400") {
        showToast({
          message: "El correo ya está registrado.",
          error: true,
          duration: 3000,
        });
      } else {
        showToast({
          message: "Error al registrar usuario, intenta nuevamente.",
          error: true,
          duration: 3000,
        });
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || name.trim().length < 10) {
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
    } else {
      await handleRegisterNewUser();
      dispatch(resetRegisterForm());
      showToast({
        message: "¡Te has registrado con éxito!",
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
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
            <InputField
              handleSubmit={handleSubmit}
              value={name}
              name="name"
              type="text"
              placeholder="Nombre completo"
              error={errors.name}
            />
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
            <InputField
              handleSubmit={handleSubmit}
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              error={errors.confirmPassword}
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
                Registrarse
              </DefaultButton>
            )}
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
      <Toaster position="bottom-center" />
    </section>
  );
}
