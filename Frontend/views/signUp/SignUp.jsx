import { BiLink } from "react-icons/bi";

export default function SignUp() {
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <BiLink className="text-slate-800 text-xl dark:text-white" />
          <h1 className="text-slate-800 font-medium dark:text-white">
            URL Shortener
          </h1>
        </div>
        <form className="flex flex-col gap-2 border rounded-md shadow p-2 w-full max-w-[600px] mt-6 h-[400px]">
          <input className="base-input" type="text" placeholder=" "/>
          <input className="base-input" type="text" placeholder=" "/>
          <input className="base-input" type="text" placeholder=" "/>
          <input className="base-input" type="text" placeholder=" "/>
        </form>
      </div>
    </section>
  );
}
