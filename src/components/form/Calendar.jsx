import { useId } from "react";

const Calendar = ({ title, name, placeholder, value, onChange }) => {
  const id = useId();
  return (
    <>
      {title && <label htmlFor={`input-${id}`}>{title}</label>}
      <input type="date" onChange={onChange} value={value} name={name} data-placeholder={placeholder} />
    </>
  );
};

export default Calendar;
