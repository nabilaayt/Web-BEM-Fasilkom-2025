import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import "./style.css";
import logo from "../../../Assets/Logo/Logo-BEM.png";
import { useAuth } from "../../../utils/authContext"; // pastikan ada

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

  // definisikan path di sini
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
          className="my-6 gotham self-center text-gradient items-center ease-in-out duration-300 cursor-pointer text-sm font-semibold ml-3 lg:inline flex"
        >
          <div className="flex">
            <img src={logo} className="w-12" alt="BEM Logo" />
            <div className="self-center ml-4">
              <h1 className="text-xl cinzel-bold">BEM KM FASILKOM UNSRI</h1>
              <span className="cinzel-decorative-bold">K</span>
              <span className="cinzel-bold">ABINET</span>{" "}
              <span className="cinzel-decorative-bold">A</span>
              <span className="cinzel-bold">RTHA</span>{" "}
              <span className="cinzel-bold">DARM</span>
              <span className="cinzel-decorative-bold">A</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Normal Navbar */}
       <div className="navbar-nav flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `my-6 gotham self-center items-center ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden ${
              isActive ? "text-red-600 font-semibold" : "hover-text"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `my-6 gotham self-center items-center ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden ${
              isActive ? "text-red-600 font-semibold" : "hover-text"
            }`
          }
        >
          About Us
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `my-6 gotham self-center items-center ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden ${
              isActive ? "text-red-600 font-semibold" : "hover-text"
            }`
          }
        >
          Profile
        </NavLink>

        {/* Dropdown Desktop */}
        <div className="relative mx-6 my-6 gotham self-center lg:inline hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="gotham BEM-APPS self-center text items-center ease-in-out duration-300 cursor-pointer text-lg font-semibold"
          >
            BEM APPS
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded shadow-lg z-50">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                BEM OFFICIAL
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
            className="my-6 ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 ease-in-out duration-300 text-sm font-medium lg:inline hidden"
          >
            Admin
          </button>
        )}
      </div>

      {/* Hamburger Menu */}
      <div className="lg:hidden flex right-0 self-center">
        <p
          onClick={toggleNav}
          className="icons mr-4 right-0 hover-text text-base self-center font-medium cursor-pointer"
        >
          &#9776;
        </p>
      </div>

      {/* Sidebar (Mobile Menu) */}
      <div
        className={`fixed top-0 right-0 h-full w-44 bg-white text-black transform ${
          isMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <div className="right-0 flex flex-col items-center space-y-8 mt-10 min-h-screen bg-white">
          {/* Close Button */}
          <div className="right-0 close-btn cursor-pointer text-right p-4 text-lg">
            <CiMenuBurger
              onClick={toggleNav}
              className="icon mx-[4.5rem] mt-3 hover-text w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Sidebar Links */}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={toggleNav}
              className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
            >
              {item.name}
            </NavLink>
          ))}

          {/* Dropdown Mobile */}
          <div className="w-full items-center mt-4 self-center">
            <button
              onClick={() =>
                setIsDropdownMobileOpen(!isDropdownMobileOpen)
              }
              className="mb-2 mx-auto gotham hover-text ease-in-out duration-300 cursor-pointer w-full"
            >
              BEM Apps ▾
            </button>
            {isDropdownMobileOpen && (
              <div className="ml-16 mb-2 items-center self-center text-sm space-y-2">
                <a href="#" className="block hover:text-red-500">
                  BEM OFFICIAL
                </a>
                <a href="#" className="block hover:text-red-500">
                  ILKOM NEWS
                </a>
                <a href="#" className="block hover:text-red-500">
                  E-MAGAZINE
                </a>
              </div>
            )}
          </div>

          {/* Login / Logout in Sidebar */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                toggleNav();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogin();
                toggleNav();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
