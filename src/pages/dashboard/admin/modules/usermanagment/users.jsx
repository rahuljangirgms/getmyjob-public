import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { MaterialReactTable } from "material-react-table";
import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, TextInput, Label } from "flowbite-react";
import StatusBadge from "../../components/statusbadge";


import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
} from "../../../../../services/admin/userService";

import {
    getRoles,
} from "../../../../../services/admin/roleService";

// If you need a date formatter
const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString();
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // For roles dropdown
    const [allRoles, setAllRoles] = useState([]);

    // Row selection for bulk actions
    const [rowSelection, setRowSelection] = useState({});
    const rowCountSelected = Object.keys(rowSelection).length;
    const isSelectionEmpty = rowCountSelected === 0;

    // Single user for modals
    const [selectedUser, setSelectedUser] = useState(null);

    // Add user modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role_id: "",
    });

    // Edit user modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editUserData, setEditUserData] = useState({
        id: null,
        name: "",
        email: "",
        mobile: "",
        password: "",
        role_id: "",
    });

    // View user modal (if you want a read-only view)
    // const [showViewModal, setShowViewModal] = useState(false);
    // const [viewUserData, setViewUserData] = useState({});

    // Delete user modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Bulk delete modal
    const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

    // Track which row's dropdown is open
    const [actionDropdownOpen, setActionDropdownOpen] = useState(null);

    // Dark mode detection for MUI
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
    }, []);

    // Create an MUI theme that switches between light/dark
    const muiTheme = createTheme({
        palette: {
            mode: isDarkMode ? "dark" : "light",
            primary: { main: "#1976D2" },
            secondary: { main: "#9C27B0" },
        },
    });

    // ------------------------------
    // Fetch Users and Roles
    // ------------------------------
    // Option 1: Convert when fetching data
    const fetchUsers = async () => {
        setLoading(true);
        const res = await getUsers();
        if (res.status && Array.isArray(res.data)) {
            // Convert "active" to "Enable" and "inactive" to "Disable"
            const enriched = res.data.map((user) => ({
                ...user,
                status: user.status.toLowerCase() === "active" ? "Enable" : "Disable",
            }));
            setUsers(enriched);
        } else {
            toast.error(res.message || "Failed to fetch users");
            setUsers([]);
        }
        setLoading(false);
    };

    const fetchRoles = async () => {
        const res = await getRoles();
        if (res.status && Array.isArray(res.data)) {
            setAllRoles(res.data);
        } else {
            toast.error(res.message || "Failed to fetch roles");
            setAllRoles([]);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    // ------------------------------
    // Table columns
    // ------------------------------
    const columns = [
        { accessorKey: "id", header: "ID", size: 50 },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Role" },
        { accessorKey: "mobile", header: "Mobile" },
        {
            accessorKey: "status",
            header: "Status", // "Enable"/"Disable"
            Cell: ({ cell }) => <StatusBadge status={cell.getValue()} />,
        },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ cell }) => formatDate(cell.getValue()),
        },
        {
            header: "Actions",
            Cell: ({ row }) => {
                const user = row.original;
                const isOpen = actionDropdownOpen === user.id;

                const toggleDropdown = (e) => {
                    e.stopPropagation(); // Don’t select the row
                    setActionDropdownOpen(isOpen ? null : user.id);
                };

                // handle "View"
                const onView = () => {
                    setViewUserData(user);
                    setShowViewModal(true);
                    setActionDropdownOpen(null);
                };

                // handle "Edit"
                const onEdit = () => {
                    openEditModal(user);
                    setActionDropdownOpen(null);
                };

                // handle "Delete"
                const onDelete = () => {
                    openDeleteModal(user);
                    setActionDropdownOpen(null);
                };

                return (
                    
                        <div className="flex gap-2">
                            {/* View Button */}
                            <button
                                onClick={() => {
                                    setViewUserData(user);
                                    setShowViewModal(true);
                                }}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </button>

                            {/* Edit Button */}
                            <button
                                onClick={() => {
                                    setEditUserData(user);
                                    setShowEditModal(true);
                                }}
                                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                                    />
                                </svg>
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => {
                                    setSelectedUser(user);
                                    setShowDeleteModal(true);
                                }}
                                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                                    />
                                </svg>
                            </button>
                        </div>

                );
            },
        },
    ];

    // Close dropdown if user clicks outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (actionDropdownOpen !== null) {
                setActionDropdownOpen(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [actionDropdownOpen]);

    // ------------------------------
    // Add User
    // ------------------------------
    const handleAddUser = async () => {
        if (!newUser.name.trim()) {
            toast.error("Name is required");
            return;
        }
        if (!newUser.email.trim()) {
            toast.error("Email is required");
            return;
        }
        if (!newUser.role_id) {
            toast.error("Please select a role");
            return;
        }

        const res = await addUser(newUser);
        if (res.status) {
            toast.success("User added successfully");
            setShowAddModal(false);
            setNewUser({
                name: "",
                email: "",
                mobile: "",
                password: "",
                role_id: "",
            });
            fetchUsers();
        } else {
            toast.error(res.message || "Failed to add user");
        }
    };

    // ------------------------------
    // Edit / Update
    // ------------------------------
    const openEditModal = (user) => {
        setEditUserData(user);
        setShowEditModal(true);
    };

    const handleUpdateUser = async () => {
        if (!editUserData.id) return;
        if (!editUserData.role_id) {
            toast.error("Please select a role");
            return;
        }
        const res = await updateUser(editUserData);
        if (res.status) {
            toast.success("User updated successfully");
            setShowEditModal(false);
            setEditUserData({
                id: null,
                name: "",
                email: "",
                mobile: "",
                password: "",
                role_id: "",
            });
            fetchUsers();
        } else {
            toast.error(res.message || "Failed to update user");
        }
    };

    // ------------------------------
    // View
    // ------------------------------
    const [viewUserData, setViewUserData] = useState({});
    const [showViewModal, setShowViewModal] = useState(false);

    const closeViewModal = () => {
        setShowViewModal(false);
        setViewUserData({});
    };

    // ------------------------------
    // Single delete
    // ------------------------------
    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;
        const res = await deleteUser(selectedUser.id);
        if (res.status) {
            toast.success("User deleted successfully");
            setShowDeleteModal(false);
            setSelectedUser(null);
            fetchUsers();
        } else {
            toast.error(res.message || "Failed to delete user");
        }
    };

    // ------------------------------
    // Bulk delete
    // ------------------------------
    const handleBulkDelete = () => {
        if (isSelectionEmpty) return;
        setShowBulkDeleteModal(true);
    };

    const confirmBulkDelete = async () => {
        const selectedIds = Object.keys(rowSelection).map((key) => Number(key));
        for (const id of selectedIds) {
            await deleteUser(id);
        }
        toast.success("Selected users deleted");
        fetchUsers();
        setRowSelection({});
        setShowBulkDeleteModal(false);
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Navbar />
            <div className="p-4 pt-24 min-h-screen text-gray-900 dark:text-gray-100 dark:bg-gray-900">
                <ToastContainer position="top-right" />

                {/* Header */}
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Users Management</h1>
                    <button
                        onClick={() => setShowAddModal(true)}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Add User
                    </button>
                </div>

                {/* Table */}
                <div className="rounded border border-gray-200 dark:border-gray-700">
                    <MaterialReactTable
                        columns={columns}
                        data={users}
                        getRowId={(row) => String(row.id)}
                        enableRowSelection
                        enablePagination
                        enableColumnFilters
                        enableGlobalFilter
                        enableDensityToggle={false}
                        enableFullScreenToggle={false}
                        enableHiding={false}
                        localization={MRT_Localization_EN}
                        initialState={{ pagination: { pageSize: 5 } }}
                        muiTablePaperProps={{
                            // ensure the dropdown can appear above the table
                            sx: { overflow: "visible !important" },
                            className:
                                "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                        }}
                        muiTableContainerProps={{
                            sx: { maxHeight: "500px", overflow: "visible !important" },
                            className:
                                "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                        }}
                        muiTableBodyCellProps={{
                            className: "border-gray-200 dark:border-gray-700",
                        }}
                        muiTableHeadCellProps={{
                            className:
                                "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700",
                        }}
                        state={{ isLoading: loading, rowSelection }}
                        onRowSelectionChange={setRowSelection}
                        renderTopToolbarCustomActions={() => (
                            <Box sx={{ display: "flex", gap: "1rem" }}>
                                {/* Bulk Delete */}
                                <button
                                    onClick={handleBulkDelete}
                                    className={`${isSelectionEmpty
                                            ? "opacity-50 cursor-not-allowed"
                                            : "opacity-100 cursor-pointer hover:text-white hover:bg-red-800"
                                        } text-red-700 border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5`}
                                >
                                    Delete Selected
                                </button>
                            </Box>
                        )}
                    />
                </div>

                {/* Add User Modal */}
                <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
                    <Modal.Header>Add New User</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="userName" value="Name" />
                                <TextInput
                                    id="userName"
                                    placeholder="Enter user name"
                                    value={newUser.name}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="userEmail" value="Email" />
                                <TextInput
                                    id="userEmail"
                                    placeholder="Enter email"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, email: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="userMobile" value="Mobile" />
                                <TextInput
                                    id="userMobile"
                                    placeholder="Enter mobile"
                                    value={newUser.mobile}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, mobile: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="userPassword" value="Password" />
                                <TextInput
                                    id="userPassword"
                                    type="password"
                                    placeholder="Enter password"
                                    value={newUser.password}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, password: e.target.value })
                                    }
                                />
                            </div>
                            {/* Role Select */}
                            <div>
                                <Label htmlFor="userRoleId" value="Role" />
                                <select
                                    id="userRoleId"
                                    className="w-full p-2 mt-1 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600"
                                    value={newUser.role_id}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, role_id: e.target.value })
                                    }
                                >
                                    <option value="">--Select Role--</option>
                                    {allRoles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleAddUser}
                            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Add User
                        </button>
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="text-gray-900 dark:text-gray-400 hover:text-white dark:hover:text-white border border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>

                {/* Edit User Modal */}
                <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                    <Modal.Header>Edit User</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="editUserName" value="Name" />
                                <TextInput
                                    id="editUserName"
                                    placeholder="Enter user name"
                                    value={editUserData.name}
                                    onChange={(e) =>
                                        setEditUserData({ ...editUserData, name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="editUserEmail" value="Email" />
                                <TextInput
                                    id="editUserEmail"
                                    placeholder="Enter email"
                                    value={editUserData.email}
                                    onChange={(e) =>
                                        setEditUserData({ ...editUserData, email: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="editUserMobile" value="Mobile" />
                                <TextInput
                                    id="editUserMobile"
                                    placeholder="Enter mobile"
                                    value={editUserData.mobile}
                                    onChange={(e) =>
                                        setEditUserData({ ...editUserData, mobile: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="editUserPassword" value="Password" />
                                <TextInput
                                    id="editUserPassword"
                                    type="password"
                                    placeholder="Enter password"
                                    value={editUserData.password}
                                    onChange={(e) =>
                                        setEditUserData({
                                            ...editUserData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {/* Role select */}
                            <div>
                                <Label htmlFor="editUserRoleId" value="Role" />
                                <select
                                    id="editUserRoleId"
                                    className="w-full p-2 mt-1 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600"
                                    value={editUserData.role_id}
                                    onChange={(e) =>
                                        setEditUserData({
                                            ...editUserData,
                                            role_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">--Select Role--</option>
                                    {allRoles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleUpdateUser}
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Update User
                        </button>
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="text-gray-900 dark:text-gray-400 hover:text-white dark:hover:text-white border border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>

                {/* View User Modal */}
                <Modal show={showViewModal} onClose={() => setShowViewModal(false)}>
                    <Modal.Header>View User</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-2 text-sm">
                            <p>
                                <strong>ID:</strong> {viewUserData.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {viewUserData.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {viewUserData.email}
                            </p>
                            <p>
                                <strong>Mobile:</strong> {viewUserData.mobile}
                            </p>
                            <p>
                                <strong>Role:</strong> {viewUserData.role}
                            </p>
                            <p>
                                <strong>Status:</strong> <StatusBadge status={viewUserData.status} />
                            </p>

                            <p>
                                <strong>Created:</strong> {formatDate(viewUserData.created_at)}
                            </p>
                            {/* Add more fields if needed */}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={() => setShowViewModal(false)}
                            className="text-gray-900 dark:text-gray-400 hover:text-white dark:hover:text-white border border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>

                {/* Single Delete Modal */}
                <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                    <Modal.Header>Delete User</Modal.Header>
                    <Modal.Body>
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete user "{selectedUser?.name}"? This action
                            cannot be undone.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={confirmDelete}
                            className="text-red-700 dark:text-red-500 hover:text-white dark:hover:text-white border border-red-700 dark:border-red-500 hover:bg-red-800 dark:hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="text-gray-900 dark:text-gray-400 hover:text-white dark:hover:text-white border border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>

                {/* Bulk Delete Modal */}
                <Modal
                    show={showBulkDeleteModal}
                    onClose={() => setShowBulkDeleteModal(false)}
                >
                    <Modal.Header>Delete Selected Users</Modal.Header>
                    <Modal.Body>
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete the selected users? This action cannot be
                            undone.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={confirmBulkDelete}
                            className="text-red-700 dark:text-red-500 hover:text-white dark:hover:text-white border border-red-700 dark:border-red-500 hover:bg-red-800 dark:hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setShowBulkDeleteModal(false)}
                            className="text-gray-900 dark:text-gray-400 hover:text-white dark:hover:text-white border border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </ThemeProvider>
    );
};

export default Users;
