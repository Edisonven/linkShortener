import { useDispatch, useSelector } from "react-redux";
import useFormSubmit from "../../../hooks/forms/useFormSubmit";
import DefaultButton from "../../components/buttons/DefaultButton";
import {
  setUpdateUrlInfo,
  setLongUrlErrors,
  resetUrlErrors,
  resetUrlForm,
} from "../../features/url/urlSlice";
import { regex } from "../../../utils/regex/regex";
import { IoIosAlert } from "react-icons/io";
import { useEffect, useState } from "react";
import useGetUserLoggedUrls from "../../../hooks/users/useGetUserLoggedUrls";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import usePatchUrls from "../../../hooks/urls/usePatchUrls";
import { Toaster, toast } from "sonner";
import { FaCheck } from "react-icons/fa6";

export default function EditMyUrl() {
  const { handleSubmit } = useFormSubmit(setUpdateUrlInfo);
  const dispatch = useDispatch();
  const urlRegex = regex.urlRegex;
  const { longUrl, title, errors, shortUrl, loading } = useSelector(
    (state) => state.urls
  );
  const { id } = useParams();
  const formatedID = Number(id);
  const { userURLS, handleGetUserUrls } = useGetUserLoggedUrls();
  const { handleUpdateUrls } = usePatchUrls();
  const [urlData, setUrlData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (formatedID && userURLS) {
      const findedURLToEdit = userURLS.find((url) => url.id === formatedID);
      setUrlData(findedURLToEdit);
    }
  }, [formatedID, userURLS]);

  const handleSendUpdatedInfo = async (e) => {
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
    } else if (title.length > 20) {
      dispatch(
        setLongUrlErrors({
          field: "title",
          error: "Título demasiado largo",
        })
      );
    } else {
      try {
        const data = await handleUpdateUrls(longUrl, title, formatedID);
        if (data.error) {
          return toast("Error al modificar URL, intenta nuevamente.", {
            icon: (
              <IoIosAlert className="text-white text-[20px] sm:text-[25px]" />
            ),
            duration: 3000,
            unstyled: true,
            classNames: {
              toast:
                "bg-red-600 rounded shadow px-[10px] py-[15px] w-[400px] flex items-center justify-center gap-2",
              title: "text-white font-medium text-sm sm:text-base",
            },
          });
        }
        toast("URL modificada exitosamente", {
          icon: <FaCheck className="text-white text-[15px] sm:text-[25px]" />,
          duration: 1400,
          unstyled: true,
          classNames: {
            toast:
              "bg-green-600 rounded shadow px-[10px] py-[15px] w-full flex items-center justify-center gap-3",
            title: "text-white font-medium text-sm sm:text-base",
          },
        });

        dispatch(resetUrlForm());
        setTimeout(() => {
          navigate("/my-profile");
        }, 1500);
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    }
  };

  useEffect(() => {
    if (longUrl !== "" || title !== "") {
      dispatch(resetUrlErrors());
    }
  }, [longUrl, title, dispatch]);

  useEffect(() => {
    handleGetUserUrls();
  }, []);

  useEffect(() => {
    dispatch(
      setUpdateUrlInfo({
        field: "longUrl",
        value: urlData?.longurl,
      })
    );
    dispatch(
      setUpdateUrlInfo({
        field: "shortUrl",
        value: urlData?.shorturl,
      })
    );
    dispatch(
      setUpdateUrlInfo({
        field: "title",
        value: urlData?.title,
      })
    );
  }, [urlData]);

  useEffect(() => {
    return () => {
      dispatch(resetUrlForm());
    };
  }, [location.pathname]);

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[650px] mx-auto p-4">
      <h1 className="text-slate-800 dark:text-white font-medium text-[30px] mb-2">
        Editar URL
      </h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="bg-white dark:bg-[#161B22] shadow rounded p-4">
          <form
            onSubmit={handleSendUpdatedInfo}
            className="flex flex-col gap-5"
          >
            <div>
              <label
                className="text-slate-800 dark:text-white font-medium text-[15px]"
                htmlFor="longUrl"
              >
                Enlace largo (Ingresa una nueva URL)
              </label>
              <input
                value={longUrl || ""}
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
                value={shortUrl || ""}
                onChange={handleSubmit}
                name="shortUrl"
                className="base-input font-medium bg-gray-200 dark:bg-[#0c0e11] text-gray-400 dark:text-gray-500 mt-1 pointer-events-none"
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
      )}
      <Toaster position="bottom-center" />
    </section>
  );
}
