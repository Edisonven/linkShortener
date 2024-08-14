import { Link } from "react-router-dom";
import { BiLink } from "react-icons/bi";

export default function SignIn() {
  return (
    <section className="signup__container mt-[50px] p-5">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <BiLink className="text-slate-800 text-xl dark:text-white" />
          <h1 className="text-slate-800 font-medium dark:text-white mb-2">
            URL Shortener
          </h1>
        </div>
        <form className="signup-form__container flex flex-col justify-between gap-2 border rounded-md shadow py-3 px-[20px] sm:px-[50px] w-full max-w-[550px] items-center bg-white dark:bg-slate-800 min-h-[420px]">
          <h2 className="text-center text-[30px] text-slate-800 dark:text-white font-medium">
            ¡Bienvenido!
          </h2>
          <hr className="w-full" />

          <p className="text-slate-800 dark:text-white text-center font-normal">
            Por favor, ingresa tus datos para ingresar
          </p>
          <div className="flex flex-col gap-3 w-full">
            <input className="base-input" type="text" placeholder=" " />
            <input className="base-input" type="text" placeholder=" " />
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
