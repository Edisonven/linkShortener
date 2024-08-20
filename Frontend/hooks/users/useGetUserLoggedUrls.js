import { useSelector } from "react-redux";
import config from "../../config/config";
import useFetchUser from "./useFetchUser";
import { useState } from "react";

const useGetUserLoggedUrls = () => {
  const { user } = useFetchUser();
  const token = useSelector((state) => state.userToken.token);
  const [loading, setLoading] = useState(false);
  const [userURLS, setUserURLS] = useState([]);

  const handleGetUserUrls = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${config.backendUrl}/urls/user-url/${user?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      if (data) {
        setUserURLS(data.data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleGetUserUrls,
    loading,
    userURLS,
  };
};

export default useGetUserLoggedUrls;
