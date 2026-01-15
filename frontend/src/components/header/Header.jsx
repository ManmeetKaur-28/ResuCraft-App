import React from "react";
import { Logo, LogoutBtn } from "../index";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  const options = [
    { name: "Home", link: "/", visible: true },
    { name: "Login", link: "/login", visible: !auth },
    { name: "Signup", link: "/signup", visible: !auth },
    { name: "Profile", link: "/profile", visible: auth },
  ];

  return (
    <header>
      <div className="bg-[#00072d] text-gray-100 shadow-md h-25 px-9 py-4 flex items-center justify-between w-full mx-auto text-lg">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="w-10 ">
            <Logo />
          </div>
          <h1 className="font-mono">ResuCraft</h1>
        </div>

        {/* Navigation Section */}
        <nav className="flex justify-center">
          <ul className="flex space-x-6 font-['Unna'] text-lg">
            {options.map((option) =>
              option.visible ? (
                <li
                  key={option.name}
                  className={`px-3 py-3 rounded-md transition-colors duration-300 cursor-pointer
                    ${
                      location.pathname === option.link
                        ? "text-blue-300 font-semibold"
                        : "hover:text-blue-300"
                    }`}
                >
                  <button
                    onClick={() => navigate(option.link)}
                    className="cursor-pointer"
                  >
                    {option.name}
                  </button>
                </li>
              ) : null
            )}
            {auth && (
              <li className="px-3">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
