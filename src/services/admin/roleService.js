// Toggle to use real API (set to false when ready)
const USE_MOCK_API = true;

// import apiClient from "../../api/apiClient"; // Uncomment when using real API

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
        // const response = await apiClient.get("/admin/roles");
        // return response.data;
    }

    await delay(500);
    return formatResponse(true, "Roles fetched successfully", dummyRoles);
};

/* -------------------------------
   ➕ CREATE ROLE
-------------------------------- */
export const createRole = async (roleData) => {
    if (!USE_MOCK_API) {
        // const response = await apiClient.post("/admin/roles", roleData);
        // return response.data;
    }

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
    if (!USE_MOCK_API) {
        // const response = await apiClient.put(`/admin/roles/${roleId}`, updatedData);
        // return response.data;
    }

    await delay(500);
    const index = dummyRoles.findIndex((r) => r.id === roleId);
    if (index === -1) throw formatResponse(false, "Role not found");

    dummyRoles[index] = { ...dummyRoles[index], ...updatedData };
    return formatResponse(true, "Role updated successfully", dummyRoles[index]);
};

/* -------------------------------
   🗑 DELETE ROLE
-------------------------------- */
export const deleteRole = async (roleId) => {
    if (!USE_MOCK_API) {
        // const response = await apiClient.delete(`/admin/roles/${roleId}`);
        // return response.data;
    }

    await delay(500);
    const index = dummyRoles.findIndex((r) => r.id === roleId);
    if (index === -1) throw formatResponse(false, "Role not found");

    dummyRoles.splice(index, 1);
    return formatResponse(true, "Role deleted successfully");
};
