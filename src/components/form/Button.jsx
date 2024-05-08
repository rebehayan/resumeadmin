const Button = ({ className, value }) => {
  return (
    <button type="submit" className={`btn ${className}`}>
      {value}
    </button>
  );
};

export default Button;
