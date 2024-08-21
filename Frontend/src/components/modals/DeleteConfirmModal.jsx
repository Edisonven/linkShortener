import useDeleteUrl from "../../../hooks/urls/useDeleteUrl";
import DefaultButton from "../buttons/DefaultButton";
import "../modals/DeleteConfirmModal.css";
import { motion } from "framer-motion";

export default function DeleteConfirmModal({
  urlIdToDelete,
  seturlIdToDelete,
}) {
  const { handleDeleteUrl } = useDeleteUrl();

  const cancelDelete = () => {
    seturlIdToDelete("");
  };
  const confirmDelete = (urlIdToDelete) => {
    handleDeleteUrl(urlIdToDelete);
    seturlIdToDelete("");
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="delete-modal shadow bg-white rounded dark:bg-[#161B22] dark:shadow-gray-800 w-[320px] h-[150px] p-3"
      >
        <div className="text-slate-800 dark:text-white flex flex-col items-center justify-between h-full">
          <h1 className="text-center font-medium text-[16px]">ELIMINAR LINK</h1>
          <h1 className="text-center font-medium text-[16px]">
            ¿Seguro que quieres eliminar este link?
          </h1>
          <div className="flex items-center justify-center gap-3">
            <DefaultButton
              onClick={cancelDelete}
              className="text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none"
            >
              Cancelar
            </DefaultButton>
            <DefaultButton
              onClick={() => confirmDelete(urlIdToDelete)}
              className="text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none"
            >
              Confirmar
            </DefaultButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
