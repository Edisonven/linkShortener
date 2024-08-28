import { GoUnlink } from "react-icons/go";
import DefaultButton from "../../components/buttons/DefaultButton";
import config from "../../../config/config";
import { IoMdCopy } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { TbTrashXFilled } from "react-icons/tb";
import { formatedDate } from "../../../utils/formats/formatDate";
import ProfilePagination from "../MyProfile/ProfilePagination";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import { AnimatePresence, motion } from "framer-motion";
import useGetUserLoggedUrls from "../../../hooks/users/useGetUserLoggedUrls";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useGetUrl from "../../../hooks/urls/useGetUrl";

export default function MyLinks() {
  const {
    setPage,
    total,
    totalPerPage,
    limit,
    setOrderBy,
    loading,
    userURLS,
    page,
    handleGetUserUrls,
  } = useGetUserLoggedUrls();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const { originalUrl, setOriginalUrl } = useGetUrl();
  const { urlParams } = useParams();

  const handleNavigateToEdit = (id) => {
    navigate(`/edit-url/${id}`);
  };
  const handleRedirectToHome = () => {
    navigate("/");
  };
  const [urlIdToDelete, seturlIdToDelete] = useState("");

  const handleConfirmToDelete = (id) => {
    seturlIdToDelete(id);
  };

  useEffect(() => {
    handleGetUserUrls();
    setDeleteConfirmed(false);
  }, [page, deleteConfirmed]);

  useEffect(() => {
    setDeleteConfirmed(false);
  }, [navigate]);

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[1200px] mx-auto p-4 flex flex-col">
      <h1 className="text-slate-800 dark:text-white font-medium text-[30px] mb-2">
        Mis enlaces
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          {userURLS.length > 0 ? (
            <div className="bg-white dark:bg-[#161B22] shadow rounded p-4">
              <h3 className="text-slate-800 dark:text-white text-xl mb-3 font-normal">
                Enlaces totales: <span>{total}</span>
              </h3>
              <div className="flex flex-col gap-4">
                {userURLS.map((url) => (
                  <div
                    key={url.id}
                    className="bg-[#ebebeb] dark:bg-[#0D1117] py-2 px-3 rounded-md shadow flex flex-col lg:flex-row md:justify-between gap-5 w-full"
                  >
                    <div className="w-full">
                      <h3 className="text-slate-800 dark:text-white font-medium mb-1">
                        URL
                      </h3>
                      {url.title ? (
                        <span className="text-slate-800  dark:text-white font-normal">
                          {url.title}
                        </span>
                      ) : (
                        ""
                      )}

                      <div className="">
                        <Link
                          to={url.longurl}
                          target="_blank"
                          className="text-slate-800  dark:text-white sm:font-medium hover:text-blue-600 dark:hover:text-blue-600 select-none"
                        >
                          {`${config.frontendUrl}/${url.shorturl}`}
                        </Link>
                        <p className="text-slate-800 dark:text-white text-[12px] font-normal max-w-[260px] md:max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
                          {url.longurl}
                        </p>
                      </div>
                    </div>
                    <div className="w-full">
                      <h3 className="text-slate-800 dark:text-white font-medium mb-1">
                        Fecha
                      </h3>
                      <p className="text-slate-800 dark:text-white text-sm">
                        {formatedDate(url.createdat)}
                      </p>
                    </div>
                    <CopyToClipboard
                      text={`${config.frontendUrl}/${url.shorturl}`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative">
                          <IoMdCopy
                            onClick={() => {
                              setIsCopied(url.id);
                              localStorage.setItem("short-url", url.shorturl);
                              setOriginalUrl(url.longurl);
                              setTimeout(() => {
                                setIsCopied("");
                              }, 2000);
                            }}
                            className="text-slate-800 dark:text-gray-400 text-[24px] cursor-pointer select-none sm:text-[32px] outline outline-1  p-1 rounded-sm hover:bg-slate-300 duration-300 transition-colors"
                          />
                          <AnimatePresence>
                            {isCopied === url.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white shadow rounded h-[50px] absolute top-[40px] right-[10px] p-3 flex items-center justify-center dark:bg-[#161B22] dark:text-white pointer-events-none"
                              >
                                <span className="text-slate-800 dark:text-white text-sm font-medium whitespace-nowrap">
                                  Enlace copiado al portapapeles
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <AiOutlineEdit
                          onClick={() => handleNavigateToEdit(url.id)}
                          className="text-blue-700 text-[24px] cursor-pointer select-none sm:text-[32px] outline outline-1  p-1 rounded-sm hover:bg-blue-200 duration-300 transition-colors"
                        />
                        <TbTrashXFilled
                          onClick={() => handleConfirmToDelete(url.id)}
                          className="text-red-700 text-[24px] cursor-pointer select-none sm:text-[32px] outline outline-1 p-1 rounded-sm hover:bg-red-200 duration-300 transition-colors"
                        />
                      </div>
                    </CopyToClipboard>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#161B22] shadow rounded h-[400px] flex justify-center">
              <div className="flex items-center gap-5 flex-col px-2 py-5">
                <GoUnlink className="text-slate-800 dark:text-white text-[45px]" />
                <h3 className="text-slate-800 dark:text-white text-[23px] font-medium">
                  No tienes enlaces en tu perfil
                </h3>
                <p className="text-center text-slate-800 dark:text-white mt-3 font-medium">
                  Cuando comiences a acortar enlaces podrás gestionarlos dese
                  acá
                </p>
                <DefaultButton
                  onClick={handleRedirectToHome}
                  className="default-button text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 mt-6 dark:bg-gray-300 py-[12px] px-[20px] rounded-[30px] relative overflow-hidden"
                >
                  Acortar
                </DefaultButton>
              </div>
            </div>
          )}
        </div>
      )}
      {total < 6 ? (
        ""
      ) : (
        <ProfilePagination
          page={page}
          setPage={setPage}
          total={total}
          totalPerPage={totalPerPage}
          limit={limit}
          setOrderBy={setOrderBy}
          className="self-end mt-3"
        />
      )}
      <AnimatePresence>
        {urlIdToDelete ? (
          <DeleteConfirmModal
            urlIdToDelete={urlIdToDelete}
            seturlIdToDelete={seturlIdToDelete}
            setDeleteConfirmed={setDeleteConfirmed}
            deleteConfirmed={deleteConfirmed}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
