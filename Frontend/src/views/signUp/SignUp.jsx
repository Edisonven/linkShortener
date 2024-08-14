import { BiLink } from "react-icons/bi";
import google from "/images/application/google-logo.png";

export default function SignUp() {
  return (
    <section className="signup__container mt-[50px]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <BiLink className="text-slate-800 text-xl dark:text-white" />
          <h1 className="text-slate-800 font-medium dark:text-white mb-2">
            URL Shortener
          </h1>
        </div>
        <form className="signup-form__container flex flex-col gap-2 border rounded-md shadow py-3 px-6 w-full max-w-[600px] items-center">
          <h2 className="text-center text-[30px] text-slate-800 dark:text-white font-medium">
            ¡Bienvenido!
          </h2>
          <hr className="w-full" />
          <div className="my-2 flex items-center gap-3">
            <p className="text-slate-800 font-medium mb-2 dark:text-white">
              Registrate con
            </p>
            <button className="flex items-center gap-2 border-2 w-[max-content] px-3 py-1 rounded-md font-medium text-slate-800 dark:text-white">
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
          <input className="base-input" type="text" placeholder=" " />
          <input className="base-input" type="text" placeholder=" " />
          <input className="base-input" type="text" placeholder=" " />
          <input className="base-input" type="text" placeholder=" " />
        </form>
      </div>
    </section>
  );
}
