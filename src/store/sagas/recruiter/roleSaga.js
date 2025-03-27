  import { call, put, select, takeLatest } from 'redux-saga/effects';
  import axios from 'axios';
import {  // fetchRolesRequest,
    fetchRolesSuccess,
    fetchRolesFailure,
    addRolePermissionRequest,
    addRolePermissionSuccess,
    addRolePermissionFailure,
    updateRolePermissionRequest,
    updateRolePermissionSuccess,
    updateRolePermissionFailure,
    deleteRolePermissionRequest,
    deleteRolePermissionSuccess,
    deleteRolePermissionFailure,
    viewRolePermissionRequest,
    viewRolePermissionSuccess,
    viewRolePermissionFailure,
    fetchRolesRequest, } from '../../slices/recruiter/roleSlice';





  const BASE_URL = 'https://recruitment.getmysolutions.in/api/v1/recruiter';
  const USER_BASE_URL = 'https://recruitment.getmysolutions.in/api/v1';



  function* fetchRolesSaga() {
    try {
      console.log('[fetchRolesSaga] Invoked');
      const token = yield select((state) => state.auth.token);
      console.log('[fetchRolesSaga] Token:', token);
  
      const response = yield call(
        axios.post,
        `${USER_BASE_URL}/get_roles`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Suppose the backend returns: { status: true, data: [...] }
     
      // Make sure we have an array
      const rolesData = Array.isArray(response.data.data) ? response.data.data : [];
      console.log('[fetchRolesSaga] rolesData:', rolesData);
  
      yield put(fetchRolesSuccess(rolesData));
    } catch (error) {
      console.error('[fetchRolesSaga] Error:', error.message);
      yield put(fetchRolesFailure(error.message));
    }
  }

// 6. Add Role Permission -> POST /add_role_permission
function* addRoleSaga(action) {
  try {
    console.log('[addRoleSaga] Invoked with payload:', action.payload);
    const token = yield select((state) => state.auth.token);
    console.log('[addRoleSaga] Token:', token);

    const response = yield call(
      axios.post,
      `${BASE_URL}/add_role_permission`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('[addRoleSaga] Response:', response.data);
    yield put(addRolePermissionSuccess(response.data.data));
  } catch (error) {
    console.error('[addRoleSaga] Error:', error.message);
    yield put(addRolePermissionFailure(error.message));
  }
}

// 7. Update Role Permission -> POST /update_role_permission
function* updateRoleSaga(action) {
  try {
    console.log('[updateRoleSaga] Invoked with payload:', action.payload);
    const token = yield select((state) => state.auth.token);
    console.log('[updateRoleSaga] Token:', token);

    const response = yield call(
      axios.post,
      `${BASE_URL}/update_role_permission`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('[updateRoleSaga] Response:', response.data);
    yield put(updateRolePermissionSuccess(response.data.data));
  } catch (error) {
    console.error('[updateRoleSaga] Error:', error.message);
    yield put(updateRolePermissionFailure(error.message));
  }
}

// 8. Delete Role Permission -> POST /delete_role_permission
function* deleteRoleSaga(action) {
  try {
    console.log('[deleteRoleSaga] Invoked with payload:', action.payload);
    const token = yield select((state) => state.auth.token);
    console.log('[deleteRoleSaga] Token:', token);

    // Destructure role_id and company_id from the action payload
    const { role_id, company_id } = action.payload;

    const response = yield call(
      axios.post,
      `${BASE_URL}/delete_role_permission`,
      { role_id, company_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('[deleteRoleSaga] Response:', response.data);
    yield put(deleteRolePermissionSuccess({ role_id, company_id }));
  } catch (error) {
    console.error('[deleteRoleSaga] Error:', error.message);
    yield put(deleteRolePermissionFailure(error.message));
  }
}
// 9. View Role Permission -> GET /view_role_permission
function* viewRoleSaga(action) {
  try {
    console.log('[viewRoleSaga] Invoked');
   
    const token = yield select((state) => state.auth.token);
    console.log('[viewRoleSaga] Token:', token);
    
    const response = yield call(
      axios.get,
      `${BASE_URL}/view_role_permission`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Log the entire response object
    console.log('[viewRoleSaga] Full response:', response);

    // Log the `data` portion in a more readable way:
    console.log('[viewRoleSaga] Response data:', JSON.stringify(response.data, null, 2));

    // Then you can also specifically log the array of role-permission objects:
    console.log('[viewRoleSaga] response.data.data:', response.data.data);

    // Finally, dispatch success action with the data
    yield put(viewRolePermissionSuccess(response.data.data));
  } catch (error) {
    console.error('[viewRoleSaga] Error:', error.message);
    yield put(viewRolePermissionFailure(error.message));
  }
}


export function* watchRoleSagas(){
    yield takeLatest(fetchRolesRequest.type, fetchRolesSaga);
    yield takeLatest(addRolePermissionRequest.type, addRoleSaga);
    yield takeLatest(updateRolePermissionRequest.type, updateRoleSaga);
    yield takeLatest(deleteRolePermissionRequest.type, deleteRoleSaga);
    yield takeLatest(viewRolePermissionRequest.type, viewRoleSaga);
}