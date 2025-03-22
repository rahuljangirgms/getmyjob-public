import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocationFilter, setExperienceFilter, setJobTitleFilter, setStatusFilter } from "../../../../store/slices/admin/filterSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.filters.status || []);

  const toggleStatus = (status) => {
    dispatch(setStatusFilter(
      selectedStatus.includes(status)
        ? selectedStatus.filter((s) => s !== status)
        : [...selectedStatus, status]
    ));
  };

  const clearFilters = () => {
    dispatch(setLocationFilter(""));
    dispatch(setExperienceFilter(""));
    dispatch(setJobTitleFilter(""));
    dispatch(setStatusFilter([]));
  };

  return (
    <div className="space-y-4">
      {/* Status Filter with Custom Checkboxes */}
      <div className="space-y-2">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-200">Status</h3>
        <div className="flex justify-between items-center flex-wrap gap-3">
          {[
            { id: "active", label: "Active", color: "bg-green-600 text-white dark:bg-green-700 dark:text-green-200" },
            { id: "inactive", label: "Inactive", color: "bg-gray-600 text-white dark:bg-gray-700 dark:text-gray-200" },
            { id: "pending", label: "Pending", color: "bg-yellow-600 text-white dark:bg-yellow-700 dark:text-yellow-200" },
            { id: "suspended", label: "Suspended", color: "bg-red-600 text-white dark:bg-red-700 dark:text-red-200" }
        
          ].map(({ id, label, color }) => (
            <button
              key={id}
              onClick={() => toggleStatus(label)}
              className={`px-3 py-2 text-xs font-medium rounded-full transition-all border ${
                selectedStatus.includes(label) 
                  ? `${color} border-transparent` 
                  : "border-gray-400 text-gray-600 dark:text-gray-300 dark:border-gray-600"
              } hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Clear All Filters Button */}
        <button
          onClick={clearFilters}
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
