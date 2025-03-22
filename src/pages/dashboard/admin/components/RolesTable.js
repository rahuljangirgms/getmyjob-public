import React from "react";
import StatusBadge from "./statusbadge";

const RolesTable = ({ roles, searchTerm, statusFilter, setRoles }) => {
    // Filter roles based on search and status
    const filteredRoles = roles.filter(
        (role) =>
            (statusFilter === "All" || role.status === statusFilter) &&
            role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle status toggle
    const toggleStatus = (id) => {
        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === id ? { ...role, status: role.status === "Active" ? "Inactive" : "Active" } : role
            )
        );
    };

    // Handle role deletion
    const handleDelete = (id) => {
        setRoles(roles.filter((role) => role.id !== id));
    };

    return (
        <div>
            {/* Bulk Actions */}
            

                <div className="w-full flex justify-between items-center ">
                   
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Roles List</h2>
                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Add Role</button>

                   

                    
                </div>

                

          

            <div className="flex space-x-2 mb-3">
                        <button
                            onClick={() => setRoles((prev) => prev.map((r) => ({ ...r, status: "Active" })))}
                            className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-full text-sm"
                        >
                            Enable All
                        </button>
                        <button
                            onClick={() => setRoles((prev) => prev.map((r) => ({ ...r, status: "Inactive" })))}
                            className="text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-full text-sm"
                        >
                            Disable All
                        </button>
                    </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Role Name</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {filteredRoles.map((role) => (
                            <tr key={role.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-3">{role.id}</td>
                                <td className="p-3">{role.role_name}</td>
                                <td className="p-3">{role.role_description}</td>
                                <td className="p-3">
                                    <StatusBadge status={role.status} />
                                </td>
                                <td className="p-3 flex space-x-2">
                                    <button
                                        onClick={() => toggleStatus(role.id)}
                                        className={`px-3 py-1 text-sm ${role.status === "Active" ? "bg-red-600" : "bg-green-600"
                                            } text-white rounded hover:opacity-80`}
                                    >
                                        {role.status === "Active" ? "Disable" : "Enable"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(role.id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredRoles.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-3 text-center text-gray-500 dark:text-gray-400">
                                    No roles found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RolesTable;
