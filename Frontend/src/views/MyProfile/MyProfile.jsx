import { useEffect } from "react";
import useGetUserLoggedUrls from "../../../hooks/users/useGetUserLoggedUrls";
import { GoUnlink } from "react-icons/go";
import DefaultButton from "../../components/buttons/DefaultButton";

export default function MyProfile() {
  const { handleGetUserUrls, loading, userURLS } = useGetUserLoggedUrls();

  useEffect(() => {
    handleGetUserUrls();
  }, []);

  return (
    <section className="mt-[80px] max-w-[1200px] mx-auto p-4">
      <h1 className="text-slate-800 dark:text-white font-medium text-[30px]">
        Mis enlaces
      </h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="">
          {userURLS.length > 0 ? (
            <div className="bg-white dark:bg-[#161B22] shadow rounded">
              <p>hola</p>
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
