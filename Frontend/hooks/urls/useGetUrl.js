import { useState } from "react";
import config from "../../config/config";

const useGetUrl = () => {
  const shortUrl = localStorage.getItem("short-url");
  const [loading, setLoading] = useState(false);
  const [shortedUrl, setShortedUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

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
        setOriginalUrl(data.url.longurl);
        setShortedUrl(data.url.shorturl);
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
    shortedUrl,
    originalUrl,
    shortUrl,
  };
};

export default useGetUrl;
