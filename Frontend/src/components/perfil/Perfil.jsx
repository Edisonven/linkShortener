import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../features/users/usersSlice";

export default function Perfil() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userToken.token);
  const user = useSelector((state) => state.user);
  const { name, email, status, error } = user;

  useEffect(() => {
    dispatch(fetchUser(userToken));
  }, [dispatch]);

  return (
    <section>
      <h1>Hola soy el perfil</h1>
    </section>
  );
}
