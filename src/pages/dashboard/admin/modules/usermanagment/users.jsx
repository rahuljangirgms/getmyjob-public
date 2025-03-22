import { useState } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import Navbar from "../../components/Navbar";
import UsersTable from "../../components/userstable"; // Assuming you will create a UsersTable component like RecruitersTable

export default function Users() {
    const [searchTerm, setSearchTerm] = useState("");

    const users = [
        { id: 1, name: "John Doe", username: "johndoe", email: "johndoe@example.com", phone: "123-456-7890", role: "User", lastLogin: "2025-03-06 14:00", completion: 85, status: "Active" },
    { id: 2, name: "Jane Smith", username: "janesmith", email: "janesmith@example.com", phone: "987-654-3210", role: "Admin", lastLogin: "2025-03-05 16:30", completion: 100, status: "Active" },
    { id: 3, name: "Mike Johnson", username: "mikejohnson", email: "mike@example.com", phone: "555-123-4567", role: "Moderator", lastLogin: "2025-02-20 11:00", completion: 70, status: "Inactive" },
    
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Navbar */}
            <Navbar />

            <div className="pt-24 p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Grid Layout - 3 Columns (Filters) | 9 Columns (Table) */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Filter Section (3 Columns) */}
                    <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-3xl">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filters</h3>

                        {/* Search Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Search Users</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full p-2.5 pr-10 pl-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full border border-gray-300 dark:border-gray-600"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-500 dark:text-gray-300" />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Status</label>
                            <select className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600">
                                <option>All</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        {/* Role Filter */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Role</label>
                            <select className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600">
                                <option>All</option>
                                <option>Admin</option>
                                <option>User</option>
                                <option>Manager</option>
                            </select>
                        </div>
                    </div>

                    {/* Data Table Section (9 Columns) */}
                    <div className="col-span-12 md:col-span-9 bg-white dark:bg-gray-800 p-6 rounded-3xl">
                        <UsersTable users={users} />
                    </div>
                </div>
            </div>
        </div>
    );
}
