import React from "react";
import nature from "../../assets/images/nature.jpg";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";

const LeftSide = () => {
  return (
    <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
      <div className="flex flex-col items-center relative">
        <img className="h-28 w-full rounded-r-xl" src={nature} alt="nature" />

        <div className="absolute -bottom-4 flex justify-center items-center">
          <Tooltip content="Profile" placement="top">
            <Avatar className="h-10 w-10" src={avatar} alt="avatar"></Avatar>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
