// services/admin/permissionService.js

import apiClient from "../api/apiClient";

const USE_MOCK_API = false;

const formatResponse = (status, message, data = null) => ({
    status,
    message,
    data,
});

let dummyPermissions = [
    {
        id: 101,
        role_id: 2,
        menu: "admin-dashboard",
        view: 1,
        add: 1,
        edit: 1,
        delete: 1,
    },
    {
        id: 102,
        role_id: 2,
        menu: "user-management",
        view: 1,
        add: 1,
        edit: 1,
        delete: 1,
    },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/* -----------
   1) GET ALL ROLES
   - unchanged from your snippet
-------------- */
export const getAllRoles = async () => {
    if (!USE_MOCK_API) {
        try {
            const res = await apiClient.get("admin/get_roles");
            return formatResponse(res.data.status, res.data.message, res.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }
    // mock fallback
    await delay(400);
    return formatResponse(true, "Mock roles fetched", [
        { id: 1, role: "Admin" },
        { id: 2, role: "HR" },
        { id: 3, role: "Moderator" },
    ]);
};

/* -----------
   2) VIEW ROLE PERMISSIONS
   NEW: POST /api/v1/admin/view_permission
   Body: { "role_id":"18" }
   Response:
     {
       "status": true,
       "data": [
         {
           "role": "admin",
           "role_id": 18,
           "permissions": [ { id, menu, view, add, edit, delete }, ... ]
         }
       ]
     }
-------------- */
export const getRolePermissions = async (roleId) => {
    if (!USE_MOCK_API) {
        try {
            // NEW: Use POST and pass { role_id: ... } in request body
            const res = await apiClient.post("admin/view_permission", {
                role_id: String(roleId),
            });

            // Typically: res.data.data is an array with one element:
            // [
            //   {
            //     "role": "admin",
            //     "role_id": 18,
            //     "permissions": [...]
            //   }
            // ]
            if (res.data.status && Array.isArray(res.data.data) && res.data.data.length > 0) {
                const roleObj = res.data.data[0];
                // We can return the entire object or just the "permissions" array
                return formatResponse(
                    true,
                    "Role permissions fetched successfully",
                    {
                        role: roleObj.role,
                        role_id: roleObj.role_id,
                        permissions: roleObj.permissions,
                    }
                );
            } else {
                return formatResponse(
                    false,
                    "No permission data returned",
                    res.data.data
                );
            }
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // ======= Mock Fallback =======
    await delay(400);
    const filtered = dummyPermissions.filter((p) => p.role_id === Number(roleId));
    // For consistency, let's return an object with "permissions" array
    return formatResponse(true, "Mock perms for role " + roleId, {
        role: "Mock Role",
        role_id: roleId,
        permissions: filtered,
    });
};

/* -----------
   3) ADD ROLE PERMISSION
   (Unchanged, but included for completeness)
-------------- */
export const addRolePermission = async (roleId, permissionArray) => {
    if (!USE_MOCK_API) {
        try {
            const payload = {
                role_id: String(roleId),
                permission: permissionArray,
            };
            const res = await apiClient.post("admin/add_role_permission", payload);
            return formatResponse(res.data.status, res.data.message, res.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // mock fallback
    await delay(400);
    const newItems = permissionArray.map((item) => ({
        ...item,
        id: Date.now() + Math.floor(Math.random() * 1000),
        role_id: Number(roleId),
    }));
    dummyPermissions = dummyPermissions.concat(newItems);
    return formatResponse(true, "Mock permission added", newItems);
};

/* -----------
   4) UPDATE ROLE PERMISSION
   (Unchanged)
-------------- */
export const updateRolePermission = async (roleId, updatedPerms) => {
    debugger
    if (!USE_MOCK_API) {
        try {
            const payload = {
                role_id: String(roleId),
                permission: updatedPerms,
            };
            const res = await apiClient.post("admin/update_role_permission", payload);
            return formatResponse(res.data.status, res.data.message, res.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // mock fallback
    await delay(400);
    updatedPerms.forEach((perm) => {
        const idx = dummyPermissions.findIndex((p) => p.id === perm.id);
        if (idx !== -1) {
            dummyPermissions[idx] = { ...dummyPermissions[idx], ...perm };
        } else {
            dummyPermissions.push({
                ...perm,
                id: Date.now() + Math.floor(Math.random() * 1000),
                role_id: Number(roleId),
            });
        }
    });
    return formatResponse(true, "Mock perms updated", updatedPerms);
};

/* -----------
   5) DELETE ROLE PERMISSION
   (Unchanged)
-------------- */
export const deleteRolePermission = async (permissionId) => {
    if (!USE_MOCK_API) {
        try {
            const res = await apiClient.post("admin/delete_role_permission", {
                id: String(permissionId),
            });
            return formatResponse(res.data.status, res.data.message, res.data.data);
        } catch (error) {
            return formatResponse(false, error.message);
        }
    }

    // mock fallback
    await delay(400);
    const idx = dummyPermissions.findIndex((p) => p.id === permissionId);
    if (idx === -1) {
        return formatResponse(false, "Permission not found in mock");
    }
    dummyPermissions.splice(idx, 1);
    return formatResponse(true, "Mock permission deleted");
};
