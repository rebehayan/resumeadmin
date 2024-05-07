import { useId } from "react";

const Radio = ({ label, name, onChange, value }) => {
  const id = useId();
  return (
    <>
      <input type="radio" name={name} value={value} id={`radio_${id}`} onChange={onChange} className="radio" />
      <label htmlFor={`radio_${id}`}>{label}</label>
    </>
  );
};

export default Radio;
