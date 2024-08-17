import { useSelector } from "react-redux";

export default function Perfil() {
  const user = useSelector((state) => state.userToken);

  return (
    <section>
      <h1>Hola soy el perfil</h1>
    </section>
  );
}
