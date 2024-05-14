import { useId } from "react";

const Textarea = ({ title, name, height, placeholder, value, onChange }) => {
  const id = useId();
  return (
    <>
      {title && <label htmlFor={`txtarea_${id}`}>{title}</label>}
      <textarea id={`txtarea_${id}`} name={name} placeholder={placeholder} onChange={onChange} className={`textarea`} style={{ height: height }}>
        {value}
      </textarea>
    </>
  );
};

export default Textarea;
