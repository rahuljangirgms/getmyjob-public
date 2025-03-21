import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: "",
  status: false,
  error: null,
  uploadedDocuments: [],
};

const documentsSlice = createSlice({
  name: "attachment",
  initialState,
  reducers: {
    addDocumentRequest: (state) => {
      state.loading = true;
      state.message = "";
      state.status = false;
    },
    addDocumentSuccess: (state, action) => {
      const newDoc = action.payload?.data; // server response
      if (newDoc) {
        state.uploadedDocuments.push(newDoc); // do not push File object!
      }
      state.loading = false;
    },
    addDocumentFailure: (state, action) => {
      state.loading = false;
      state.status = false;
      state.message = action.payload.message || "Document upload failed.";
      state.error = action.payload;
    },
    getDocumentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDocumentSuccess: (state, action) => {
      state.loading = false;
      state.uploadedDocuments = action.payload.documents;
    },
    getDocumentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDocumentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteDocumentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteDocumentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },



    clearDocMessage: (state) => {
      state.message = "";
      state.status = false;
    },
  },
});

export const {
  addDocumentRequest,
  addDocumentSuccess,
  addDocumentFailure,
  getDocumentRequest,
  getDocumentFailure,
  getDocumentSuccess,
  deleteDocumentFailure,
  deleteDocumentRequest,
  deleteDocumentSuccess,
  clearDocMessage,
} = documentsSlice.actions;

export default documentsSlice.reducer;
