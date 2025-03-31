import React from "react";

const statusColors = {
  Active: "bg-green-100 text-green-800 border-green-400 dark:bg-gray-700 dark:text-green-400",
  Inactive: "bg-gray-100 text-gray-800 border-gray-500 dark:bg-gray-700 dark:text-gray-400",
  Enable: "bg-green-100 text-green-800 border-green-400 dark:bg-gray-700 dark:text-green-400",
  Disable: "bg-red-100 text-red-800 border-red-400 dark:bg-gray-700 dark:text-red-400",
  
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-400 dark:bg-gray-700 dark:text-yellow-300",
  "KYC Process": "bg-indigo-100 text-indigo-800 border-indigo-400 dark:bg-gray-700 dark:text-indigo-400",
  Suspend: "bg-red-100 text-red-800 border-red-400 dark:bg-gray-700 dark:text-red-400",

   // Ticket Status Colors
  Open: "bg-blue-100 text-blue-800 border-blue-400 dark:bg-gray-700 dark:text-blue-400",
  "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-400 dark:bg-gray-700 dark:text-yellow-300",
  Resolved: "bg-green-100 text-green-800 border-green-400 dark:bg-gray-700 dark:text-green-400",

  // Ticket Priority Colors
  High: "bg-red-100 text-red-800 border-red-400 dark:bg-gray-700 dark:text-red-400",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-400 dark:bg-gray-700 dark:text-yellow-300",
  Low: "bg-green-100 text-green-800 border-green-400 dark:bg-gray-700 dark:text-green-400",
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`text-sm font-medium px-1.5 py-0.5 rounded-full border ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
