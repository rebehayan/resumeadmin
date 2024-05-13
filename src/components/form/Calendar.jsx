import { useId } from "react";

const Calendar = ({ title, name, placeholder, min, value, onChange }) => {
  const id = useId();
  return (
    <>
      {title && <label htmlFor={`input-${id}`}>{title}</label>}
      <input type="date" onChange={onChange} min={min} value={value} name={name} data-placeholder={placeholder} />
    </>
  );
};

export default Calendar;
