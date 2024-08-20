import { useState } from "react";
import config from "../../config/config";

const useGetUrl = () => {
  const shortUrl = sessionStorage.getItem("short-url");
  const [loading, setLoading] = useState(false);

  const handleGetLongUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${config.backendUrl}/urls/long-url/${shortUrl}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleGetLongUrl,
    loading,
  };
};

export default useGetUrl;
