import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="py-10 bg-slate-100 min-h-[70vh]">
        <div className="mx-auto w-[100rem]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
