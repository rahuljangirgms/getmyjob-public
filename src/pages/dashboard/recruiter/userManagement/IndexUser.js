  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Briefcase, Users, UserX, Plus, Trash2, Edit } from "lucide-react";
  import { motion } from "framer-motion";
  import Skeleton from "react-loading-skeleton";
  import "react-loading-skeleton/dist/skeleton.css";
  import { Formik, Form, Field } from "formik";
  import * as Yup from "yup";
  import { useDispatch, useSelector } from "react-redux";

  import {
    // fetchRolesRequest,
    fetchUsersRequest,
    addUserRequest,
    updateUserRequest,
    deleteUserRequest,
    // updateRolePermissionRequest,
    // addRolePermissionRequest,
    // viewRolePermissionRequest,
    // deleteRolePermissionRequest, // make sure this action exists
  } from "../../../../store/slices/recruiter/userSlice";


  import { fetchCompanyRequest } from "../../../../store/slices/recruiter/companySlice";
import { addRolePermissionRequest, deleteRolePermissionRequest, fetchRolesRequest, updateRolePermissionRequest, viewRolePermissionRequest } from "../../../../store/slices/recruiter/roleSlice";

  // (Optional) Remove this hardcoded permission function if you always want to use the logged-in user's permissions


  const IndexUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("users");

    // Get data from Redux store
    const { users,  loading } = useSelector((state) => state.users);
    const { company } = useSelector((state) => state.companies);
    const {roles,selectedRolePermissions} = useSelector((state)=>state.roles)

    console.log("roles======>",roles);
    // Get the logged-in user (including permissions) from auth slice
    const { user } = useSelector((state) => state.auth);
    // ---- Local modal states ----
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [roleModalOpen, setRoleModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    // Fetch initial data on mount
    useEffect(() => {
      dispatch(fetchCompanyRequest());
      dispatch(fetchUsersRequest());
      dispatch(fetchRolesRequest());
      dispatch(viewRolePermissionRequest());
    }, [dispatch]);

    // When edit role modal opens, dispatch API to fetch detailed permissions
    useEffect(() => {
      if (roleModalOpen && editingRole) {
        // Dispatch with payload containing the role's id and company id (modify your saga accordingly)
        dispatch(
          viewRolePermissionRequest()
        );
      }
    }, [roleModalOpen, editingRole, company, dispatch]);




    // ---- Derived data for stats ----
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "active").length;
    const inactiveUsers = totalUsers - activeUsers;

    // === USER MANAGEMENT LOGIC ===
    const handleOpenAddUserModal = () => {
      setEditingUser(null);
      setUserModalOpen(true);
    };
    const handleOpenEditUserModal = (user) => {
      setEditingUser(user);
      setUserModalOpen(true);
    };
    const handleDeleteUser = (id) => {
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      dispatch(deleteUserRequest(id));
    };
    const handleSubmitUser = (values, { resetForm }) => {
      if (editingUser) {
        dispatch(updateUserRequest({ id: editingUser.id, ...values }));
      } else {
        dispatch(addUserRequest({ ...values, status: "active" }));
      }
      setUserModalOpen(false);
      setEditingUser(null);
      resetForm();
    };
    const getUserInitialFormValues = () => {
      if (editingUser) {
        return {
          name: editingUser.name || "",
          company_id: editingUser.company_id || "",
          email: editingUser.email || "",
          mobile: editingUser.mobile || "",
          role_id: editingUser.role_id || "",
          password: editingUser.password || "",
        };
      }
      return {
        name: "",
        company_id: company?.id || "",
        email: "",
        mobile: "",
        role_id: "",
        password: "",
      };
    };
    const userValidationSchema = Yup.object({
      name: Yup.string().required("Required"),
      company_id: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "At least 6 chars").required("Required"),
      mobile: Yup.string().matches(/^\d+$/, "Invalid number").required("Required"),
      role_id: Yup.string().required("Required"),
    });

    // === ROLE MANAGEMENT LOGIC ===
    const handleOpenAddRoleModal = () => {
      setEditingRole(null);
      setRoleModalOpen(true);
    };
    const handleOpenEditRoleModal = (role) => {
      setEditingRole(role);
      setRoleModalOpen(true);
    };
    const handleDeleteRole = (roleId) => {
      if (!window.confirm("Are you sure you want to delete this role?")) return;
      // Dispatch deletion if required:
      dispatch(deleteRolePermissionRequest({ role_id: roleId, company_id: company.id }));
    };
    const handleSubmitRole = (values, { resetForm }) => {
      // Ensure company_id is set correctly before dispatching
      const payload = {
        ...values,
        company_id: values.company_id || (company?.id || ""),
      };

      if (editingRole) {
        dispatch(updateRolePermissionRequest(payload));
      } else {
        dispatch(addRolePermissionRequest(payload));
      }
      setRoleModalOpen(false);
      setEditingRole(null);
      resetForm();
    };
    const getRoleInitialFormValues = () => {
      const companyId = company?.id || "";
      if (editingRole) {

        const matchingRoleObj = selectedRolePermissions.find(
          (item) => item.role_id === editingRole.role_id
        );
         return {
      role_id: editingRole.role_id,
      company_id: companyId,
      permission: matchingRoleObj?.permissions || editingRole.permission || [],
    };
      }
      return {
        role_id: "",
        company_id: companyId,
        permission: user?.permissions || [],
      };
    };
    const roleValidationSchema = Yup.object({
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
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "users"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border"
            }`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "roles"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border"
            }`}
            onClick={() => setActiveTab("roles")}
          >
            Role Management
          </button>
        </div>

        {/* USER MANAGEMENT UI */}
        {activeTab === "users" && (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <p className="text-gray-600 mb-6">
                  Create a user with details like name, company ID, email, mobile,
                  password, and role.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={handleOpenAddUserModal}
              >
                <Plus size={20} /> Add User
              </motion.button>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white p-6 shadow-md rounded-lg flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <Briefcase size={32} className="text-blue-600" />
                <div>
                  <p className="text-lg font-semibold">Total Users</p>
                  <h3 className="text-2xl font-bold">
                    {loading ? <Skeleton width={50} /> : totalUsers}
                  </h3>
                </div>
              </motion.div>
              <motion.div
                className="bg-white p-6 shadow-md rounded-lg flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <Users size={32} className="text-green-600" />
                <div>
                  <p className="text-lg font-semibold">Active Users</p>
                  <h3 className="text-2xl font-bold">
                    {loading ? <Skeleton width={50} /> : activeUsers}
                  </h3>
                </div>
              </motion.div>
              <motion.div
                className="bg-white p-6 shadow-md rounded-lg flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <UserX size={32} className="text-red-600" />
                <div>
                  <p className="text-lg font-semibold">Inactive Users</p>
                  <h3 className="text-2xl font-bold">
                    {loading ? <Skeleton width={50} /> : inactiveUsers}
                  </h3>
                </div>
              </motion.div>
            </div>

            {/* User List */}
            <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">User List</h3>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="p-3 text-left">User Name</th>
                      <th className="p-3 text-left">Company ID</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td className="p-3" colSpan="6">
                          <Skeleton height={30} />
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td className="p-3 text-center text-gray-500" colSpan="6">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-100">
                          <td className="p-3 text-blue-600">{user.name}</td>
                          <td className="p-3">{company?.name}</td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">{user.role}</td>
                          <td
                            className={`p-3 font-semibold ${
                              user.status === "active"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {user.status || "active"}
                          </td>
                          <td className="p-3 flex gap-2">
                            <button
                              onClick={() => handleOpenEditUserModal(user)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center gap-1"
                            >
                              <Edit size={16} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
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

            {/* Add/Edit User Modal */}
            {userModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                  <h3 className="text-lg font-bold mb-4">
                    {editingUser ? "Edit User" : "Add User"}
                  </h3>
                  <Formik
                    initialValues={getUserInitialFormValues()}
                    validationSchema={userValidationSchema}
                    onSubmit={handleSubmitUser}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="flex flex-col gap-6">
                          <Field
                            name="name"
                            className="w-full p-2 border rounded-md"
                            placeholder="User Name"
                          />
                          {errors.name && touched.name && (
                            <div className="text-red-600 text-sm">{errors.name}</div>
                          )}

                          <Field
                            as="select"
                            name="company_id"
                            disabled
                            className="w-full p-2 border rounded-md"
                          >
                            {company && <option value={company.id}>{company.name}</option>}
                          </Field>
                          {errors.company_id && touched.company_id && (
                            <div className="text-red-600 text-sm">{errors.company_id}</div>
                          )}

                          <Field
                            name="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="Email"
                          />
                          {errors.email && touched.email && (
                            <div className="text-red-600 text-sm">{errors.email}</div>
                          )}

                          <Field
                            name="mobile"
                            className="w-full p-2 border rounded-md"
                            placeholder="Mobile Number"
                          />
                          {errors.mobile && touched.mobile && (
                            <div className="text-red-600 text-sm">{errors.mobile}</div>
                          )}

                          <Field
                            name="password"
                            type="password"
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter Password"
                          />
                          {errors.password && touched.password && (
                            <div className="text-red-600 text-sm">{errors.password}</div>
                          )}

                          <Field as="select" name="role_id" className="w-full p-2 border rounded-md">
                            <option value="">Select Role</option>
                            {roles &&
                              roles.map((role, index) =>
                                role ? (
                                  <option key={index} value={role.id || role.role_id}>
                                    {role.role || role.name}
                                  </option>
                                ) : null
                              )}
                          </Field>
                          {errors.role_id && touched.role_id && (
                            <div className="text-red-600 text-sm">{errors.role_id}</div>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
                        >
                          {editingUser ? "Update" : "Add"}
                        </button>
                      </Form>
                    )}
                  </Formik>
                  <button
                    className="mt-4 w-full text-red-600"
                    onClick={() => {
                      setUserModalOpen(false);
                      setEditingUser(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ROLE MANAGEMENT UI */}
        {activeTab === "roles" && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={handleOpenAddRoleModal}
              >
                <Plus size={20} /> Add Role
              </motion.button>
            </div>

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
            <td colSpan="4">Loading...</td>
          </tr>
        ) : selectedRolePermissions.length === 0 ? (
          <tr>
            <td colSpan="4">No roles found</td>
          </tr>
        ) : (
          selectedRolePermissions.map((roleItem, index) => (
            <tr key={roleItem.role_id} className="border-b hover:bg-gray-100">
              {/* 1) Display basic role info */}
              <td className="p-3">{roleItem.role}</td>
              <td className="p-3">{roleItem.company_id}</td>

              {/* 2) Display each permission */}
              <td className="p-3">
                {roleItem.permissions && roleItem.permissions.length > 0 ? (
                  roleItem.permissions.map((perm, i) => (
                    <div key={perm.id}>
                      <strong>{perm.menu.toUpperCase()}:</strong>{" "}
                      V:{perm.view} A:{perm.add} E:{perm.edit} D:{perm.delete}
                    </div>
                  ))
                ) : (
                  <div>No permissions assigned</div>
                )}
              </td>

              {/* 3) Actions (Edit/Delete) */}
              <td className="p-3">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                  onClick={() => handleOpenEditRoleModal(roleItem)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteRole(roleItem.role_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
                </table>
              </div>
            </div>

            {/* Add/Edit Role Modal */}
            {roleModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                  <h3 className="text-lg font-bold mb-4">
                    {editingRole ? "Edit Role" : "Add Role"}
                  </h3>
                  <Formik
                    initialValues={getRoleInitialFormValues()}
                    validationSchema={roleValidationSchema}
                    onSubmit={handleSubmitRole}
                    enableReinitialize
                  >
                    {({ values, setFieldValue, errors, touched }) => (
                      <Form>
                        <div className="grid grid-cols-2 gap-4">
                          {/* If editing, display read-only Role name */}
                          {editingRole ? (
                            <div>
                              <label>Role</label>
                              <input
                                type="text"
                                value={editingRole.role || editingRole.name}
                                disabled
                                className="w-full p-2 border rounded-md"
                              />
                            </div>
                          ) : (
                            <div>
                              <label>Role ID</label>
                              <Field
                                as="select"
                                name="role_id"
                                className="w-full p-2 border rounded-md"
                              >
                                <option value="">Select Role</option>
                                {roles &&
                                  roles.map((role, idx) =>
                                    role ? (
                                      <option
                                        key={idx}
                                        value={role.id || role.role_id}
                                      >
                                        {role.role || role.name}
                                      </option>
                                    ) : null
                                  )}
                              </Field>
                              {errors.role_id && touched.role_id && (
                                <div className="text-red-600 text-sm">
                                  {errors.role_id}
                                </div>
                              )}
                            </div>
                          )}
                          {/* If editing, display read-only Company name */}
                          {editingRole ? (
                            <div>
                              <label>Company</label>
                              <input
                                type="text"
                                value={company?.name}
                                disabled
                                className="w-full p-2 border rounded-md"
                              />
                            </div>
                          ) : (
                            <div>
                              <label>Company ID</label>
                              <Field
                                as="select"
                                name="company_id"
                                className="w-full p-2 border rounded-md"
                                disabled={!!editingRole}
                              >
                                {company && (
                                  <option value={company.id}>{company.name}</option>
                                )}
                              </Field>
                              {errors.company_id && touched.company_id && (
                                <div className="text-red-600 text-sm">
                                  {errors.company_id}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Permission Table */}
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
                  <tr key={perm.menu || index}>
                    <td>{(perm.menu || "N/A").toUpperCase()}</td>
                    {["view", "add", "edit", "delete"].map((action) => (
                      <td key={action}>
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
                      setRoleModalOpen(false);
                      setEditingRole(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  export default IndexUser;
