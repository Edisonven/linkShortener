import { useState } from "react";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

export default function InputField({
  value,
  name,
  type,
  handleSubmit,
  placeholder,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="base-input__container relative">
      <input
        onChange={handleSubmit}
        value={value}
        name={name}
        className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
        type={showPassword ? "text" : type}
        placeholder=" "
      />
      {type === "password" ? (
        <div className="absolute top-[10px] right-[10px] select-none cursor-pointer" onClick={handleShowPassword}>
          {showPassword ? (
            <PiEyeLight className="text-slate-800 dark:text-white text-[25px]" />
          ) : (
            <PiEyeSlash className="text-slate-800 dark:text-white text-[25px]" />
          )}
        </div>
      ) : (
        ""
      )}
      <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
        {placeholder}
      </span>
      {error && <span className="text-red-600 font-medium">{error}.</span>}
    </div>
  );
}
