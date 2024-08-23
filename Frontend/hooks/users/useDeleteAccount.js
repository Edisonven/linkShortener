import { useSelector } from "react-redux";
import config from "../../config/config";

const useDeleteAccount = () => {
  const token = useSelector((state) => state.userToken.token);

  const handleDeleteUserAccount = async (accepted) => {
    try {
      if (token) {
        const response = await fetch(`${config.backendUrl}/users/user/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            accepted,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  return { handleDeleteUserAccount };
};

export default useDeleteAccount;
