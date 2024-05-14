import { useId, useState } from "react";
import Text from "../Text";

const Input = ({ type = "text", title, defaultValue, name, placeholder, value, onChange, readOnly, disabled }) => {
  const id = useId();
  const [isValue, setIsValue] = useState(value);
  const handleChange = (e) => {
    setIsValue(e.target.value);
    onChange(e);
  };
  return (
    <>
      {title && (
        <label htmlFor={`input-${id}`} className="whitespace-nowrap">
          <Text>{title}</Text>
        </label>
      )}
      <input
        id={`input-${id}`}
        type={type}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        value={isValue}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        className="border-[1px] px-3 w-full rounded-md bg-white dark:bg-slate-950 focus:shadow-none focus:outline-none mb-0 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-slate-200 py-2 text-sm read-only:bg-slate-100 read-only:opacity-85"
      />
    </>
  );
};

export default Input;
