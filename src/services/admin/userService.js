// services/admin/userService.js

import apiClient from "../api/apiClient";

// Toggle mock or real API
const USE_MOCK_API = false;

// Helper to keep response shape consistent
const formatResponse = (status, message, data = null) => ({
    status,
    message,
    data,
});

// Example mock data
let dummyUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        mobile: "1234567890",
        password: "********",
        role_id: 2,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        mobile: "9876543210",
        password: "********",
        role_id: 1,
    },
];

// Simulated delay for mock calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ----------------------------------
   1) GET/VIEW USERS
   GET /api/v1/admin/view_user
------------------------------------- */
export const getUsers = async () => {
    if (!USE_MOCK_API) {
        debugger
        try {
            const res = await apiClient.get("admin/view_user");
            // Expecting a response like { status: true, data: [ {..user}, .. ] }
            return formatResponse(res.data.status, res.data.message, res.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // ===== MOCK Fallback =====
    await delay(500);
    return formatResponse(true, "Users fetched successfully (mock)", dummyUsers);
};

/* ----------------------------------
   2) ADD USER
   POST /api/v1/admin/add_user
   Body: { name, email, mobile, password, role_id }
------------------------------------- */
export const addUser = async (userData) => {
    if (!USE_MOCK_API) {
        try {
            const res = await apiClient.post("admin/add_user", userData);
            // Example success response: { status: true, message: "...", data: {...} }
            return formatResponse(res.data.status, res.data.message, res.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // ===== MOCK Fallback =====
    await delay(500);
    const newUser = {
        ...userData,
        id: Date.now(),
    };
    dummyUsers.push(newUser);
    return formatResponse(true, "User added successfully (mock)", newUser);
};

/* ----------------------------------
   3) UPDATE USER
   POST /api/v1/admin/update_user
   Body: { id, name, email, mobile, password, role_id }
------------------------------------- */
export const updateUser = async (userData) => {
    // userData should include "id"
    if (!USE_MOCK_API) {
        try {
            const res = await apiClient.post("admin/update_user", userData);
            return formatResponse(res.data.status, res.data.message, res.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // ===== MOCK Fallback =====
    await delay(500);
    const index = dummyUsers.findIndex((u) => u.id === userData.id);
    if (index === -1) {
        return formatResponse(false, "User not found in mock data");
    }
    // Update the mock user
    dummyUsers[index] = { ...dummyUsers[index], ...userData };
    return formatResponse(true, "User updated successfully (mock)", dummyUsers[index]);
};

/* ----------------------------------
   4) DELETE USER
   POST /api/v1/admin/delete_user
   Body: { id }
------------------------------------- */
export const deleteUser = async (userId) => {
    if (!USE_MOCK_API) {
        try {
            const payload = { id: userId };
            const res = await apiClient.post("admin/delete_user", payload);
            return formatResponse(res.data.status, res.data.message, res.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // ===== MOCK Fallback =====
    await delay(500);
    const index = dummyUsers.findIndex((u) => u.id === userId);
    if (index === -1) {
        return formatResponse(false, "User not found in mock data");
    }
    dummyUsers.splice(index, 1);
    return formatResponse(true, "User deleted successfully (mock)");
};
