import React from "react";
import VectorImg from "../../assets/Vector0.svg"
import  DayIcon from "/src/assets/Day-icon.svg";
import PersonImg from "/src/assets/Person-image.png"

const Header = () => {
  return (
    <div className=" flex justify-between py-3 lg:px-10 px-2.5 items-center border border-[#E5E8EB]">
      <div className="flex items-center gap-1.5">
        <img src={VectorImg} alt="vector" />
        <h1 className="text-[18px] font-bold">TaskMate</h1>
      </div>
      <div className="space-x-2.5 flex ">
        <img src={DayIcon} alt="dayicon" />
        <img src={PersonImg} alt="" />
      </div>
    </div>
  );
};

export default Header;
