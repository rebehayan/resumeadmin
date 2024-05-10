import { useId } from "react";

const Input = ({ type = "text", title, name, placeholder, value, onChange }) => {
  const id = useId();
  return (
    <>
      {title && <label htmlFor={`input-${id}`}>{title}</label>}
      <input
        id={`input-${id}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-[1px] px-3 w-full rounded-md bg-white dark:bg-slate-950 focus:shadow-none focus:outline-none mb-0 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-slate-200 py-2 text-sm"
      />
    </>
  );
};

export default Input;
