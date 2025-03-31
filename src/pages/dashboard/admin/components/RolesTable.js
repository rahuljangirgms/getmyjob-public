import React, { useEffect, useState } from "react";
import StatusBadge from "./statusbadge";
import { getRoles, deleteRole, updateRole, createRole } from "../../../../services/admin/roleService";
import { toast } from "react-toastify";
import { Modal } from "flowbite-react";
import { Trash2, ShieldCheck, ShieldX } from "lucide-react";

const RolesTable = ({ roles, searchTerm, statusFilter, setRoles }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newRoleName, setNewRoleName] = useState("");
    const [newRoleDesc, setNewRoleDesc] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ open: false, roleId: null, type: null });



    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            setLoading(true);
            const res = await getRoles();
            if (res.status) {
                setRoles(res.data);
            } else {
                toast.error(res.message || "Failed to load roles");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const confirmAction = async () => {
        const { roleId, type } = confirmModal;
        try {
            if (type === "delete") {
                const res = await deleteRole(roleId);
                if (res.status) {
                    setRoles((prev) => prev.filter((r) => r.id !== roleId));
                    toast.success("Role deleted");
                } else toast.error("Failed to delete role");
            } else if (type === "toggle") {
                const role = roles.find((r) => r.id === roleId);
                const newStatus = role.status === "Active" ? "Inactive" : "Active";
                const res = await updateRole(roleId, { status: newStatus });
                if (res.status) {
                    setRoles((prev) =>
                        prev.map((r) => (r.id === roleId ? { ...r, status: newStatus } : r))
                    );
                    toast.success("Status updated");
                } else toast.error("Failed to update status");
            }
        } catch {
            toast.error("Action failed");
        } finally {
            setConfirmModal({ open: false, roleId: null, type: null });
        }
    };

    const filteredRoles = (roles || []).filter((role) => {
        const matchesSearch = role.role_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || role.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (


        <div className=" bg-gray-50  dark:bg-gray-900">
            <div className="grid grid-cols-12 gap-6">
                {/* Filters Sidebar */}
                <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 p-6  ">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filters</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Search Roles</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full p-2.5 pr-10 pl-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full border border-gray-300 dark:border-gray-600"
                                placeholder="Search by role name..."
                                value={searchTerm}
                                onChange={(e) => setRoles((prev) => [...prev])} // this will be updated outside this component
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Status</label>
                        <select
                            className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600"
                            value={statusFilter}
                            onChange={(e) => setRoles((prev) => [...prev])} // this too should come from parent
                        >
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Main Table */}
                <div className="col-span-12 md:col-span-9">
      
            <div className="w-full flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Roles List</h2>
                <button
                    onClick={() => setShowModal(true)}
                    type="button"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Add Role
                </button>
            </div>

            {loading ? (
                <div className="space-y-3 animate-pulse">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                                    <thead className="bg-gray-200 dark:bg-gray-700">
                                        <tr>
                                            <th className="p-3 text-left text-gray-800 dark:text-gray-200">ID</th>
                                            <th className="p-3 text-left text-gray-800 dark:text-gray-200">Role Name</th>
                                            <th className="p-3 text-left text-gray-800 dark:text-gray-200">Description</th>
                                            <th className="p-3 text-left text-gray-800 dark:text-gray-200">Status</th>
                                            <th className="p-3 text-left text-gray-800 dark:text-gray-200">Actions</th>
                                        </tr>
                                    </thead>
                        <tbody className="divide-y dark:divide-gray-700">
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="p-3 text-gray-800 dark:text-gray-200">{role.id}</td>
                                    <td className="p-3 text-gray-800 dark:text-gray-200">{role.role_name}</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">{role.role_description}</td>
                                    <td className="p-3">
                                        <StatusBadge status={role.status} />
                                    </td>
                                    <td className="p-3 flex space-x-2">
                                        <button
                                            onClick={() =>
                                                setConfirmModal({ open: true, roleId: role.id, type: "toggle" })
                                            }
                                            type="button"
                                            className={`inline-flex items-center gap-2 font-medium rounded-3xl text-sm px-3 text-center border focus:outline-none  focus:ring-none
                         ${role.status === "Active"
                                                    ? "text-red-700 hover:text-white border-red-700 hover:bg-red-800 focus:ring-red-300"
                                                    : "text-green-700 hover:text-white border-green-700 hover:bg-green-800 focus:ring-green-300"
                                                }`}
                                        >
                                            {role.status === "Active" ? <ShieldX size={16} /> : <ShieldCheck size={16} />}
                                            {role.status === "Active" ? "Disable" : "Enable"}
                                        </button>


                                        <button
                                            onClick={() => setConfirmModal({ open: true, roleId: role.id, type: "delete" })}
                                            type="button"
                                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-none focus:outline-none focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Header className="text-gray-800 dark:text-gray-200">Add New Role</Modal.Header>
                        <Modal.Body className="bg-white dark:bg-gray-800">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role Name</label>
                                    <input
                                        type="text"
                                        value={newRoleName}
                                        onChange={(e) => setNewRoleName(e.target.value)}
                                        placeholder="Enter role name"
                                        className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                    <textarea
                                        value={newRoleDesc}
                                        onChange={(e) => setNewRoleDesc(e.target.value)}
                                        placeholder="Enter description"
                                        className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="bg-white dark:bg-gray-800">
                            <button
                                onClick={async () => {
                                    if (!newRoleName.trim()) {
                                        toast.error("Role name is required");
                                        return;
                                    }

                                    setIsSubmitting(true);
                                    try {
                                        const res = await createRole({ role_name: newRoleName, role_description: newRoleDesc });
                                        if (res.status) {
                                            toast.success(res.message || "Role created");
                                            setRoles((prev) => [...prev, res.data]);
                                            setShowModal(false);
                                            setNewRoleName("");
                                            setNewRoleDesc("");
                                        } else {
                                            toast.error(res.message || "Failed to add role");
                                        }
                                    } catch (err) {
                                        toast.error("Error adding role");
                                    } finally {
                                        setIsSubmitting(false);
                                    }
                                }}
                                disabled={isSubmitting}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting ? "Adding..." : "Add Role"}
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-600 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </Modal.Footer>
                    </Modal>


            {confirmModal.open && (
                <div id="popup-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-5">
                        <div className="text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to {confirmModal.type === "delete" ? "delete this role" : "change status"}?
                            </h3>
                            <button
                                onClick={confirmAction}
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={() => setConfirmModal({ open: false, roleId: null, type: null })}
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
        </div>
        </div>
    );
};

export default RolesTable;