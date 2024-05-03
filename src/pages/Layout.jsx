import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>헤더</header>
      <main className="p-10">
        <Outlet />
      </main>
      <header>푸터</header>
    </>
  );
};

export default Layout;
