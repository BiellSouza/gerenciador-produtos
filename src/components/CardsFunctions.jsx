import React from "react";

const Card = ({ title, icon }) => {
  return (
    <div className="flex flex-col-reverse w-[465px] h-[200px] p-4 bg-secondary rounded-lg shadow-md max-w-sm cursor-pointer hover:scale-105 duration-300 ">
      <div className="text-4xl text-green-500 flex justify-center hover:scale-105 duration-300">
        <button>{icon}</button>
      </div>
      <div className="text-[45px] font-bold text-primary text-center w-full">
        {title}
      </div>
    </div>
  );
};

export default Card;
