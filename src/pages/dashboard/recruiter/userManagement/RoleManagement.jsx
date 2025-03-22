import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit } from "lucide-react";

const BASE_URL = "http://localhost/Rec-Backend/recruitment-backend/api/v1";

// Define your available permission menus
const availablePermissionMenus = [
  "dashboard",
  "company profile",
  "job management",
  "users",
  "candidate",
  "interview",
];

// Function to generate default permissions (all enabled in this example)
const getDefaultPermissions = () => {
  return availablePermissionMenus.map((menu) => ({
    menu,
    view: 1,
    add: 1,
    edit: 1,
    delete: 1,
  }));
};

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Fetch roles from your backend
  useEffect(() => {
    axios
      .get(`${BASE_URL}/recruiter/roles`) // Adjust endpoint if necessary
      .then((response) => {
        setRoles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        setLoading(false);
      });
  }, []);

  const handleOpenAddModal = () => {
    setEditingRole(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (role) => {
    setEditingRole(role);
    setModalOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    axios
      .delete(`${BASE_URL}/recruiter/roles/${roleId}`) // Adjust endpoint as needed
      .then(() => {
        setRoles(roles.filter((role) => role.role_id !== roleId));
      })
      .catch((error) => console.error("Error deleting role:", error));
  };

  const handleSubmitRole = (values, { resetForm }) => {
    if (editingRole) {
      axios
        .patch(`${BASE_URL}/recruiter/roles/${editingRole.role_id}`, values)
        .then((response) => {
          setRoles(
            roles.map((role) =>
              role.role_id === editingRole.role_id ? response.data : role
            )
          );
          setModalOpen(false);
          setEditingRole(null);
          resetForm();
        })
        .catch((error) => console.error("Error updating role:", error));
    } else {
      axios
        .post(`${BASE_URL}/recruiter/add_role_permission`, values)
        .then((response) => {
          setRoles([...roles, response.data]);
          setModalOpen(false);
          resetForm();
        })
        .catch((error) => console.error("Error adding role:", error));
    }
  };

  const getInitialFormValues = () => {
    if (editingRole) {
      return {
        role_id: editingRole.role_id,
        company_id: editingRole.company_id,
        permission: editingRole.permission || getDefaultPermissions(),
      };
    }
    return {
      role_id: "",
      company_id: "",
      permission: getDefaultPermissions(),
    };
  };

  const validationSchema = Yup.object({
    role_id: Yup.string().required("Required"),
    company_id: Yup.string().required("Required"),
    permission: Yup.array().of(
      Yup.object().shape({
        menu: Yup.string().required(),
        view: Yup.number().oneOf([0, 1]),
        add: Yup.number().oneOf([0, 1]),
        edit: Yup.number().oneOf([0, 1]),
        delete: Yup.number().oneOf([0, 1]),
      })
    ),
  });

  // Helper to toggle a permission flag
  const togglePermission = (permissions, index, field) => {
    const updated = [...permissions];
    updated[index] = {
      ...permissions[index],
      [field]: permissions[index][field] === 1 ? 0 : 1,
    };
    return updated;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={handleOpenAddModal}
        >
          <Plus size={20} /> Add Role
        </motion.button>
      </div>

      {/* Role Table */}
      <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-lg font-bold text-gray-800">Role List</h3>
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Role ID</th>
                <th className="p-3 text-left">Company ID</th>
                <th className="p-3 text-left">Permissions</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-3" colSpan="4">
                    <Skeleton height={30} />
                  </td>
                </tr>
              ) : roles.length === 0 ? (
                <tr>
                  <td className="p-3 text-center text-gray-500" colSpan="4">
                    No roles found
                  </td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr key={role.role_id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{role.role_id}</td>
                    <td className="p-3">{role.company_id}</td>
                    <td className="p-3">
                      {role.permission.map((perm, index) => (
                        <div key={index}>
                          <strong>{perm.menu.toUpperCase()}:</strong>{" "}
                          V:{perm.view} A:{perm.add} E:{perm.edit} D:{perm.delete}
                        </div>
                      ))}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(role)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.role_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit Role */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h3 className="text-lg font-bold mb-4">
              {editingRole ? "Edit Role" : "Add Role"}
            </h3>
            <Formik
              initialValues={getInitialFormValues()}
              validationSchema={validationSchema}
              onSubmit={handleSubmitRole}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label>Role ID</label>
                      <Field
                        name="role_id"
                        className="w-full p-2 border rounded-md"
                        placeholder="Role ID"
                      />
                      {errors.role_id && touched.role_id && (
                        <div className="text-red-600 text-sm">
                          {errors.role_id}
                        </div>
                      )}
                    </div>
                    <div>
                      <label>Company ID</label>
                      <Field
                        name="company_id"
                        className="w-full p-2 border rounded-md"
                        placeholder="Company ID"
                      />
                      {errors.company_id && touched.company_id && (
                        <div className="text-red-600 text-sm">
                          {errors.company_id}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <table className="w-full border">
                      <thead>
                        <tr>
                          <th className="border p-2">Menu</th>
                          <th className="border p-2">View</th>
                          <th className="border p-2">Add</th>
                          <th className="border p-2">Edit</th>
                          <th className="border p-2">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.permission.map((perm, index) => (
                          <tr key={perm.menu}>
                            <td className="border p-2 text-sm font-medium">
                              {perm.menu.toUpperCase()}
                            </td>
                            {["view", "add", "edit", "delete"].map((action) => (
                              <td key={action} className="border p-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={perm[action] === 1}
                                  onChange={() => {
                                    const updated = togglePermission(
                                      values.permission,
                                      index,
                                      action
                                    );
                                    setFieldValue("permission", updated);
                                  }}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
                  >
                    {editingRole ? "Update Role" : "Add Role"}
                  </button>
                </Form>
              )}
            </Formik>
            <button
              className="mt-4 w-full text-red-600"
              onClick={() => {
                setModalOpen(false);
                setEditingRole(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
