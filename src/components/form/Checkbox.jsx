import { useId } from "react";

const Checkbox = ({ name, placeholder, label, value, onChange, checked }) => {
  const id = useId();
  return (
    <div className="flex relative">
      <input type="checkbox" name={name} checked={checked} value={value} placeholder={placeholder} id={`checkbox_${id}`} onChange={onChange} className="checkbox" />
      <label htmlFor={`checkbox_${id}`} className="inline-flex whitespace-nowrap font-medium text-sm text-slate-600 dark:text-slate-200 cursor-pointer ps-3">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
