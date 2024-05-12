import { useId } from "react";

const File = ({ title, name, placeholder, value, onChange }) => {
  const id = useId();
  return (
    <>
      {title && <label htmlFor={`file_${id}`}>{title}</label>}
      <input type="file" id={`file_${id}`} name={name} placeholder={placeholder} title={title} value={value} onChange={onChange} className="input" />
    </>
  );
};

export default File;
