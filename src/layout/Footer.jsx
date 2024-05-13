import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex justify-between px-5 py-10 border-t-[1px] border-slate-200">
      <div className="text-center">{year} &copy; Copyright All reservered Rebehayan</div>
      <div>
        <Link to="/styleguide">Styleguide</Link>
      </div>
    </footer>
  );
};

export default Footer;
