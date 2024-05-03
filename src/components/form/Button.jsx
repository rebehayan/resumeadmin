const Button = ({ color, value }) => {
  return (
    <button type="submit" className={color}>
      {value}
    </button>
  );
};

export default Button;
