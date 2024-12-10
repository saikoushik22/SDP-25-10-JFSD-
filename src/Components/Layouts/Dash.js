import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiBooks, PiUser, PiStudent } from "react-icons/pi";
import { MdOutlineUploadFile } from "react-icons/md";
import { useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";

const Dash = () => {
  const { user, setPaperList } = useContext(UserContext);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`paper/${user.userType}/${user._id}`);
        setPaperList(response.data);
      } catch (error) {
        console.error("Failed to fetch papers:", error);
      }
    };
    fetchPapers();
  }, [setPaperList, user]);

  const menuItems = [
    {
      link: "./paper",
      icon: <GiBookshelf className="text-[2.5rem] lg:text-[4rem]" />,
      title: "Courses",
      description: "View Courses and Details",
    },
    {
      link: "./attendance",
      icon: <IoCalendarOutline className="text-[2.5rem] lg:text-[4rem]" />,
      title: "Attendance",
      description: "View Attendance",
    },
    {
      link: "./internal",
      icon: <HiOutlineDocumentReport className="text-[2.5rem] lg:text-[4rem]" />,
      title: "Internal Mark",
      description: "View Internal Marks",
    },
    {
      link: "./time_schedule",
      icon: <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem]" />,
      title: "Time Schedule",
      description: "View or Edit Time Schedule",
    },
    ...(user.role === "HOD"
      ? [
          {
            link: "./add_paper",
            icon: <BiBookAdd className="text-[2.5rem] lg:text-[4rem]" />,
            title: "Add Course",
            description: "Add a New Course",
          },
          {
            link: "./approve_staff",
            icon: <RiUserAddLine className="text-[2.5rem] lg:text-[4rem]" />,
            title: "Approve Staff",
            description: "Approve registered staff(s)",
          },
        ]
      : []),
    ...(user.role === "student"
      ? [
          {
            link: "./join_paper",
            icon: <PiBooks className="text-[2.5rem] lg:text-[4rem]" />,
            title: "Manage Course",
            description: "Join or Leave Course",
          },
          {
            link: "./student_assignments", // Link to Student Assignments page
            icon: <MdOutlineUploadFile className="text-[2.5rem] lg:text-[4rem]" />,
            title: "Student Assignments",
            description: "View and submit assignments",
          },
        ]
      : []),
    ...(user.role === "faculty"
      ? [
          {
            link: "./faculty_assignments", // Link to Faculty Assignments page
            icon: <MdOutlineUploadFile className="text-[2.5rem] lg:text-[4rem]" />,
            title: "Create Assignment",
            description: "Create and manage assignments",
          },
          {
            link: "./faculty_uploaded_assignments", // Link to view uploaded assignments by students
            icon: <MdOutlineUploadFile className="text-[2.5rem] lg:text-[4rem]" />,
            title: "View Student Submissions",
            description: "View student submissions and grade them",
          },
        ]
      : []),
    {
      link: "./profile",
      icon: user.role === "student" ? (
        <PiStudent className="text-[2.5rem] lg:text-[4rem]" />
      ) : (
        <PiUser className="text-[2.5rem] lg:text-[4rem]" />
      ),
      title: "Profile",
      description: "View Profile",
    },
  ];

  return (
    <main className="self-center">
      <h2 className="m-6 font-spectral mx-auto text-center text-6xl font-bold text-teal-500">
        Assignment Submission and Grading System
      </h2>
      <div className="grid grid-cols-1 place-content-center gap-3 px-1 py-4 lg:grid-cols-2 lg:gap-4 lg:px-8 xl:grid-cols-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex gap-2 rounded-lg bg-indigo-500 p-6 text-base hover:bg-indigo-600/90 dark:bg-indigo-900/80 dark:hover:bg-indigo-800 dark:hover:text-yellow-300 duration-200 lg:text-lg"
          >
            {item.icon}
            <div className="font-semibold text-white">
              {item.title}
              <p className="text-sm font-normal lg:text-base text-gray-300">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Dash;
