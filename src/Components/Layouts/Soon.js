import React from "react";
import { BsConeStriped } from "react-icons/bs";

const Soon = () => {
  return (
    <section className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md p-6 text-justify shadow-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-600 transition-colors">
      <div className="flex items-center gap-3 text-2xl">
        <BsConeStriped className="text-5xl text-yellow-400" />
        <h1 className="font-semibold text-3xl">Under Construction</h1>
      </div>
      <p className="mt-4 text-lg">
        We are currently working on this page. Stay tuned for updates. 
        We appreciate your patience as we bring this feature to life.
      </p>
    </section>
  );
};

export default Soon;
