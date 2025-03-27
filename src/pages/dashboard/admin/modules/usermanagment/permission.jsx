import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllRoles,
  getRolePermissions,
  addRolePermission,
  updateRolePermission,
} from "../../../../../services/admin/permissionService";

export default function Permissions() {
  // ------------------------
  // 1) Roles state
  // ------------------------
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  // ------------------------
  // 2) Menu definitions
  // ------------------------
  const menuList = [
    { id: 1, name: "admin-dashboard" },
    { id: 2, name: "user-management" },
    { id: 3, name: "role-management" },
    { id: 4, name: "role-permission" },
    { id: 5, name: "jobseeker-management" },
    { id: 6, name: "recruiter-management" },
    { id: 7, name: "subscription-payment" },
    { id: 8, name: "reports-analytics" },
    { id: 9, name: "profile" },
    { id: 10, name: "setting" },
    { id: 11, name: "earning" },
  ];

  // ------------------------
  // 3) Local state for checkboxes
  // ------------------------
  // We'll store an object keyed by menu name -> { id?, view, add, edit, delete }
  const [permissions, setPermissions] = useState({});
  // Track if the current role already has permissions => set the button text accordingly
  const [hasExistingPerms, setHasExistingPerms] = useState(false);

  // Helper: build a default object for each menu with all false
  const createDefaultPerms = () => {
    const permObj = {};
    menuList.forEach((m) => {
      permObj[m.name] = {
        view: false,
        add: false,
        edit: false,
        delete: false,
      };
    });
    return permObj;
  };

  // ------------------------
  // 4) On mount: fetch roles
  // ------------------------
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllRoles();
      if (res.status) {
        setRoles(res.data);
      } else {
        toast.error(res.message || "Failed to fetch roles");
      }
    };
    fetchData();
  }, []);

  // ------------------------
  // 5) When selectedRole changes, fetch existing perms
  // ------------------------
  useEffect(() => {
    // If user hasn't selected a role yet, reset permissions
    if (!selectedRole) {
      setPermissions({});
      setHasExistingPerms(false);
      return;
    }

    const fetchRolePerms = async () => {
      const res = await getRolePermissions(selectedRole);

      if (res.status && res.data && Array.isArray(res.data.permissions)) {
        // Create a full default object
        const newObj = createDefaultPerms();

        // For each item in res.data.permissions => set to booleans
        // e.g. 0 => false, 1 => true
        const { permissions: permArray } = res.data; // destructuring
        // If permArray has at least one item, we mark hasExistingPerms = true
        setHasExistingPerms(permArray.length > 0);

        permArray.forEach((item) => {
          // item.menu is e.g. "admin-dashboard"
          newObj[item.menu] = {
            id: item.id, // so we know the record exists in DB
            view: item.view === 1,
            add: item.add === 1,
            edit: item.edit === 1,
            delete: item.delete === 1,
          };
        });
        setPermissions(newObj);
      } else {
        // If there's no data or empty array, means no existing perms
        setPermissions(createDefaultPerms());
        setHasExistingPerms(false);
      }
    };

    fetchRolePerms();
  }, [selectedRole]);

  // ------------------------
  // 6) Toggle a single permission
  // ------------------------
  const handlePermissionChange = (menuName, type) => {
    setPermissions((prev) => ({
      ...prev,
      [menuName]: {
        ...prev[menuName],
        [type]: !prev[menuName][type],
      },
    }));
  };

  // ------------------------
  // 7) Toggle entire row
  // ------------------------
  const handleSelectAllRow = (menuName) => {
    setPermissions((prev) => {
      const old = prev[menuName];
      const allChecked = old.view && old.add && old.edit && old.delete;
      return {
        ...prev,
        [menuName]: {
          ...old,
          view: !allChecked,
          add: !allChecked,
          edit: !allChecked,
          delete: !allChecked,
        },
      };
    });
  };

  // ------------------------
  // 8) Toggle entire table
  // ------------------------
  const handleSelectAll = () => {
    const isAllChecked = Object.values(permissions).every(
      (p) => p.view && p.add && p.edit && p.delete
    );
    const newPerms = {};
    for (const menuName in permissions) {
      newPerms[menuName] = {
        ...permissions[menuName],
        view: !isAllChecked,
        add: !isAllChecked,
        edit: !isAllChecked,
        delete: !isAllChecked,
      };
    }
    setPermissions(newPerms);
  };

  // ------------------------
  // 9) Save => Add or Update
  // ------------------------
  const handleSavePermissions = async () => {
    if (!selectedRole) {
      toast.error("Please select a role first.");
      return;
    }

    // Build array of { id?, menu, view:0/1, add:0/1, edit:0/1, delete:0/1 }
    const permArray = Object.keys(permissions).map((menuName) => {
      const { id, view, add, edit, delete: del } = permissions[menuName];
      return {
        ...(id ? { id } : {}), // only include id if it exists
        menu: menuName,
        view: view ? 1 : 0,
        add: add ? 1 : 0,
        edit: edit ? 1 : 0,
        delete: del ? 1 : 0,
      };
    });

    if (hasExistingPerms) {
      // We have at least one existing permission, so let's update
      const res = await updateRolePermission(selectedRole, permArray);
      if (res.status) toast.success("Permissions updated successfully");
      else toast.error(res.message || "Failed to update permissions");
    } else {
      // No existing perms => add them
      const res = await addRolePermission(selectedRole, permArray);
      if (res.status) toast.success("Permissions added successfully");
      else toast.error(res.message || "Failed to add permissions");
    }
  };

  // ------------------------
  // RENDER
  // ------------------------
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <ToastContainer position="top-right" />

      <div className="pt-24 p-6 min-h-screen">
        <div className="grid grid-cols-12 gap-6">
          {/* Left side: Role dropdown + Save btn */}
          <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Select Role</h3>
            <select
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border dark:border-gray-600 text-gray-900 dark:text-white"
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
              }}
            >
              <option value="">--Select Role--</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role}
                </option>
              ))}
            </select>

            {/* Show the Save button only if a role is selected */}
            {selectedRole && (
              <button
                onClick={handleSavePermissions}
                className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {hasExistingPerms ? "Update Permissions" : "Add Permissions"}
              </button>
            )}
          </div>

          {/* Right side: only show if a role is selected */}
          {selectedRole ? (
            <div className="col-span-12 md:col-span-9 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                Set Permissions for Selected Role
              </h3>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={
                            Object.values(permissions).length > 0 &&
                            Object.values(permissions).every(
                              (p) => p.view && p.add && p.edit && p.delete
                            )
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                        />
                      </th>
                      <th className="px-6 py-3">Menu</th>
                      <th className="px-6 py-3 text-center">View</th>
                      <th className="px-6 py-3 text-center">Add</th>
                      <th className="px-6 py-3 text-center">Edit</th>
                      <th className="px-6 py-3 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-700">
                    {menuList.map((menu) => {
                      const permObj = permissions[menu.name] || {
                        view: false,
                        add: false,
                        edit: false,
                        delete: false,
                      };
                      const { view, add, edit, delete: del } = permObj;

                      return (
                        <tr
                          key={menu.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className="p-4">
                            <input
                              type="checkbox"
                              onChange={() => handleSelectAllRow(menu.name)}
                              checked={view || add || edit || del}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                            />
                          </td>
                          <td className="px-6 py-4 font-medium">
                            {menu.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={view}
                              onChange={() =>
                                handlePermissionChange(menu.name, "view")
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={add}
                              onChange={() =>
                                handlePermissionChange(menu.name, "add")
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={edit}
                              onChange={() =>
                                handlePermissionChange(menu.name, "edit")
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={del}
                              onChange={() =>
                                handlePermissionChange(menu.name, "delete")
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
          <div className="col-span-12 md:col-span-9 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center justify-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Please select a role to set permissions.
            </p>
          </div>
)}
        </div>
      </div>
    </div>
  );
}
