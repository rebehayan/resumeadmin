import { useId } from "react";

const Checkbox = ({ name, placeholder, value, onChange }) => {
  const id = useId();
  return (
    <div className="flex relative">
      <input
        type="checkbox"
        name={name}
        placeholder={placeholder}
        id={`checkbox_${id}`}
        onChange={onChange}
        className="h-5 w-5 p-1 bg-white dark:bg-slate-950 checked:dark:bg-blue-600 border-slate-300 dark:border-slate-700 checked:dark:border-blue-600 border-2 focus:dark:ring-offset-slate-950 rounded text-sm"
      />
      <label htmlFor={`checkbox_${id}`} className="inline-flex font-medium text-sm text-slate-600 dark:text-slate-200 cursor-pointer ps-3">
        {value}
      </label>
    </div>
  );
};

export default Checkbox;
