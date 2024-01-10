import React from "react";
import UserLinks from "./UserLinks";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 w-full px-30 py-2">
      <div className="flex-grow text-center ml-60">
        <Link to="/">
          <div className="text-4xl font-extrabold text-gray-900 light:text-white font-roboto">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-400 from-red-600">
              Pedro Social
            </span>
          </div>
        </Link>
      </div>
      <div className="mr-7">
        <UserLinks></UserLinks>
      </div>
    </div>
  );
};

export default Navbar;
