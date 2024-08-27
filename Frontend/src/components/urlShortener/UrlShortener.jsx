import "../urlShortener/urlShortener.css";
import {
  setLongUrl,
  setLongUrlErrors,
  resetUrlErrors,
  resetUrlForm,
} from "../../features/url/urlSlice";
import { useDispatch, useSelector } from "react-redux";
import useFormSubmit from "../../../hooks/forms/useFormSubmit";
import { regex } from "../../../utils/regex/regex";
import { useEffect, useState } from "react";
import usePostUrl from "../../../hooks/urls/usePostUrl";
import useGetUrl from "../../../hooks/urls/useGetUrl";
import config from "../../../config/config";
import { useLocation, useParams } from "react-router-dom";
import DefaultButton from "../buttons/DefaultButton";
import { IoIosAlert } from "react-icons/io";
import { MdOutlineFileCopy } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Loader from "../loader/Loader";
import { setUserToken } from "../../features/users/usersSlice";

export default function UrlShortener() {
  const { longUrl, errors } = useSelector((state) => state.urls);
  const { handleSubmit } = useFormSubmit(setLongUrl);
  const { handleGetLongUrl, shortedUrl, originalUrl, shortUrl, loading } =
    useGetUrl();
  const { handleSendUrl } = usePostUrl();
  const dispatch = useDispatch();
  const { urlParams } = useParams();
  const urlRegex = regex.urlRegex;
  const [isCopied, setIsCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      dispatch(setUserToken(tokenParam));
    }
  }, []);

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
  }, [shortUrl]);

  useEffect(() => {
    if (urlParams && originalUrl) {
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

  useEffect(() => {
    dispatch(resetUrlErrors());
  }, [location.pathname]);

  return (
    <section className="url-shortener__container flex items-center justify-center h-full p-4 w-full">
      <div className="flex flex-col items-center w-full max-w-[1200px]">
        <h1 className="text-[30px] font-semibold text-slate-800 sm:text-[60px] sm:font-semibold dark:text-white mb-3">
          Acorta tu URL
        </h1>
        <h3 className="text-slate-800 text-center font-medium dark:text-white">
          Gestiona tus links de manera más práctica y compártelos
        </h3>

        <form
          onSubmit={handleSendLongUrl}
          className="flex flex-col min-h-[270px] sm:min-h-[200px] items-center mt-6 rounded-[100px] shadow w-full p-5 bg-white dark:bg-[#00000048] dark:shadow-gray-900"
        >
          <label
            htmlFor="url"
            className="text-slate-800 font-medium dark:text-white mb-5 text-2xl"
          >
            Ingresa una URL larga
          </label>
          <div className="w-full relative">
            <input
              onChange={handleSubmit}
              value={longUrl}
              name="longUrl"
              type="text"
              placeholder="Ingresa una URL larga... ¡gestiona tus enlaces de manera más eficiente y comparte!"
              className="w-full flex border-none outline h-[58px] outline-2 dark:bg-[#161B22] dark:text-white outline-slate-300 rounded-[50px] p-2 focus:outline-slate-500 focus:dark:outline-white"
            />
            {loading ? (
              <Loader />
            ) : (
              <div className="flex items-center flex-col justify-between sm:flex-row">
                {errors.longUrl && (
                  <div className="flex items-center gap-1 mt-2 ml-3">
                    <IoIosAlert className="text-red-600 text-[20px]" />
                    <span className="text-red-600 font-medium sm:whitespace-nowrap">
                      {errors.longUrl}.
                    </span>
                  </div>
                )}
                {shortedUrl && (
                  <div className="flex items-center flex-col lg:flex-row justify-between w-full relative">
                    <span className="text-slate-800 dark:text-white max-w-[300px] sm:max-w-[600px] ml-4 text-ellipsis overflow-hidden whitespace-nowrap mt-2">
                      <span className="font-medium">Original:</span>{" "}
                      {originalUrl}
                    </span>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="w-[max-content] flex items-center gap-1 border-2 dark:border p-2 rounded-[30px] mt-3 sm:ml-auto sm:mr-5 cursor-pointer select-none dark:text-white hover:bg-gray-100 hover:dark:bg-slate-800 transition-colors duration-300"
                    >
                      <CopyToClipboard
                        text={`${config.frontendUrl}/${shortedUrl}`}
                      >
                        <div
                          onClick={() => {
                            setIsCopied(true);
                            setTimeout(() => {
                              setIsCopied(false);
                            }, 2000);
                          }}
                          className="relative text-[20px] sm:text-[23px]"
                        >
                          {config.frontendUrl}/
                          <span className="text-red-600 font-normal">
                            {shortedUrl}
                          </span>
                          <AnimatePresence>
                            {isCopied && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white shadow rounded h-[50px] absolute top-[50px] right-[20px] p-3 flex items-center justify-center dark:bg-[#161B22] dark:text-white pointer-events-none"
                              >
                                <span className="text-slate-800 dark:text-white text-sm font-medium">
                                  texto copiado al portapapeles
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </CopyToClipboard>
                      <MdOutlineFileCopy className="text-[20px]" />
                    </motion.div>
                  </div>
                )}
              </div>
            )}
            <DefaultButton
              className="absolute top-[5px] right-[8px] default-button text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none py-[12px] px-[20px] rounded-[30px]"
              type="submit"
            >
              Acortar URL
            </DefaultButton>
          </div>
        </form>
      </div>
    </section>
  );
}
