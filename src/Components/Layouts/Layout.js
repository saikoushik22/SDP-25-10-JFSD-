import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import UserContext from "../../Hooks/UserContext";

const Layout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation().pathname;

  return (
    <div className="relative flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Header />
      <main className="mt-[3.15rem] flex h-[calc(100vh-3.15rem)] bg-gradient-to-r from-gray-700 to-blue-800 p-4">
        {location === "/dash" ? "" : <Nav />}
        {user ? (
          <div className="w-full overflow-y-auto bg-gray-800 p-4 text-white dark:bg-gray-900">
            <Outlet />
          </div>
        ) : (
          <Navigate to="/" replace={true} />
        )}
      </main>
    </div>
  );
};

export default Layout;
