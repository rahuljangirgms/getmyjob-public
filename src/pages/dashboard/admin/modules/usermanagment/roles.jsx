import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../components/Navbar";
import RolesTable from "../../components/RolesTable";

export default function Roles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [roles, setRoles] = useState([
    { id: 1, role_name: "Admin", role_description: "Full access to all settings", status: "Active" },
    { id: 2, role_name: "Recruiter", role_description: "Manages job listings", status: "Inactive" },
    { id: 3, role_name: "User", role_description: "Can apply for jobs", status: "Active" },
    { id: 4, role_name: "Moderator", role_description: "Handles reports", status: "Inactive" },
    { id: 5, role_name: "HR", role_description: "Manages hiring", status: "Active" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

      <div className="pt-24 p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Grid Layout - Sidebar (Filters) | Table */}
        <div className="grid grid-cols-12 gap-6">
          {/* Filter Section (Sidebar) */}
          <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filters</h3>

            {/* Search Input */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Search Roles</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2.5 pr-10 pl-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full border border-gray-300 dark:border-gray-600"
                  placeholder="Search by role name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-500 dark:text-gray-300" />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Role Table Section */}
          <div className="col-span-12 md:col-span-9 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md">
            <RolesTable roles={roles} searchTerm={searchTerm} statusFilter={statusFilter} setRoles={setRoles} />
          </div>
        </div>
      </div>
    </div>
  );
}
