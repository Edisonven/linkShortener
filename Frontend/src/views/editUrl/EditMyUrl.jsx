import { useDispatch, useSelector } from "react-redux";
import useFormSubmit from "../../../hooks/forms/useFormSubmit";
import DefaultButton from "../../components/buttons/DefaultButton";
import {
  setUpdateUrlInfo,
  setLongUrlErrors,
  resetUrlErrors,
} from "../../features/url/urlSlice";
import { regex } from "../../../utils/regex/regex";
import { IoIosAlert } from "react-icons/io";
import { useEffect } from "react";

export default function EditMyUrl() {
  const { handleSubmit } = useFormSubmit(setUpdateUrlInfo);
  const dispatch = useDispatch();
  const urlRegex = regex.urlRegex;
  const { longUrl, title, errors } = useSelector((state) => state.urls);

  const handleSendUpdatedInfo = (e) => {
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
    } else if (title.length > 15) {
      dispatch(
        setLongUrlErrors({
          field: "title",
          error: "Título demasiado largo",
        })
      );
    } else {
    }
  };

  useEffect(() => {
    if (longUrl !== "" || title !== "") {
      dispatch(resetUrlErrors());
    }
  }, [longUrl, , title, dispatch]);

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[600px] mx-auto p-4">
      <h1 className="text-slate-800 dark:text-white font-medium text-[30px] mb-2">
        Editar URL
      </h1>
      <div className="bg-white dark:bg-[#161B22] shadow rounded p-4">
        <form className="flex flex-col gap-5">
          <div>
            <label
              className="text-slate-800 dark:text-white font-medium text-[15px]"
              htmlFor="longUrl"
            >
              Enlace largo (Ingresa una nueva URL)
            </label>
            <input
              value={longUrl}
              onChange={handleSubmit}
              name="longUrl"
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white mt-1"
              type="text"
            />
            {errors.longUrl && (
              <div className="flex items-center gap-1 mt-2 ml-3">
                <IoIosAlert className="text-red-600 text-[20px]" />
                <span className="text-red-600 font-medium sm:whitespace-nowrap">
                  {errors.longUrl}.
                </span>
              </div>
            )}
          </div>
          <div>
            <label
              className="text-slate-800 dark:text-white font-medium text-[15px]"
              htmlFor="title"
            >
              Título (opcional)
            </label>
            <input
              value={title}
              onChange={handleSubmit}
              name="title"
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white mt-1"
              type="text"
            />
            {errors.title && (
              <div className="flex items-center gap-1 mt-2 ml-3">
                <IoIosAlert className="text-red-600 text-[20px]" />
                <span className="text-red-600 font-medium sm:whitespace-nowrap">
                  {errors.title}.
                </span>
              </div>
            )}
          </div>
          <div>
            <label
              className="text-slate-800 dark:text-white font-medium text-[15px]"
              htmlFor="short-url"
            >
              Enlace corto
            </label>
            <input
              onChange={handleSubmit}
              name="shortUrl"
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white mt-1 pointer-events-none"
              type="text"
            />
          </div>
          <DefaultButton
            onClick={handleSendUpdatedInfo}
            className="default-button w-[max-content] text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none"
          >
            Actualizar
          </DefaultButton>
        </form>
      </div>
    </section>
  );
}
