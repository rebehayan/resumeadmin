const File = ({ title, name, placeholder, value, onChange }) => {
  return <input type="file" name={name} placeholder={placeholder} title={title} value={value} onChange={onChange} className="input" />;
};

export default File;
