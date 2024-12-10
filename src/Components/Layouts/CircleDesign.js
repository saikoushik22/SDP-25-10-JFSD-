import React from "react";

const CircleDesign = () => {
  return (
    <div
      className="absolute -z-[1] flex h-full w-full flex-col items-center justify-between gap-16 blur-2xl lg:flex-row"
      name="blur design"
    >
      <span className="inline-block h-[16rem] w-[10rem] animate-circle rounded-b-full bg-gradient-to-r from-purple-600 to-indigo-600 xl:rounded-r-full xl:rounded-bl-none"></span>
      <span className="inline-block h-[16rem] w-[16rem] animate-circle rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></span>
      <span className="inline-block h-[16rem] w-[16rem] animate-circle rounded-full bg-gradient-to-r from-pink-500 to-red-400"></span>
      <span className="inline-block h-[16rem] w-[16rem] animate-circle rounded-full bg-gradient-to-r from-green-500 to-yellow-400"></span>
      <span className="inline-block h-[16rem] w-[10rem] animate-circle rounded-t-full bg-gradient-to-r from-orange-500 to-red-500 xl:rounded-l-full xl:rounded-tr-none"></span>
    </div>
  );
};

export default CircleDesign;
