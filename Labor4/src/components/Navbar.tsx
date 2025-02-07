import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-[#1F1F1F] py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl font-bold transition-all duration-300 hover:text-[#7C3AED] relative"
        >
          Блог
        </Link>
        <div className="space-x-4">
          <Link 
            to="/" 
            className={`transition-all duration-300 hover:text-[#7C3AED] relative ${
              location.pathname === "/" ? "text-[#7C3AED]" : ""
            }`}
          >
            Головна
            {location.pathname === "/" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7C3AED] animate-fade-in" />
            )}
          </Link>
          <Link 
            to="/categories" 
            className={`transition-all duration-300 hover:text-[#7C3AED] relative ${
              location.pathname === "/categories" ? "text-[#7C3AED]" : ""
            }`}
          >
            Категорії
            {location.pathname === "/categories" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7C3AED] animate-fade-in" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;