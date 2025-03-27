import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  selectedRolePermissions: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    fetchRolesRequest(state) {
      state.loading = true;
    },
    fetchRolesSuccess(state, action) {
      state.roles = action.payload;
      state.loading = false;
    },
    fetchRolesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addRolePermissionRequest(state) {
      state.loading = true;
    },
    addRolePermissionSuccess(state, action) {
      state.roles.push(action.payload);
      state.loading = false;
    },
    addRolePermissionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateRolePermissionRequest(state) {
      state.loading = true;
    },
    updateRolePermissionSuccess(state, action) {
      const index = state.roles.findIndex((r) => r.role_id === action.payload.role_id);
      if (index !== -1) state.roles[index] = action.payload;
      state.loading = false;
    },
    updateRolePermissionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteRolePermissionRequest(state) {
      state.loading = true;
    },
    deleteRolePermissionSuccess(state, action) {
      state.roles = state.roles.filter((r) => r.role_id !== action.payload);
      state.loading = false;
    },
    deleteRolePermissionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    viewRolePermissionRequest(state) {
      state.loading = true;
    },
    viewRolePermissionSuccess(state, action) {
      state.selectedRolePermissions = action.payload; // entire array
      state.loading = false;
    },
    viewRolePermissionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRolesRequest, fetchRolesSuccess, fetchRolesFailure,
  addRolePermissionRequest, addRolePermissionSuccess, addRolePermissionFailure,
  updateRolePermissionRequest, updateRolePermissionSuccess, updateRolePermissionFailure,
  deleteRolePermissionRequest, deleteRolePermissionSuccess, deleteRolePermissionFailure,
  viewRolePermissionRequest, viewRolePermissionSuccess, viewRolePermissionFailure,
} = roleSlice.actions;

export default roleSlice.reducer;
