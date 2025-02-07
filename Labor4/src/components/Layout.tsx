import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      <main 
        key={location.pathname}
        className="container mx-auto px-4 py-8 animate-fade-in"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;