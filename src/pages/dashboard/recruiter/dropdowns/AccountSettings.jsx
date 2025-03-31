import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordRequest } from "../../../../store/slices/recruiter/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // Local state for old/new password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      toast.error("Please fill in all fields.", { position: "top-right" });
      return;
    }

    try {
      // Dispatch the async thunk and unwrap the result
      const response = await dispatch(
        changePasswordRequest({
          email: user?.email,
          old_password: oldPassword,
          new_password: newPassword,
        })
      ).unwrap();
      toast.success(response.message || "Password changed successfully", {
        position: "top-right",
      });
      // Optionally clear the password fields after success
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to change password", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <form onSubmit={handleSubmit}>
        {/* 1) Email (read-only) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-gray-100 text-gray-700"
          />
        </div>

        {/* 2) Old Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Old Password:
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 3) New Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            New Password:
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded 
                      transition-colors duration-200 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
        >
          {loading ? "Please wait..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
