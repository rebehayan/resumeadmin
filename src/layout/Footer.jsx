import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="grid grid-cols-[1fr_3fr_1fr] px-5">
      <div>
        <Link to="/styleguide">Styleguide</Link>
      </div>
      <div className="text-center">{year} &copy; Copyright All reservered Rebehayan</div>
      <div></div>
    </footer>
  );
};

export default Footer;
