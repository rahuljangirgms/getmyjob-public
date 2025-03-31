import React, { useEffect, useState } from "react";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../../../../services/admin/roleService";
import { Modal, TextInput, Label } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StatusBadge from "../../components/statusbadge";
import Navbar from "../../components/Navbar";
import { MaterialReactTable } from "material-react-table";
import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { MRT_Localization_EN } from "material-react-table/locales/en";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowSelection, setRowSelection] = useState({});

  // Single-role modals
  const [showModal, setShowModal] = useState(false); // For single-role enable/disable
  const [showDeleteModal, setShowDeleteModal] = useState(false); // For single-role delete

  // Bulk modals
  const [showBulkEnableModal, setShowBulkEnableModal] = useState(false);
  const [showBulkDisableModal, setShowBulkDisableModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({ role: "" });
  const [showAddModal, setShowAddModal] = useState(false);

  // Track how many rows are selected
  const rowCountSelected = Object.keys(rowSelection).length;
  const isSelectionEmpty = rowCountSelected === 0;

  // Detect if Tailwind’s dark mode is active on the root HTML element
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

  // Fetch roles
  const fetchRoles = async () => {
    setLoading(true);
    const res = await getRoles();
    if (res.status && Array.isArray(res.data)) {
      // Convert "Active" -> "Enable", "Inactive" -> "Disable"
      const enriched = res.data.map((r) => ({
        ...r,
        status: r.status === "Active" ? "Enable" : "Disable",
      }));
      setRoles(enriched);
    } else {
      setRoles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  /* ---------------------------
     Single-role actions
  ----------------------------*/

  // Toggle between "Enable" and "Disable"
  const handleToggleStatus = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const confirmToggleStatus = async () => {
    if (!selectedRole) return;
    const updatedStatus =
      selectedRole.status === "Enable" ? "Disable" : "Enable";
    const res = await updateRole(selectedRole.id, { status: updatedStatus });
    if (res.status) toast.success("Role updated successfully");
    else toast.error(res.message || "Failed to update role");
    setShowModal(false);
    setSelectedRole(null);
    fetchRoles();
  };

  // Single delete
  const handleDelete = (role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedRole) return;
    const res = await deleteRole(selectedRole.id);
    if (res.status) toast.success("Role deleted successfully");
    else toast.error(res.message || "Failed to delete role");
    setShowDeleteModal(false);
    setSelectedRole(null);
    fetchRoles();
  };

  /* ---------------------------
     Bulk actions
  ----------------------------*/

  const confirmBulkToggle = async (enable = true) => {
    const selectedIds = Object.keys(rowSelection).map((key) => Number(key));
    const newStatus = enable ? "Enable" : "Disable";

    for (const id of selectedIds) {
      await updateRole(id, { status: newStatus });
    }
    toast.success(
      `Selected roles have been ${newStatus.toLowerCase()}d successfully`
    );
    fetchRoles();
    setRowSelection({});
  };

  const confirmBulkDelete = async () => {
    const selectedIds = Object.keys(rowSelection).map((key) => Number(key));
    for (const id of selectedIds) {
      await deleteRole(id);
    }
    toast.success("Selected roles deleted");
    fetchRoles();
    setRowSelection({});
  };

  const handleBulkEnable = () => {
    if (isSelectionEmpty) return;
    setShowBulkEnableModal(true);
  };
  const handleBulkDisable = () => {
    if (isSelectionEmpty) return;
    setShowBulkDisableModal(true);
  };
  const handleBulkDelete = () => {
    if (isSelectionEmpty) return;
    setShowBulkDeleteModal(true);
  };

  const confirmBulkEnableAction = () => {
    confirmBulkToggle(true);
    setShowBulkEnableModal(false);
  };
  const confirmBulkDisableAction = () => {
    confirmBulkToggle(false);
    setShowBulkDisableModal(false);
  };
  const confirmBulkDeleteAction = () => {
    confirmBulkDelete();
    setShowBulkDeleteModal(false);
  };

  /* ---------------------------
     Add Role
  ----------------------------*/
  const handleAddRole = async () => {
    if (!newRole.role.trim()) return;
    const res = await createRole(newRole);
    if (res.status) toast.success("Role added successfully");
    else toast.error(res.message || "Failed to add role");
    setShowAddModal(false);
    setNewRole({ role: "" });
    fetchRoles();
  };

  // Table columns (remove "Description" column)
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
    },
    {
      accessorKey: "role",
      header: "Role Name",
    },
    {
      accessorKey: "status",
      header: "Status", // "Enable"/"Disable"
      Cell: ({ cell }) => <StatusBadge status={cell.getValue()} />,
    },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <Navbar />
      <div className="p-4 pt-24 min-h-screen text-gray-900 dark:text-gray-100 dark:bg-gray-900">
        <ToastContainer position="top-right" />

        {/* Page Header */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Roles Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Role
          </button>
        </div>

        {/* Data Table */}
        <div className="rounded border border-gray-200 dark:border-gray-700">
          <MaterialReactTable
            columns={columns}
            data={roles}
            getRowId={(originalRow) => String(originalRow.id)}
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
              className:
                "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
            }}
            muiTableContainerProps={{
              sx: { maxHeight: "500px" },
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
                {/* Bulk Enable */}
                <button
                  onClick={handleBulkEnable}
                  className={`${isSelectionEmpty
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer hover:text-white hover:bg-green-800"
                    } text-green-700 border border-green-700 font-medium rounded-lg text-sm px-5 py-2.5`}
                >
                  Enable
                </button>

                {/* Bulk Disable */}
                <button
                  onClick={handleBulkDisable}
                  className={`${isSelectionEmpty
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer hover:text-white hover:bg-yellow-600"
                    } text-yellow-500 border border-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5`}
                >
                  Disable
                </button>

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

        {/* =========================
            Bulk Action Modals
        ========================== */}

        {/* Bulk Enable */}
        <Modal
          show={showBulkEnableModal}
          onClose={() => setShowBulkEnableModal(false)}
        >
          <Modal.Header>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Enable
            </h3>
          </Modal.Header>
          <Modal.Body>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Are you sure you want to enable the selected roles?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={confirmBulkEnableAction}
              className="text-blue-700 dark:text-blue-500 hover:text-white dark:hover:text-white border border-blue-700 dark:border-blue-500 hover:bg-blue-800 dark:hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Yes, Confirm
            </button>
            <button
              onClick={() => setShowBulkEnableModal(false)}
              className="text-gray-900 dark:text-gray-400 hover:text-white dark:hover:text-white border border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>

        {/* Bulk Disable */}
        <Modal
          show={showBulkDisableModal}
          onClose={() => setShowBulkDisableModal(false)}
        >
          <Modal.Header>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Disable
            </h3>
          </Modal.Header>
          <Modal.Body>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Are you sure you want to disable the selected roles?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={confirmBulkDisableAction}
              className="text-blue-700 dark:text-blue-500 hover:text-white dark:hover:text-white border border-blue-700 dark:border-blue-500 hover:bg-blue-800 dark:hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Yes, Confirm
            </button>
            <button
              onClick={() => setShowBulkDisableModal(false)}
              className="text-gray-900 dark:text-gray-400 hover:text-white dark:hover:text-white border border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>

        {/* Bulk Delete */}
        <Modal
          show={showBulkDeleteModal}
          onClose={() => setShowBulkDeleteModal(false)}
        >
          <Modal.Header>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Selected Roles
            </h3>
          </Modal.Header>
          <Modal.Body>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Are you sure you want to delete the selected roles? This action
              cannot be undone.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={confirmBulkDeleteAction}
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

        {/* =========================
            Single-Role Modals
        ========================== */}

        {/* Confirm Enable/Disable (Single Role) */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Action
            </h3>
          </Modal.Header>
          <Modal.Body>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Are you sure you want to
              {selectedRole?.status === "Enable" ? " Disable " : " Enable "}
              the role "{selectedRole?.role}"?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={confirmToggleStatus}
              className="text-blue-700 dark:text-blue-500 hover:text-white dark:hover:text-white border border-blue-700 dark:border-blue-500 hover:bg-blue-800 dark:hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Yes, Confirm
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-900 dark:text-gray-400 hover:text-white dark:hover:text-white border border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>

        {/* Confirm Delete (Single Role) */}
        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <Modal.Header>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Role
            </h3>
          </Modal.Header>
          <Modal.Body>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Are you sure you want to delete the role "{selectedRole?.role}"?
              This action cannot be undone.
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

        {/* Add Role Modal */}
        <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
          <Modal.Header>Add New Role</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <Label htmlFor="role" value="Role Name" />
                <TextInput
                  id="role"
                  placeholder="Enter role name"
                  value={newRole.role}
                  onChange={(e) => setNewRole({ role: e.target.value })}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleAddRole}
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Role
            </button>
            <button
              onClick={() => setShowAddModal(false)}
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

export default Roles;
