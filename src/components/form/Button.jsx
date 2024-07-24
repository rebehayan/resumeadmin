const Button = ({ className, value, Onclick }) => {
  return (
    <button onClick={Onclick} type="submit" className={`btn ${className}`}>
      {value}
    </button>
  );
};

export default Button;
