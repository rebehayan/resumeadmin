import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>헤더</header>
      <Outlet />
      <header>푸터</header>
    </>
  );
};

export default Layout;
