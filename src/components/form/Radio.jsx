import { useId } from "react";

const Radio = ({ label, name, onChange, checked, value }) => {
  const id = useId();
  return (
    <>
      <input type="radio" name={name} checked={checked} value={value} id={`radio_${id}`} onChange={onChange} className="radio blue" />
      <label htmlFor={`radio_${id}`}>{label}</label>
    </>
  );
};

export default Radio;
