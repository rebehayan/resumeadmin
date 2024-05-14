import { useId, useState } from "react";
import Text from "../Text";

const Checkbox = ({ name, placeholder, label, value, onChange, checked }) => {
  const id = useId();
  const [isChecked, setIsChecked] = useState(checked);
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onChange(e);
  };

  return (
    <div className="flex relative">
      <input type="checkbox" name={name} checked={isChecked} value={value} placeholder={placeholder} id={`checkbox_${id}`} onChange={handleChange} className="checkbox blue" />
      <label htmlFor={`checkbox_${id}`} className="inline-flex whitespace-nowrap  cursor-pointer ps-2">
        <Text>{label}</Text>
      </label>
    </div>
  );
};

export default Checkbox;
