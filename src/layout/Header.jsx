import { Link } from "react-router-dom";
import Gnb from "../components/Gnb";
import Logo from "../components/Logo";
import Profile from "../components/Profile";

const Header = () => {
  return (
    <header className="grid grid-cols-[1fr_4fr_1fr] gap-5 items-center py-5 px-4 ">
      <Link to="/">
        <Logo className="w-28" />
      </Link>
      <Gnb />
      <Profile />
    </header>
  );
};

export default Header;
