import { Outlet } from "react-router-dom";
import Header from "../layout/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="p-10">
        <Outlet />
      </main>
      <header>푸터</header>
    </>
  );
};

export default Layout;
