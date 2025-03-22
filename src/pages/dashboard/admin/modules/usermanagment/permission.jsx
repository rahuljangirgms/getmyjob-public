import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function Permissions() {
  // Roles Selection
  const roles = ["Admin", "Recruiter", "User", "Moderator", "HR"];
  const [selectedRole, setSelectedRole] = useState("Admin");

  // Menu List with Permissions
  const menuList = [
    { id: 1, name: "Dashboard",view: 1, add: 1, edit: 1, delete: 1 },
    { id: 2, name: "User Management", view: 1, add: 1, edit: 1, delete: 1 },
    { id: 3, name: "Roles", view: 1, add: 1, edit: 1, delete: 1 },
    { id: 4, name: "Permissions", view: 1, add: 1, edit: 1, delete: 1 },
    { id: 5, name: "Users", view: 1, add: 1, edit: 1, delete: 1 },
    { id: 6, name: "Job Seekers Management", view: 1, add: 1, edit: 1, delete: 1 },
    { id: 7, name: "Recruiters Management", view: 1, add: 1, edit: 1, delete: 1 },
    { id: 8, name: "Subscription & Payment", view: 1, add: 1, edit: 1, delete: 1 },
    { id: 9, name: "Reports & Analytics", view: 1, add: 1, edit: 1, delete: 1 },
    { id: 10, name: "Supports", view: 1, add: 1, edit: 1, delete: 1 },
  ];

  // Initialize Permissions
  const initializePermissions = (menuList) => {
    const permissions = {};
    menuList.forEach((menu) => {
      if (menu.view !== undefined) {
        // Menu with permissions (view, add, edit, delete)
        permissions[menu.id] = { view: !!menu.view, add: !!menu.add, edit: !!menu.edit, delete: !!menu.delete };
      } else {
        // Menu without permissions (just a name)
        permissions[menu.id] = { view: false, add: false, edit: false, delete: false };
      }
    });
    return permissions;
  };

  const [permissions, setPermissions] = useState(initializePermissions(menuList));

  // Toggle Permissions for Individual Items
  const handlePermissionChange = (menuId, type) => {
    setPermissions((prev) => ({
      ...prev,
      [menuId]: { ...prev[menuId], [type]: !prev[menuId][type] },
    }));
  };

  // Toggle Select All for Row
  const handleSelectAllRow = (menuId) => {
    setPermissions((prev) => {
      const newPermissions = { ...prev };
      const allChecked = Object.values(prev[menuId]).every(Boolean);

      newPermissions[menuId] = {
        view: !allChecked,
        add: !allChecked,
        edit: !allChecked,
        delete: !allChecked,
      };

      return newPermissions;
    });
  };

  // Toggle Select All for Table
  const handleSelectAll = () => {
    const allChecked = Object.values(permissions).every((perm) =>
      Object.values(perm).every(Boolean)
    );

    const newPermissions = {};
    Object.keys(permissions).forEach((key) => {
      newPermissions[key] = { view: !allChecked, add: !allChecked, edit: !allChecked, delete: !allChecked };
    });

    setPermissions(newPermissions);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="pt-24 p-6 min-h-screen">
        <div className="grid grid-cols-12 gap-6">
          {/* Role Selection (3 Columns) */}
          <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Select Role</h3>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border dark:border-gray-600 text-gray-900 dark:text-white"
            >
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Permissions Table (9 Columns) */}
          <div className="col-span-12 md:col-span-9 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Set Permissions for {selectedRole}</h3>
            <div className="relative overflow-x-auto ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={Object.values(permissions).every((perm) =>
                          Object.values(perm).every(Boolean)
                        )}
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
                  {menuList.map((menu) => (
                    <tr key={menu.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          onChange={() => handleSelectAllRow(menu.id)}
                          checked={Object.values(permissions[menu.id]).some(Boolean)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium">{menu.name}</td>
                      {menu.view !== undefined && ["view", "add", "edit", "delete"].map((perm) => (
                        <td key={perm} className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={permissions[menu.id]?.[perm]}
                            onChange={() => handlePermissionChange(menu.id, perm)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
