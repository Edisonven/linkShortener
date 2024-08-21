import { useSelector } from "react-redux";
import config from "../../config/config";
import { useState } from "react";

const useDeleteUrl = () => {
  const token = useSelector((state) => state.userToken.token);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteUrl = async (url_id) => {
    setDeleteLoading(true);
    try {
      if (token) {
        const response = await fetch(`${config.backendUrl}/urls/delete-url`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            url_id,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        await response.json();
      }
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    handleDeleteUrl,
    deleteLoading,
  };
};

export default useDeleteUrl;
