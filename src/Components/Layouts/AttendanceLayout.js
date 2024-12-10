import { useContext, lazy, Suspense } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";

const AttendanceLayout = () => {
  const AttendanceStudent = lazy(() => import("../Queries/AttendanceStudent"));
  const Attendance = lazy(() => import("../Queries/Attendance"));
  const { user } = useContext(UserContext);

  return (
    <div className="bg-gradient-to-b from-teal-700 to-blue-800 min-h-screen p-4">
      {user.userType === "student" ? (
        <Suspense fallback={<Loading />}>
          <AttendanceStudent />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <Attendance />
        </Suspense>
      )}
    </div>
  );
};

export default AttendanceLayout;
