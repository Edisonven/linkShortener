import DefaultButton from "../../components/buttons/DefaultButton";

export default function EditUserPassword() {
  const handleSendNewPassword = (e) => {
    e.preventDefault();
  };

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[1000px] mx-auto p-4">
      <div className="max-w-[600px] mx-auto p-6 shadow rounded bg-white dark:bg-[#161B22]">
        <h1 className="text-slate-800 dark:text-white font-normal text-2xl">
          Contraseña
        </h1>
        <form
          onSubmit={handleSendNewPassword}
          className="mt-6 flex flex-col gap-6"
        >
          <div className="base-input__container">
            <input
              name="name"
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
              type="password"
              placeholder=" "
            />
            <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
              Contraseña actual
            </span>
            {/*     {errors.name && (
              <span className="text-red-600 font-medium">{errors.name}.</span>
            )} */}
          </div>
          <div className="base-input__container">
            <input
              name="name"
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
              type="password"
              placeholder=" "
            />
            <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
              Nueva contraseña
            </span>
            {/*     {errors.name && (
              <span className="text-red-600 font-medium">{errors.name}.</span>
            )} */}
          </div>
          <div className="base-input__container">
            <input
              name="name"
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white"
              type="password"
              placeholder=" "
            />
            <span className="base-input__paragraph text-[15px] text-gray-500 font-medium bg-white dark:bg-[#161B22] dark:text-white">
              Confirmar contraseña
            </span>
            {/*     {errors.name && (
              <span className="text-red-600 font-medium">{errors.name}.</span>
            )} */}
          </div>
          <div className="mt-4">
            <DefaultButton className="default-button w-[max-content] text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none px-[15px] py-[10px] rounded-[30px] relative overflow-hidden">
              Guardar
            </DefaultButton>
          </div>
        </form>
      </div>
    </section>
  );
}
