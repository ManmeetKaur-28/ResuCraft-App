import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#00072d] w-full py-6 text-center text-gray-200 shadow-inner">
      <p className="font-['Unna']  tracking-wide">
        &copy; {year}{" "}
        <span className="font-['Unna'] text-blue-100 font-bold">ResuCraft</span>{" "}
        : All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
