export default function InputField({
  value,
  name,
  type,
  handleSubmit,
  placeholder,
  error,
}) {
  return (
    <div className="base-input__container">
      <input
        onChange={handleSubmit}
        value={value}
        name={name}
        className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
        type={type}
        placeholder=" "
      />
      <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
        {placeholder}
      </span>
      {error && <span className="text-red-600 font-medium">{error}.</span>}
    </div>
  );
}
