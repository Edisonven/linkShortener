import { useEffect } from "react";
import useGetUserLoggedUrls from "../../../hooks/users/useGetUserLoggedUrls";
import { GoUnlink } from "react-icons/go";
import DefaultButton from "../../components/buttons/DefaultButton";
import config from "../../../config/config";
import { IoMdCopy } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { TbTrashXFilled } from "react-icons/tb";
import { formatedDate } from "../../../utils/formats/formatDate";

export default function MyProfile() {
  const { handleGetUserUrls, loading, userURLS } = useGetUserLoggedUrls();

  useEffect(() => {
    handleGetUserUrls();
  }, []);

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[1200px] mx-auto p-4">
      <h1 className="text-slate-800 dark:text-white font-medium text-[30px] mb-2">
        Mis enlaces
      </h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="">
          {userURLS.length > 0 ? (
            <div className="bg-white dark:bg-[#161B22] shadow rounded p-4">
              <h3 className="text-slate-800 dark:text-white text-xl mb-3 font-normal">
                Enlaces totales : <span>{userURLS.length}</span>
              </h3>
              <div className="flex flex-col gap-3">
                {userURLS.map((url) => (
                  <div
                    key={url.id}
                    className="bg-[#ebebeb] dark:bg-[#0D1117] py-2 px-3 rounded-md shadow flex flex-col lg:flex-row md:justify-between gap-5 w-full"
                  >
                    <div>
                      <h3 className="text-slate-800 dark:text-white font-medium mb-1">
                        URL
                      </h3>
                      <div className="md:w-[400px]">
                        <p className="text-slate-800 dark:text-white">
                          {`${config.frontendUrl}/${url.shorturl}`}
                        </p>
                        <p className="text-slate-800 dark:text-white text-[12px] font-normal max-w-[260px] md:max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
                          {url.longurl}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-slate-800 dark:text-white font-medium mb-1">
                        Fecha
                      </h3>
                      <p className="text-slate-800 dark:text-white text-sm">
                        {formatedDate(url.createdat)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoMdCopy className="text-slate-800 dark:text-white text-[24px] cursor-pointer" />
                      <AiOutlineEdit className="text-slate-800 dark:text-white text-[24px] cursor-pointer" />
                      <TbTrashXFilled className="text-slate-800 dark:text-white text-[24px] cursor-pointer" />
                    </div>
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
                <DefaultButton className="default-button text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 mt-6 dark:bg-gray-300">
                  Acortar
                </DefaultButton>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
