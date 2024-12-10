import React from "react";
import CircleDesign from "./CircleDesign";
import { FaUniversity } from "react-icons/fa";
import { PiStudentThin, PiUserThin } from "react-icons/pi";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";

const RegisterLayout = () => {
  const location = useLocation().pathname;

  return (
    <main
      id="register"
      className="relative z-0 flex h-screen items-center justify-center bg-gradient-to-b from-cyan-600 to-teal-500 py-8 text-white"
    >
      <CircleDesign />
      <section className="my-8 flex h-fit w-fit animate-fadeInFast flex-col duration-200 justify-start gap-6 rounded-md bg-teal-700 p-4 text-white opacity-90 hover:opacity-100 focus:opacity-100 lg:flex-row xl:w-1/2">
        <div className="flex flex-col-reverse justify-between lg:flex-col">
          <h1 className="text-4xl font-semibold lg:text-5xl">
            {location === "/register/reg_staff" ? "Staff" : "Student"}
            <br />
            Registration
          </h1>
          <div className="m-2 flex flex-col-reverse gap-4 text-4xl md:text-5xl lg:flex-col">
            <div className="flex gap-4">
              <NavLink to={"./reg_staff"}>
                <PiUserThin className="rounded-full border-[1px] border-teal-200 p-[2px] font-light md:p-2" />
              </NavLink>
              <NavLink to={"./reg_student"}>
                <PiStudentThin className="rounded-full border-[1px] border-teal-200 p-[2px] font-light md:p-2" />
              </NavLink>
            </div>
            <Link
              className="flex items-center font-spectral text-xl font-semibold text-white"
              to="../"
            >
              <FaUniversity />
              <p className="decoration-violet-900 decoration-2 hover:underline">
                C
                <span className="inline-block h-3 w-3 rounded-full bg-teal-500 "></span>
                llege
              </p>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default RegisterLayout;
