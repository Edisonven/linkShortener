import { useSelector } from "react-redux";
import config from "../../config/config";
import useFetchUser from "./useFetchUser";
import { useState } from "react";

const useGetUserLoggedUrls = () => {
  const { user } = useFetchUser();
  const token = useSelector((state) => state.userToken.token);
  const [loading, setLoading] = useState(false);
  const [userURLS, setUserURLS] = useState([]);
  const [page, setPage] = useState(1);
  const [order_by, setOrderBy] = useState("createdat_DESC");
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [totalPerPage, setTotalPerPage] = useState(0);

  const handleGetUserUrls = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${config.backendUrl}/urls/user-url/${user?.id}/?limits=${limit}&page=${page}&order_by=${order_by}`,

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
      const { results, total, totalPerPage } = await response.json();
      setUserURLS(results);
      setTotal(total);
      setTotalPerPage(totalPerPage);
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
    page,
    setPage,
    total,
    totalPerPage,
    limit,
    setOrderBy,
  };
};

export default useGetUserLoggedUrls;
