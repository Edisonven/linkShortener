import { useDispatch } from "react-redux";

const useFormSubmit = (setFunction) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    dispatch(setFunction({ field: name, value }));
  };

  return {
    handleSubmit,
  };
};

export default useFormSubmit;
