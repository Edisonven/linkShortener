import { Link, useNavigate } from "react-router-dom";
import DefaultButton from "../buttons/DefaultButton";

export default function Invited() {
  const navigate = useNavigate();

  const handleNavigateToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <section className="flex items-center gap-3">
      <DefaultButton
        onClick={handleNavigateToSignIn}
        animated={false}
        className="text-slate-800 font-medium text-sm sm:text-base bg-teal-400 px-3 py-2 rounded-[20px] dark:bg-slate-300 relative overflow-hidden hover:brightness-110 trasition duration-300"
      >
        Ingresar
      </DefaultButton>
      <Link
        to="/sign-up"
        className="text-slate-800 font-medium text-sm sm:text-base dark:text-white hover:underline"
      >
        Registrarse
      </Link>
    </section>
  );
}
