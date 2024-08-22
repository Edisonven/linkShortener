import { Link } from "react-router-dom";

export default function Invited() {
  return (
    <section className="flex items-center gap-3">
      <Link
        to="sign-in"
        className="text-slate-800 font-medium text-sm sm:text-base bg-teal-400 px-3 py-2 rounded-[20px] dark:bg-slate-300"
      >
        Ingresar
      </Link>
      <Link
        to="sign-up"
        className="text-slate-800 font-medium text-sm sm:text-base dark:text-white"
      >
        Registrarse
      </Link>
    </section>
  );
}
