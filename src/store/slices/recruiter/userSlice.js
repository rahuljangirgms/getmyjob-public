import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  // roles: [],
  // selectedRolePermissions: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // --- FETCH USERS ---
    fetchUsersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // --- ADD USER ---
    addUserRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess(state, action) {
      // The API might return the newly created user or just a success message
      // If it returns the user object, you can push it into state.users
      state.users.push(action.payload);
      state.loading = false;
    },
    addUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // --- UPDATE USER ---
    updateUserRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action) {
      // The API might return the updated user
      const updatedUser = action.payload;
      const index = state.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
      state.loading = false;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // --- DELETE USER ---
    deleteUserRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state, action) {
      const deletedUserId = action.payload;
      state.users = state.users.filter((u) => u.id !== deletedUserId);
      state.loading = false;
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // --- FETCH ROLES ---
    // fetchRolesRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // fetchRolesSuccess(state, action) {
    //   state.roles = Array.isArray(action.payload) ? action.payload : [];
    //   state.loading = false;
    // },
    // fetchRolesFailure(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    //     // 1) ADD ROLE PERMISSION
    //     addRolePermissionRequest(state, action) {
    //       state.loading = true;
    //       state.error = null;
    //     },
    //     addRolePermissionSuccess(state, action) {
    //       // The API might return the newly created role or success message
    //       // If it returns the entire role object, push it into roles
    //       state.roles.push(action.payload);
    //       state.loading = false;
    //     },
    //     addRolePermissionFailure(state, action) {
    //       state.loading = false;
    //       state.error = action.payload;
    //     },
    
    //     // 2) UPDATE ROLE PERMISSION
    //     updateRolePermissionRequest(state, action) {
    //       state.loading = true;
    //       state.error = null;
    //     },
    //     updateRolePermissionSuccess(state, action) {
    //       // The API might return the updated role object
    //       const updatedRole = action.payload;
    //       const index = state.roles.findIndex((r) => r.role_id === updatedRole.role_id);
    //       if (index !== -1) {
    //         state.roles[index] = updatedRole;
    //       }
    //       state.loading = false;
    //     },
    //     updateRolePermissionFailure(state, action) {
    //       state.loading = false;
    //       state.error = action.payload;
    //     },
    
    //     // 3) DELETE ROLE PERMISSION
    //     deleteRolePermissionRequest(state, action) {
    //       state.loading = true;
    //       state.error = null;
    //     },
    //     deleteRolePermissionSuccess(state, action) {
    //       const deletedRoleId = action.payload;
    //       state.roles = state.roles.filter((r) => r.role_id !== deletedRoleId);
    //       state.loading = false;
    //     },
    //     deleteRolePermissionFailure(state, action) {
    //       state.loading = false;
    //       state.error = action.payload;
    //     },
    
    //     // 4) VIEW ROLE PERMISSION (if needed)
    //     viewRolePermissionRequest(state, action) {
    //       state.loading = true;
    //       state.error = null;
    //     },
    //     viewRolePermissionSuccess(state, action) {
    //       // The API might return a single role or array
    //       // For example, you might store the single role in a separate property or update roles
    //       // Adjust as needed for your data shape
    //       state.selectedRolePermissions = action.payload;
    //       state.loading = false;
    //     },
    //     viewRolePermissionFailure(state, action) {
    //       state.loading = false;
    //       state.error = action.payload;
    //     },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  // fetchRolesRequest,
  // fetchRolesSuccess,
  // fetchRolesFailure,
  // addRolePermissionRequest,
  // addRolePermissionSuccess,
  // addRolePermissionFailure,
  // updateRolePermissionRequest,
  // updateRolePermissionSuccess,
  // updateRolePermissionFailure,
  // deleteRolePermissionRequest,
  // deleteRolePermissionSuccess,
  // deleteRolePermissionFailure,
  // viewRolePermissionRequest,
  // viewRolePermissionSuccess,
  // viewRolePermissionFailure,

} = userSlice.actions;

export default userSlice.reducer;
