import { useSelector } from "react-redux";
import config from "../../config/config";

const usePathcUserPassword = () => {
  const token = useSelector((state) => state.userToken.token);

  const handleUpdateUserPassword = async (password, newPassword) => {
    try {
      if (token) {
        const response = await fetch(
          `${config.backendUrl}/users/user/password`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              password,
              newPassword,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        await response.json();
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  return { handleUpdateUserPassword };
};

export default usePathcUserPassword;
