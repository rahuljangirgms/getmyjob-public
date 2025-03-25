  import { call, put, select, takeLatest } from 'redux-saga/effects';
  import axios from 'axios';
  import {
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
  } from '../../slices/recruiter/userSlice';

  // Base URL
  const USER_BASE_URL = 'https://recruitment.getmysolutions.in/api/v1';
  // const BASE_URL = 'https://recruitment.getmysolutions.in/api/v1/recruiter';

  // -------------------------
  //  WORKER SAGAS
  // -------------------------

  // 1. Fetch Users -> view_user (POST)
  function* fetchUsersSaga() {
    try {
      // If your endpoint requires a body, pass it as second argument, e.g. {}
      const token = yield select((state) => state.auth.token);
      const response = yield call(axios.post, `${USER_BASE_URL}/view_user`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("users=====>",response.data.users)
      yield put(fetchUsersSuccess(response.data.users));
    } catch (error) {
      yield put(fetchUsersFailure(error.message));
    }
  }

  // 2. Add User -> add_user (POST)
  function* addUserSaga(action) {
    try {
      const token = yield select((state) => state.auth.token);
      const response = yield call(
        axios.post,
        `${USER_BASE_URL}/add_user`,
        action.payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      yield put(addUserSuccess(response.data));
    } catch (error) {
      yield put(addUserFailure(error.message));
    }
  }

  // 3. Update User -> update_user (POST)
  function* updateUserSaga(action) {
    try {
      // action.payload should contain { id, name, company_id, email, mobile, password, role_id }
      const token = yield select((state) => state.auth.token);
      const response = yield call(
        axios.post,
        `${USER_BASE_URL}/update_user`,
        action.payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      yield put(updateUserSuccess(response.data));
    } catch (error) {
      yield put(updateUserFailure(error.message));
    }
  }

  // 4. Delete User -> delete_user (POST)
  function* deleteUserSaga(action) {
    try {
      // action.payload is the user ID
      const token = yield select((state) => state.auth.token);
      const response = yield call(
        axios.post,
        `${USER_BASE_URL}/delete_user`,
        { id: action.payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      
      );
  console.log("delete user ",response)

      // You might not need the response data, but if the API returns success message, you can handle it
      // We'll just dispatch deleteUserSuccess with the user ID to remove from store
      yield put(deleteUserSuccess(action.payload));
    } catch (error) {
      yield put(deleteUserFailure(error.message));
    }
  }

//   function* fetchRolesSaga() {
//     try {
//       console.log('[fetchRolesSaga] Invoked');
//       const token = yield select((state) => state.auth.token);
//       console.log('[fetchRolesSaga] Token:', token);
  
//       const response = yield call(
//         axios.post,
//         `${USER_BASE_URL}/get_roles`,
//         {}, // empty body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       // Suppose the backend returns: { status: true, data: [...] }
     
//       // Make sure we have an array
//       const rolesData = Array.isArray(response.data.data) ? response.data.data : [];
//       console.log('[fetchRolesSaga] rolesData:', rolesData);
  
//       yield put(fetchRolesSuccess(rolesData));
//     } catch (error) {
//       console.error('[fetchRolesSaga] Error:', error.message);
//       yield put(fetchRolesFailure(error.message));
//     }
//   }

// // 6. Add Role Permission -> POST /add_role_permission
// function* addRoleSaga(action) {
//   try {
//     console.log('[addRoleSaga] Invoked with payload:', action.payload);
//     const token = yield select((state) => state.auth.token);
//     console.log('[addRoleSaga] Token:', token);

//     const response = yield call(
//       axios.post,
//       `${BASE_URL}/add_role_permission`,
//       action.payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log('[addRoleSaga] Response:', response.data);
//     yield put(addRolePermissionSuccess(response.data.data));
//   } catch (error) {
//     console.error('[addRoleSaga] Error:', error.message);
//     yield put(addRolePermissionFailure(error.message));
//   }
// }

// // 7. Update Role Permission -> POST /update_role_permission
// function* updateRoleSaga(action) {
//   try {
//     console.log('[updateRoleSaga] Invoked with payload:', action.payload);
//     const token = yield select((state) => state.auth.token);
//     console.log('[updateRoleSaga] Token:', token);

//     const response = yield call(
//       axios.post,
//       `${BASE_URL}/update_role_permission`,
//       action.payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log('[updateRoleSaga] Response:', response.data);
//     yield put(updateRolePermissionSuccess(response.data.data));
//   } catch (error) {
//     console.error('[updateRoleSaga] Error:', error.message);
//     yield put(updateRolePermissionFailure(error.message));
//   }
// }

// // 8. Delete Role Permission -> POST /delete_role_permission
// function* deleteRoleSaga(action) {
//   try {
//     console.log('[deleteRoleSaga] Invoked with role ID:', action.payload);
//     const token = yield select((state) => state.auth.token);
//     console.log('[deleteRoleSaga] Token:', token);

//     const response = yield call(
//       axios.post,
//       `${BASE_URL}/delete_role_permission`,
//       { role_id: action.payload },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log('[deleteRoleSaga] Response:', response.data);
//     yield put(deleteRolePermissionSuccess(action.payload));
//   } catch (error) {
//     console.error('[deleteRoleSaga] Error:', error.message);
//     yield put(deleteRolePermissionFailure(error.message));
//   }
// }

// // 9. View Role Permission -> GET /view_role_permission?company_id=XX&role_id=YY
// function* viewRoleSaga(action) {
//   try {
//     console.log('[viewRoleSaga] Invoked');
//     // Get the token from auth state
//     // const { role_id, company_id } = action.payload;
//     const token = yield select((state) => state.auth.token);
//     console.log('[viewRoleSaga] Token:', token);
    
//     // Get the company from the companies slice
//     // const company = yield select((state) => state.companies.company);
//     // const company_id = company ? company.id : "";
    
//     // Get roles from the users slice
//     // const roles = yield select((state) => state.users.roles);
//     // For example, if you have a selected role id in your state you can use that:
//     // const role_id = yield select((state) => state.users.selectedRoleId);
//     // Otherwise, as a fallback, use the first role's id (if any)
//     // const role_id = (roles && roles.length > 0) ? roles[0].id : "";
//     // 
//     // Log for debugging
//     // console.log('[viewRoleSaga] Using company_id:', company_id, 'and role_id:', role_id);
    
//     // Make the GET request with the company_id and role_id as query parameters
//     const response = yield call(
//       axios.get,
//       `${BASE_URL}/view_role_permission`,
//       {
      
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
    
//     console.log('[viewRoleSaga] Response:', response.data.data);
//     yield put(viewRolePermissionSuccess(response.data.data));
//   } catch (error) {
//     console.error('[viewRoleSaga] Error:', error.message);
//     yield put(viewRolePermissionFailure(error.message));
//   }
// }
  // -------------------------
  //  WATCHER SAGA
  // -------------------------
  export function* watchUserSagas() {
    yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
    yield takeLatest(addUserRequest.type, addUserSaga);
    yield takeLatest(updateUserRequest.type, updateUserSaga);
    yield takeLatest(deleteUserRequest.type, deleteUserSaga);
    // yield takeLatest(fetchRolesRequest.type, fetchRolesSaga);
    // yield takeLatest(addRolePermissionRequest.type, addRoleSaga);
    // yield takeLatest(updateRolePermissionRequest.type, updateRoleSaga);
    // yield takeLatest(deleteRolePermissionRequest.type, deleteRoleSaga);
    // yield takeLatest(viewRolePermissionRequest.type, viewRoleSaga);
  }
