import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetToken } from "../../features/users/usersSlice";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import useFetchUser from "../../../hooks/users/useFetchUser";
import DefaultButton from "../buttons/DefaultButton";

export default function Perfil() {
  const dispatch = useDispatch();

  const { user, loading, error } = useFetchUser();

  const formatedName = user?.name.split(" ");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const btnRef = useRef(null);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      btnRef.current &&
      !modalRef.current.contains(event.target) &&
      !btnRef.current.contains(event.target)
    ) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCloseSesion = () => {
    dispatch(resetToken());
    localStorage.removeItem("short-url");
  };

  useEffect(() => {
    setOpenModal(false);
  }, [navigate]);

  return (
    <section className="cursor-pointer relative">
      <DefaultButton
        ref={btnRef}
        onClick={handleOpenModal}
        animated={false}
        className="flex items-center gap-1 text-white bg-slate-500 px-2 select-none rounded shadow dark:bg-slate-500 overflow-hidden relative"
      >
        {loading ? (
          ""
        ) : (
          <p className="font-medium text-[25px]">
            {formatedName[0]?.charAt(0).toUpperCase() +
              formatedName[1]?.charAt(0).toUpperCase()}
          </p>
        )}
        <IoIosArrowDown />
      </DefaultButton>
      <AnimatePresence>
        {openModal && (
          <motion.div
            ref={modalRef}
            className="modal bg-white dark:bg-[#161b22] dark:text-white absolute top-[55px] right-[0] w-[150px]  rounded shadow flex items-center justify-center flex-col gap-2 px-2 py-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ originX: 1, originY: 0 }}
          >
            <Link
              to="/my-profile"
              className="font-medium hover:bg-[#0000001c] w-full text-center rounded p-1"
            >
              Mi perfil
            </Link>
            <Link
              to="/my-links"
              className="font-medium hover:bg-[#0000001c] w-full text-center rounded p-1"
            >
              Mis enlaces
            </Link>
            <hr className="w-full" />
            <div className="flex items-center justify-center gap-1 mt-1 hover:bg-[#0000001c] w-full rounded">
              <button
                onClick={handleCloseSesion}
                className="text-sm font-medium p-1"
              >
                Cerrar sesión
              </button>
              <IoIosLogOut className="text-[20px]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
