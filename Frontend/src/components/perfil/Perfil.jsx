import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../features/users/usersSlice";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export default function Perfil() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userToken.token);
  const user = useSelector((state) => state.user);
  const { name, email, status, error } = user;
  const formatedName = name?.split(" ");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(userToken));
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <section className="cursor-pointer relative">
      <div
        onClick={handleOpenModal}
        className="flex items-center gap-1 text-white dark:text-slate-800 bg-slate-500 px-2 select-none rounded shadow dark:bg-slate-100"
      >
        {status === "loading" ? (
          ""
        ) : (
          <p className="font-medium text-[25px]">
            {formatedName[0]?.charAt(0).toUpperCase() +
              formatedName[1]?.charAt(0).toUpperCase()}
          </p>
        )}
        <IoIosArrowDown />
      </div>
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="modal bg-white absolute top-[50px] right-[0] w-[150px] h-[80px] rounded shadow flex items-center justify-center flex-col gap-2 p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Link className="font-medium">Mi perfil</Link>
            <hr className="w-full" />
            <div className="flex items-center gap-1">
              <Link className="text-sm font-medium">Cerrar sesión</Link>
              <IoIosLogOut className="text-[20px]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
