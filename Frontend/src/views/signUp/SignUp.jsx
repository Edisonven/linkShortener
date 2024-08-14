import { BiLink } from "react-icons/bi";
import google from "/images/application/google-logo.png";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <section className="signup__container mt-[50px] p-5">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <BiLink className="text-slate-800 text-xl dark:text-white" />
          <h1 className="text-slate-800 font-medium dark:text-white mb-2">
            URL Shortener
          </h1>
        </div>
        <form className="signup-form__container flex flex-col justify-between gap-2 border rounded-md shadow py-3 px-[20px] sm:px-[50px] w-full max-w-[550px] items-center bg-white dark:bg-slate-800 min-h-[620px]">
          <h2 className="text-center text-[30px] text-slate-800 dark:text-white font-medium">
            ¡Hola Invitado!
          </h2>
          <hr className="w-full" />
          <div className="my-2 flex items-center gap-3">
            <p className="text-slate-800 font-medium mb-2 dark:text-white">
              Registrate con
            </p>
            <button className="flex items-center gap-2 border-2 w-[max-content] px-3 py-1 rounded-md font-medium text-slate-800 dark:text-white hover:brightness-90">
              <img className="w-[30px]" src={google} alt="" />
              Google
            </button>
          </div>
          <hr className="w-full" />
          <span className="text-slate-800 dark:text-white font font-medium">
            O si prefieres
          </span>
          <p className="text-slate-800 dark:text-white text-center font-normal">
            Ingresa tus datos para crear tu cuenta
          </p>
          <div className="flex flex-col gap-3 w-full">
            <input className="base-input" type="text" placeholder=" " />
            <input className="base-input" type="text" placeholder=" " />
            <input className="base-input" type="text" placeholder=" " />
            <input className="base-input" type="text" placeholder=" " />
          </div>
          <div>
            <button className="bg-teal-400 w-[180px] h-[45px] rounded-[50px] shadow text-slate-800 font-semibold dark:bg-slate-400 hover:brightness-75 transition duration-300">
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
