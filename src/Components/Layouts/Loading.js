import React from "react";
import { PiSpinnerGapBold } from "react-icons/pi";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center text-xl text-white">
      <PiSpinnerGapBold className="animate-spin text-teal-400" />
      Loading...
    </div>
  );
};

export default Loading;
