import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSideBar/LeftSide";
import RightSide from "../RightSideBar/RightSide";
import CardSection from "../Main/CardSection";


const Home = () => {
  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>
      <div className=" flex bg-gray-100">
        <div className="flex-auto w-[20%] fixed top-12">
          <LeftSide></LeftSide>
        </div>
        <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl">
          <CardSection></CardSection>
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  );
};

export default Home;
