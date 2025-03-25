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
    <>
      {/* Navbar */}
      <Navbar />

     
          

          {/* Role Table Section */}
      <div className="pt-24  min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <RolesTable roles={roles} searchTerm={searchTerm} statusFilter={statusFilter} setRoles={setRoles} />
          </div>
      
    </>
  );
}
