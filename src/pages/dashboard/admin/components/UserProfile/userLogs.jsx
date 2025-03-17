import React from "react";

const userLogs = [
  {
    id: 1,
    date: "Mar 20, 2024 10:45 AM",
    action: "Login",
    details: "User logged in from Chrome on Windows 10",
    ip: "192.168.0.1",
  },
  {
    id: 2,
    date: "Mar 20, 2024 12:10 PM",
    action: "Profile Update",
    details: "Updated profile picture and bio",
    ip: "192.168.0.1",
  },
  {
    id: 3,
    date: "Mar 21, 2024 09:00 AM",
    action: "Logout",
    details: "User logged out",
    ip: "192.168.0.2",
  },
  {
    id: 4,
    date: "Mar 22, 2024 02:25 PM",
    action: "Password Change",
    details: "User changed account password",
    ip: "192.168.0.2",
  },
  {
    id: 5,
    date: "Mar 23, 2024 08:15 AM",
    action: "Login",
    details: "User logged in from Safari on iOS",
    ip: "192.168.0.3",
  },
];

const UserLog = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        User Log
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <th className="p-3">ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
              <th className="p-3">Details</th>
              <th className="p-3">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {userLogs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <td className="p-3">{log.id}</td>
                <td className="p-3">{log.date}</td>
                <td className="p-3">{log.action}</td>
                <td className="p-3">{log.details}</td>
                <td className="p-3">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLog;
