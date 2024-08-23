import { toast } from "sonner";

const useToast = () => {
  const showToast = ({ message, error = false, duration = 3000 }) => {
    toast(message, {
      duration: duration,
      unstyled: true,
      classNames: {
        toast: `${
          error ? "bg-red-600" : "bg-green-600"
        } rounded shadow px-[10px] py-[15px] w-[400px] flex items-center justify-center gap-2`,
        title: "text-white font-medium text-sm sm:text-base",
      },
    });
  };

  return { showToast };
};

export default useToast;
