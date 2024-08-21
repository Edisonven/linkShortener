import DefaultButton from "../../components/buttons/DefaultButton";

export default function EditMyUrl() {
  const handleSendUpdatedInfo = (e) => {
    e.preventDefault();
  };

  return (
    <section className="mt-[10px] sm:mt-[30px] max-w-[600px] mx-auto p-4">
      <h1 className="text-slate-800 dark:text-white font-medium text-[30px] mb-2">
        Editar URL
      </h1>
      <div className="bg-white dark:bg-[#161B22] shadow rounded p-4">
        <form className="flex flex-col gap-5">
          <div>
            <label
              className="text-slate-800 dark:text-white font-medium text-[15px]"
              htmlFor="long-url"
            >
              Enlace largo
            </label>
            <input
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white mt-1"
              type="text"
            />
          </div>
          <div>
            <label
              className="text-slate-800 dark:text-white font-medium text-[15px]"
              htmlFor="long-url"
            >
              Título
            </label>
            <input
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white mt-1"
              type="text"
            />
          </div>
          <div>
            <label
              className="text-slate-800 dark:text-white font-medium text-[15px]"
              htmlFor="long-url"
            >
              Enlace corto
            </label>
            <input
              className="base-input bg-white dark:bg-[#161B22] text-slate-800 dark:text-white mt-1 pointer-events-none"
              type="text"
            />
          </div>
          <DefaultButton
            onClick={handleSendUpdatedInfo}
            className="default-button w-[max-content] text-white font-medium dark:text-slate-800 flex items-center gap-1 bg-teal-700 dark:bg-gray-300 select-none"
          >
            Actualizar
          </DefaultButton>
        </form>
      </div>
    </section>
  );
}
