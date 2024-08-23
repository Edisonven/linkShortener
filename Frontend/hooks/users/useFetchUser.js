import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import config from "../../config/config";

const useFetchUser = () => {
  const token = useSelector((state) => state.userToken.token);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
