import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config/config";
import { resetToken } from "../../src/features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const useFetchUser = () => {
  const token = useSelector((state) => state.userToken.token);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/users/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok");
        }

        const data = await response.json();

        setUser(data.user);
      } catch (error) {
        setError(error.message);
        if (error.message === "Invalid token") {
          alert("Sesión expirada, por favor inicia sesión nuevamente");
          setError("");
          dispatch(resetToken());
          navigate("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return { user, loading, error, setError };
};

export default useFetchUser;
