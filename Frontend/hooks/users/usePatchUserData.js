import { useSelector } from "react-redux";
import config from "../../config/config";

const usePatchUserData = () => {
  const token = useSelector((state) => state.userToken.token);

  const handleUpdateUserData = async (name) => {
    try {
      if (token) {
        const response = await fetch(`${config.backendUrl}/users/user`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
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
    }
  };

  return {
    handleUpdateUserData,
  };
};

export default usePatchUserData;
