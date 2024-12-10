import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";

const InternalLayout = () => {
  const InternalResultForm = React.lazy(() =>
    import("../Forms/InternalResultForm")
  );
  const InternalStudent = React.lazy(() =>
    import("../Queries/InternalStudent")
  );
  const { user } = React.useContext(UserContext);
  
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-3xl font-bold mb-5 text-center">Internal Management</h2>
        
        {user.userType === "student" ? (
          <React.Suspense fallback={<Loading />}>
            <InternalStudent />
          </React.Suspense>
        ) : (
          <React.Suspense fallback={<Loading />}>
            <InternalResultForm />
          </React.Suspense>
        )}
      </div>
    </div>
  );
};

export default InternalLayout;
