import "../urlShortener/urlShortener.css";
import { FaHandScissors } from "react-icons/fa6";
import { setLongUrl } from "../../features/url/urlSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UrlShortener() {
  const { shortUrl, longUrl } = useSelector((state) => state.urls);
  const dispatch = useDispatch();

  const handleSendLongUrl = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    dispatch(setLongUrl({ field: name, value }));
  };

  return (
    <section className="url-shortener__container flex items-center justify-center h-full p-4 w-full">
      <div className="flex flex-col items-center w-full max-w-[800px]">
        <h1 className="text-[30px] font-semibold text-slate-800 sm:text-[60px] sm:font-semibold dark:text-white mb-3">
          Acorta tu URL
        </h1>
        <h3 className="text-slate-800 text-center font-medium dark:text-white">
          Gestiona tus links de manera más practica y compartelos
        </h3>

        <form
          onSubmit={handleSendLongUrl}
          className="flex flex-col items-center mt-6 border rounded-md shadow w-full p-3 bg-white dark:bg-[#0D1117]"
        >
          <label
            htmlFor="url"
            className="text-slate-800 font-medium dark:text-white mb-5"
          >
            Ingresa una URL larga
          </label>
          <input
            onChange={handleSubmit}
            value={longUrl}
            name="longUrl"
            type="text"
            placeholder="Ingresa una URL..."
            className="w-full flex border-none outline outline-1 dark:bg-[#161B22] dark:text-white outline-slate-300 rounded-md p-2 focus:outline-slate-500 focus:dark:outline-white"
          />

          <button
            className="text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 rounded-md mt-6 dark:bg-gray-300 select-none px-3 py-2 hover:brightness-[80%]"
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
