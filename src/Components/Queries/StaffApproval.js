import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import { Navigate } from "react-router-dom";
import axios from "../../config/api/axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { TableHeader } from "../Table";

const StaffApproval = () => {
  const { user } = useContext(UserContext);
  const [newStaffs, setNewStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewStaffs = async () => {
      try {
        const response = await axios.get("staff/approve/" + user.department);
        setNewStaffs(response.data);
        setFilteredStaffs(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNewStaffs();
  }, [user]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = newStaffs.filter((staff) =>
      staff.email.toLowerCase().includes(term)
    );
    setFilteredStaffs(filtered);
  };

  const handleApprove = async (e) => {
    const index = e.currentTarget.id;
    const staff = filteredStaffs[index];
    staff.role = "teacher";
    try {
      const response = await axios.patch("/staff/" + staff._id, {
        id: staff._id,
        role: staff.role,
      });
      newStaffs.splice(newStaffs.indexOf(staff), 1);
      toast.success(response.data.message);
      setError("");
      setFilteredStaffs((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (e) => {
    const index = e.currentTarget.id;
    const staff = filteredStaffs[index]._id;
    try {
      const response = await axios.delete("/staff/" + staff);
      newStaffs.splice(newStaffs.findIndex((s) => s._id === staff), 1);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setFilteredStaffs((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="staff__approval">
          <div className="flex justify-between items-center mb-4">
            <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
              Approve Staff
            </h2>
            <input
              type="text"
              placeholder="Search by email"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded p-2 text-lg"
            />
          </div>
          <h3 className="text-2xl font-semibold">
            Department: All Branches
          </h3>
          <form>
            {filteredStaffs.length ? (
              <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                <table className="w-full">
                  <TableHeader
                    Headers={[
                      "Name",
                      "Email",
                      "Username",
                      "Approve",
                      "Reject",
                    ]}
                    AdditionalRowClasses={"text-left"}
                    AdditionalHeaderClasses={"last:text-center secondLast"}
                  />
                  <tbody>
                    {filteredStaffs.map((staff, index) => (
                      <tr
                        key={index}
                        className={
                          searchTerm && staff.email.toLowerCase().includes(searchTerm)
                            ? "bg-yellow-200"
                            : ""
                        }
                      >
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.name}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.email}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.username}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-0">
                          <button
                            type="button"
                            id={index}
                            onClick={(e) => handleApprove(e)}
                            className="m-0 flex h-auto w-full justify-center bg-transparent py-3 text-xl duration-200 text-violet-400 hover:text-white hover:bg-violet-900"
                          >
                            <FaPlus />
                          </button>
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-0">
                          <button
                            className="m-0 flex h-auto w-full justify-center bg-transparent py-3 text-xl duration-200 text-violet-400 hover:text-white hover:bg-red-600"
                            type="button"
                            id={index}
                            onClick={(e) => handleDelete(e)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
            {!filteredStaffs.length && !error && <Loading />}
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default StaffApproval;
