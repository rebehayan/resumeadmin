import { useId } from "react";

const Calendar = ({ title, name, placeholder, min, max, value, onChange }) => {
  const id = useId();
  return (
    <>
      {title && <label htmlFor={`input-${id}`}>{title}</label>}
      <input type="date" className="input" onChange={onChange} min={min} max={max} value={value} name={name} data-placeholder={placeholder} />
    </>
  );
};

export default Calendar;
