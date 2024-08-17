import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../features/users/usersSlice";
import { IoIosArrowDown } from "react-icons/io";

export default function Perfil() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userToken.token);
  const user = useSelector((state) => state.user);
  const { name, email, status, error } = user;
  const formatedName = name?.split(" ");

  useEffect(() => {
    dispatch(fetchUser(userToken));
  }, [dispatch]);

  return (
    <section className="cursor-pointer">
      <div className="flex items-center gap-1 text-white dark:text-slate-800 bg-slate-500 px-2 select-none rounded shadow dark:bg-slate-100">
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
    </section>
  );
}
