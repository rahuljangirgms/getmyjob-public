
import apiClient from "../api/apiClient"; // Import the API client

// Toggle to use real API (set to false when ready)
const USE_MOCK_API = false;
// const USE_MOCK_API = true;



// ✅ Centralized response formatter
const formatResponse = (status, message, data = null) => {
    return { status, message, data };
};

// 🧪 Dummy data
let dummyRoles = [
    {
        id: 1,
        role_name: "Admin",
        role_description: "Full access to the system",
        status: "Active",
    },
    {
        id: 2,
        role_name: "Manager",
        role_description: "Manages users and reports",
        status: "Active",
    },
    {
        id: 3,
        role_name: "Viewer",
        role_description: "Can only view content",
        status: "Inactive",
    },
];

// Simulated delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/* -------------------------------
   🔍 GET ALL ROLES
-------------------------------- */
export const getRoles = async () => {
    if (!USE_MOCK_API) {
        try {
            const response = await apiClient.get("admin/get_roles");
            return formatResponse(true, "Roles fetched successfully", response.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    await delay(500);
    return formatResponse(true, "Roles fetched successfully", dummyRoles);
};


/* -------------------------------
   ➕ CREATE ROLE
-------------------------------- */
export const createRole = async (roleData) => {
    debugger;
    if (!USE_MOCK_API) {
        try {
            const response = await apiClient.post("admin/add_roles", roleData);
            return formatResponse(true, "Role added successfully", response.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // Mock fallback
    await delay(500);
    const newRole = {
        ...roleData,
        id: Date.now(),
        status: "Active",
    };
    dummyRoles.push(newRole);
    return formatResponse(true, "Role added successfully", newRole);
};


/* -------------------------------
   📝 UPDATE ROLE
-------------------------------- */
export const updateRole = async (roleId, updatedData) => {
    debugger
    // If we are NOT using the mock API, call the real endpoint
    if (!USE_MOCK_API) {
        try {
            // Convert "Enable"/"Disable" to "Active"/"Inactive" for the API
            const action =
                updatedData.status === "Enable"
                    ? "Active"
                    : "Inactive";

            const response = await apiClient.post("admin/update_action", {
                id: String(roleId),
                action, // This is now "Active" or "Inactive"
            });

            return formatResponse(true, "Role updated successfully", response.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // Otherwise, use mock fallback
    await delay(500);
    const index = dummyRoles.findIndex((r) => r.id === roleId);
    if (index === -1) {
        return formatResponse(false, "Role not found");
    }

    // Update the dummy data in memory
    dummyRoles[index] = { ...dummyRoles[index], ...updatedData };
    return formatResponse(true, "Role updated successfully", dummyRoles[index]);
};

/* -------------------------------
   🗑 DELETE ROLE
-------------------------------- */
export const deleteRole = async (roleId) => {
    debugger
    if (!USE_MOCK_API) {
        try {
            const response = await apiClient.post("admin/delete_role", { id: roleId });
            return formatResponse(true, "Role deleted successfully", response.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // Mock fallback
    await delay(500);
    const index = dummyRoles.findIndex((r) => r.id === roleId);
    if (index === -1) throw formatResponse(false, "Role not found");

    dummyRoles.splice(index, 1);
    return formatResponse(true, "Role deleted successfully");
};
