import { BiLink } from "react-icons/bi";

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
        <form className="signup-form__container flex flex-col gap-2 border rounded-md shadow p-3 w-full max-w-[600px]">
          <h2 className="text-center text-[30px] mb-4 text-slate-800 dark:text-white font-medium">
            ¡Bienvenido!
          </h2>
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
