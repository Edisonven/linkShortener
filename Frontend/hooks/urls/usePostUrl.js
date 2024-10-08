import { useDispatch, useSelector } from "react-redux";
import config from "../../config/config";
import { useState } from "react";
import { setLongUrl } from "../../src/features/url/urlSlice";

const usePostUrl = () => {
  const token = useSelector((state) => state.userToken.token);
  const { longUrl } = useSelector((state) => state.urls);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSendUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.backendUrl}/urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          longUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      const UrlData = data.urls.shorturl;

      if (data) {
        dispatch(setLongUrl({ field: "shortUrl", value: UrlData }));
        localStorage.setItem("short-url", UrlData);
      }
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSendUrl,
    loading,
  };
};

export default usePostUrl;
