import React, { useState } from "react";
import { Table } from "flowbite-react";
import { ChevronUp, ChevronDown } from "lucide-react";

const rolesData = [
  { id: 1, role_name: "Admin", role_description: "Full access to all settings", status: "Active" },
  { id: 2, role_name: "Recruiter", role_description: "Can post and manage job listings", status: "Inactive" },
  { id: 3, role_name: "User", role_description: "Can apply for jobs", status: "Active" },
  { id: 4, role_name: "Moderator", role_description: "Can manage user reports", status: "Inactive" },
  { id: 5, role_name: "HR", role_description: "Handles employee hiring", status: "Active" },
];

const Roles = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter and Search
  const filteredRoles = rolesData.filter(
    (role) =>
      (role.role_name.toLowerCase().includes(search.toLowerCase()) ||
        role.role_description.toLowerCase().includes(search.toLowerCase()) ||
        role.status.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus === "All" || role.status === filterStatus)
  );

  // Sorting Function
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();
    return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedRoles.length / rowsPerPage);
  const paginatedRoles = sortedRoles.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Sorting Handler
  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Manage Roles</h1>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search roles..."
            className="w-full md:w-1/2 p-3 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 p-3 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Table Component */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <Table hoverable className="w-full">
            <Table.Head className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <Table.HeadCell onClick={() => handleSort("role_name")} className="px-4 py-3 cursor-pointer">
                Role Name {sortField === "role_name" && (sortOrder === "asc" ? <ChevronUp className="inline-block w-4 h-4" /> : <ChevronDown className="inline-block w-4 h-4" />)}
              </Table.HeadCell>
              <Table.HeadCell onClick={() => handleSort("role_description")} className="px-4 py-3 cursor-pointer">
                Description {sortField === "role_description" && (sortOrder === "asc" ? <ChevronUp className="inline-block w-4 h-4" /> : <ChevronDown className="inline-block w-4 h-4" />)}
              </Table.HeadCell>
              <Table.HeadCell onClick={() => handleSort("status")} className="px-4 py-3 cursor-pointer">
                Status {sortField === "status" && (sortOrder === "asc" ? <ChevronUp className="inline-block w-4 h-4" /> : <ChevronDown className="inline-block w-4 h-4" />)}
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y dark:divide-gray-700">
              {paginatedRoles.length > 0 ? (
                paginatedRoles.map((role) => (
                  <Table.Row key={role.id} className="border-t dark:border-gray-700">
                    <Table.Cell className="px-4 py-3">{role.role_name}</Table.Cell>
                    <Table.Cell className="px-4 py-3">{role.role_description}</Table.Cell>
                    <Table.Cell className={`px-4 py-3 font-semibold ${role.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                      {role.status}
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="3" className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                    No roles found
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← Previous
          </button>
          <span className="text-gray-800 dark:text-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roles;
