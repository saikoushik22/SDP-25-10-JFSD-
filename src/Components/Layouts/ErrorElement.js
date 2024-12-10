import { useContext } from "react";
import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import UserContext from "../../Hooks/UserContext";

const ErrorElement = () => {
  const { user } = useContext(UserContext);
  const error = useRouteError();

  return (
    <div className="relative flex flex-col bg-gradient-to-r from-pink-500 to-indigo-600">
      {user && <Header />}
      <main className="mt-[3.15rem] flex h-[calc(100vh-3.15rem)] bg-gradient-to-b from-blue-700 to-purple-800 dark:bg-gradient-to-b dark:from-blue-800 dark:to-indigo-800">
        {user && <Nav />}
        <div className="outlet-border z-[1] mt-1 w-full overflow-y-auto bg-white/80 p-6 text-gray-900 dark:bg-gradient-to-t dark:from-indigo-800 dark:to-blue-800 dark:text-white lg:p-12">
          <h2 className="text-6xl font-extrabold text-red-600 dark:text-yellow-400">
            Oops!
          </h2>
          <p className="text-xl mt-4">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="mt-2 text-lg italic text-gray-700 dark:text-gray-300">
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ErrorElement;
