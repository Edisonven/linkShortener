import "../urlShortener/urlShortener.css";
import { FaHandScissors } from "react-icons/fa6";
import {
  setLongUrl,
  setLongUrlErrors,
  resetUrlErrors,
  resetUrlForm,
} from "../../features/url/urlSlice";
import { useDispatch, useSelector } from "react-redux";
import useFormSubmit from "../../../hooks/forms/useFormSubmit";
import { regex } from "../../../utils/regex/regex";
import { useEffect } from "react";
import usePostUrl from "../../../hooks/users/usePostUrl";
import useGetUrl from "../../../hooks/urls/useGetUrl";
import config from "../../../config/config";
import { useParams } from "react-router-dom";

export default function UrlShortener() {
  const { longUrl, errors } = useSelector((state) => state.urls);
  const { handleSubmit } = useFormSubmit(setLongUrl);
  const { handleGetLongUrl, shortedUrl, originalUrl, shortUrl } = useGetUrl();
  const { handleSendUrl } = usePostUrl();
  const dispatch = useDispatch();
  const { urlParams } = useParams();
  const urlRegex = regex.urlRegex;

  const handleSendLongUrl = (e) => {
    e.preventDefault();

    if (longUrl.trim() === "") {
      dispatch(
        setLongUrlErrors({
          field: "longUrl",
          error: "Ingresa una url",
        })
      );
    } else if (!urlRegex.test(longUrl)) {
      dispatch(
        setLongUrlErrors({
          field: "longUrl",
          error: "Ingresa una url válida",
        })
      );
    } else {
      handleSendUrl();
      dispatch(resetUrlErrors());
      dispatch(resetUrlForm());
    }
  };

  useEffect(() => {
    if (longUrl !== "") {
      dispatch(resetUrlErrors());
    }
  }, [longUrl, dispatch]);

  useEffect(() => {
    if (shortUrl) {
      handleGetLongUrl();
    }
  }, [shortUrl, handleGetLongUrl]);

  useEffect(() => {
    if (urlParams && originalUrl) {
      // Asegúrate de que `originalUrl` sea una URL completa antes de redirigir
      if (
        originalUrl.startsWith("http://") ||
        originalUrl.startsWith("https://")
      ) {
        window.location.href = originalUrl;
      } else {
        console.error("La URL no es válida para redirigir:", originalUrl);
      }
    }
  }, [urlParams, originalUrl]);

  return (
    <section className="url-shortener__container flex items-center justify-center h-full p-4 w-full">
      <div className="flex flex-col items-center w-full max-w-[800px]">
        <h1 className="text-[30px] font-semibold text-slate-800 sm:text-[60px] sm:font-semibold dark:text-white mb-3">
          Acorta tu URL
        </h1>
        <h3 className="text-slate-800 text-center font-medium dark:text-white">
          Gestiona tus links de manera más práctica y compártelos
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
          <div className="w-full">
            <input
              onChange={handleSubmit}
              value={longUrl}
              name="longUrl"
              type="text"
              placeholder="Ingresa una URL..."
              className="w-full flex border-none outline outline-1 dark:bg-[#161B22] dark:text-white outline-slate-300 rounded-md p-2 focus:outline-slate-500 focus:dark:outline-white"
            />
            {errors.longUrl && (
              <span className="text-red-600 font-medium">
                {errors.longUrl}.
              </span>
            )}

            {shortedUrl ? (
              <span className="text-slate-800 dark:text-white">
                {`${config.frontendUrl}/${shortedUrl}`}
              </span>
            ) : null}
          </div>
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
