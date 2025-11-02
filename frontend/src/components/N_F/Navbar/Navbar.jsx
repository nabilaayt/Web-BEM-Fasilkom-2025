import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import "./style.css";
import logo from "../../../Assets/Logo/Logo-BEM.png";
import { useAuth } from "../../../utils/authContext";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMobileOpen, setIsDropdownMobileOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleNav = () => {
    setIsMenu(!isMenu);
    setIsDropdownMobileOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="navbar justify-between flex p-3 top-0 fixed w-full">
      {/* Logo */}
      <div>
        <Link
          to="/"
          className="mt-2 font-gotham-book self-center text-gradient items-center ease-in-out duration-300 cursor-pointer text-sm font-semibold ml-3 flex"
        >
          <div className="flex items-center">
            {/* Logo Image - responsive size */}
            <img src={logo} className="w-12 sm:w-14 lg:w-18" alt="BEM Logo" />

            {/* Text - hidden on small screens, shown on medium+ */}
            <div className="self-center ml-2 sm:ml-3 lg:ml-4 hidden sm:block">
              <h1 className="text-base sm:text-xl lg:text-2xl cinzel-bold">
                BEM KM FASILKOM UNSRI
              </h1>
              <div className="text-xs sm:text-sm lg:text-lg">
                <span className="cinzel-decorative-bold">K</span>
                <span className="cinzel-bold">ABINET</span>{" "}
                <span className="cinzel-decorative-bold">A</span>
                <span className="cinzel-bold">RTHA</span>{" "}
                <span className="cinzel-bold">DARM</span>
                <span className="cinzel-decorative-bold">A</span>
              </div>
            </div>

            {/* Mobile: Only show acronym */}
            <div className="self-center ml-2 sm:hidden">
              <h1 className="text-sm cinzel-bold">BEM KM FASILKOM UNSRI</h1>
              <span className="text-xs cinzel-decorative-bold">K</span>
              <span className="text-xs cinzel-bold">ABINET</span>{" "}
              <span className="text-xs cinzel-decorative-bold">A</span>
              <span className="text-xs cinzel-bold">RTHA</span>{" "}
              <span className="text-xs cinzel-bold">DARM</span>
              <span className="text-xs cinzel-decorative-bold">A</span>{" "}
            </div>
          </div>
        </Link>
      </div>

      {/* Normal Navbar */}
      <div className="navbar-nav flex">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `my-6 gotham self-center items-center ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden ${
                isActive ? "text-blue-600 font-semibold" : "hover-text"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

        {/* Dropdown Desktop */}
        <div className="relative mx-6 self-center lg:inline hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="font-gotham-book text-[#636363] self-center items-center ease-in-out duration-300 text-base font-normal hover:text-[#4a0000]"
          >
            BEM APPS
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded shadow-lg z-50">
              <a
                href="https://gaspol.bemilkomunsri.org/"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                GASPOL
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                ILKOM NEWS
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                E-MAGAZINE
              </a>
            </div>
          )}
        </div>

        {/* Login / Logout button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="my-6 ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 ease-in-out duration-300 text-sm font-medium lg:inline hidden"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="my-6 ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ease-in-out duration-300 text-sm font-medium lg:inline hidden"
          >
            Admin
          </button>
        )}
      </div>

      {/* Hamburger Menu */}
      <div className="lg:hidden flex right-0 self-center">
        <p
          onClick={toggleNav}
          className="icons mr-4 right-0 text-[#4a0000] text-2xl self-center font-medium cursor-pointer"
        >
          &#9776;
        </p>
      </div>

      {/* Sidebar (Mobile Menu) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-[#636363] transform ${
          isMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <div className="flex flex-col p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleNav}
              className="text-[#4a0000] text-2xl hover:text-[#636363] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={toggleNav}
                className={({ isActive }) =>
                  `font-gotham-book text-base transition-colors ${
                    isActive
                      ? "text-[#4a0000] font-gotham-medium font-semibold"
                      : "text-[#636363] hover:text-[#4a0000]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Dropdown Mobile */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsDropdownMobileOpen(!isDropdownMobileOpen)}
                className="font-gotham-book text-base text-left text-[#636363] hover:text-[#4a0000] transition-colors"
              >
                BEM APPS {isDropdownMobileOpen ? "▴" : "▾"}
              </button>
              {isDropdownMobileOpen && (
                <div className="ml-4 mt-3 flex flex-col space-y-3">
                  <a
                    href="https://gaspol.bemilkomunsri.org/"
                    className="text-sm text-[#636363] hover:text-[#4a0000] transition-colors"
                  >
                    GASPOL
                  </a>
                  <a
                    href="https://ilkomnews.bemilkomunsri.org/"
                    className="text-sm text-[#636363] hover:text-[#4a0000] transition-colors"
                  >
                    ILKOM NEWS
                  </a>
                </div>
              )}
            </div>

            {/* Login / Logout in Sidebar */}
            <div className="pt-6 border-t border-gray-200">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleNav();
                  }}
                  className="w-full bg-white text-[#4a0000] px-4 py-2 rounded-lg border-2 border-[#4a0000] hover:bg-[#4a0000] hover:text-white hover:border-white ease-in-out duration-300 text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    toggleNav();
                  }}
                  className="w-full bg-[#4a0000] text-white px-4 py-2 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#4a0000] hover:border-[#4a0000] ease-in-out duration-300 text-sm font-medium"
                >
                  Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
