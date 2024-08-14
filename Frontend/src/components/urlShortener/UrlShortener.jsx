import "../urlShortener/urlShortener.css";
import { FaHandScissors } from "react-icons/fa6";

export default function UrlShortener() {
  return (
    <section className="url-shortener__container flex items-center justify-center h-full p-4 w-full">
      <div className="flex flex-col items-center w-full max-w-[600px]">
        <h1 className="text-[30px] font-semibold text-slate-800 sm:text-[60px] sm:font-semibold dark:text-white mb-3">
          Acorta tu URL
        </h1>
        <h3 className="text-slate-800 text-center font-medium dark:text-white">
          Gestiona tus links de manera más practica y comparte!
        </h3>

        <form className="flex flex-col items-center mt-6 border rounded-md shadow w-full p-3">
          <label
            htmlFor="url"
            className="text-slate-800 font-medium dark:text-white mb-5"
          >
            Ingresa una url larga
          </label>
          <input
            name="url"
            type="text"
            placeholder="Ingresa una URL..."
            className="w-full flex border rounded-sm p-2"
          />

          <button
            className="text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 rounded-md mt-6 dark:bg-gray-300 select-none px-3 py-2"
            type="submit"
          >
            Acortar URL
            <FaHandScissors className="text-white text-[20px] dark:text-slate-800" />
          </button>
        </form>
      </div>
    </section>
  );
}
