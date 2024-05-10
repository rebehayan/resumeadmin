import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="p-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
