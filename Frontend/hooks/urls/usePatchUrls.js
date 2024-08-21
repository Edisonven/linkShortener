import { useSelector } from "react-redux";
import config from "../../config/config";
import { useState } from "react";

const usePatchUrls = () => {
  const token = useSelector((state) => state.userToken.token);
  const [loading, setLoading] = useState(false);

  const handleUpdateUrls = async (longUrl, title, id) => {
    setLoading(true);
    try {
      if (token) {
        const response = await fetch(`${config.backendUrl}/urls/edit-url`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            longUrl,
            title,
            id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdateUrls,
  };
};

export default usePatchUrls;
