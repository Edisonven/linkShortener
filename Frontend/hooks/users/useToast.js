import { toast } from "sonner";

const useToast = () => {
  const showToast = ({ message, error = false, duration = 3000 }) => {
    toast(message, {
      duration: duration,
      unstyled: true,
      style: {
        backgroundColor: error ? "#DC2626" : "#16A34A",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
        padding: "15px 10px",
        width: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      },
      classNames: {
        title: "text-white font-medium text-sm sm:text-base",
      },
    });
  };

  return { showToast };
};

export default useToast;
