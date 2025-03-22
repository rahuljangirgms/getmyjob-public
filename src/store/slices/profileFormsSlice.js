import { createSlice } from "@reduxjs/toolkit";

// Load data from local storage if available
const loadFormsFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("forms");
    return serializedState
      ? JSON.parse(serializedState)
      : {
          personalInformation: {},
          contactDetails: {},
          educationalDetails: {
            degreeGraduation: {},
            twelfthDetails: {},
            tenthDetails: {},
          },
          attachmentDocuments: [],
          professionalDetails: [],
          tempProfessionalDetails: [], // New temporary storage
          jobPreference: {},
          projectDetails: {},
          publicationDetails: {},
          certificationDetails: {},
        };
  } catch (error) {
    console.error("Failed to load forms from local storage", error);
    return {
      personalInformation: {},
      contactDetails: {},
      educationalDetails: {
        degreeGraduation: {},
        twelfthDetails: {},
        tenthDetails: {},
      },
      attachmentDocuments: [],
      professionalDetails: [],
      tempProfessionalDetails: [], // New temporary storage
      jobPreference: {},
      projectDetails: {},
      publicationDetails: {},
      certificationDetails: {},
    };
  }
};

const initialState = loadFormsFromLocalStorage();

const profileFormsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    savePersonalInformation: (state, action) => {
      state.personalInformation = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },
    saveContactDetails: (state, action) => {
      state.contactDetails = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },


    // ---------------------- For Educational Details --------------------------------------------

    saveEducationalDetails: (state, action) => {
      state.educationalDetails = {
        ...state.educationalDetails,
        ...action.payload,
      };
      localStorage.setItem("forms", JSON.stringify(state));
    },
    deleteEducationalDetail: (state, action) => {
      const { title } = action.payload; // Receive title instead of educationType

      // Map title to the correct state key
      let educationType;
      if (title === "Degree / Graduation") {
        educationType = "degreeGraduation";
      } else if (title === "12th Standard (Higher / Senior Secondary)") {
        educationType = "twelfthDetails";
      } else if (title === "10th Standard (Secondary)") {
        educationType = "tenthDetails";
      }

      // If educationType is valid, reset it in the state
      if (educationType && state.educationalDetails[educationType]) {
        state.educationalDetails[educationType] = {}; // Reset to an empty object
        localStorage.setItem("forms", JSON.stringify(state));
      }
    },
    saveDegreeGraduation: (state, action) => {
      state.educationalDetails.degreeGraduation = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },
    saveTwelfthDetails: (state, action) => {
      state.educationalDetails.twelfthDetails = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },
    saveTenthDetails: (state, action) => {
      state.educationalDetails.tenthDetails = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },

    //------------------------ For Save Attachment Documents ------------------------

    saveAttachmentDocuments: (state, action) => {
      state.attachmentDocuments = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },

    // ---------------------------- For Professional Experience Form --------------------------------------------

    saveTempProfessionalDetails: (state, action) => {
      state.tempProfessionalDetails.push(action.payload);
    },

    finalizeProfessionalDetails: (state) => {
      state.professionalDetails = [
        ...state.professionalDetails,
        ...state.tempProfessionalDetails,
      ];
      state.tempProfessionalDetails = []; // Clear temp array after saving
      localStorage.setItem("forms", JSON.stringify(state));
    },

    deleteTempProfessionalExperience: (state, action) => {
      const index = action.payload;
      state.tempProfessionalDetails = state.tempProfessionalDetails.filter(
        (_, i) => i !== index
      );
      localStorage.setItem("forms", JSON.stringify(state));
    },

    deleteFinalProfessionalExperience: (state, action) => {
      const index = action.payload;
      state.professionalDetails = state.professionalDetails.filter(
        (_, i) => i !== index
      );
      localStorage.setItem("forms", JSON.stringify(state));
    },

    saveProfessionalDetails: (state, action) => {
      state.professionalDetails = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },

    editTempProfessionalExperience: (state, action) => {
      const { index, updatedData } = action.payload;
      state.tempProfessionalDetails[index] = updatedData;
      localStorage.setItem("forms", JSON.stringify(state));
    },
    
    editFinalProfessionalExperience: (state, action) => {
      const { index, updatedData } = action.payload;
      state.professionalDetails[index] = updatedData;
      localStorage.setItem("forms", JSON.stringify(state));
    },

    //------------------------ For Job Prefference ---------------------------

    saveJobPreference: (state, action) => {
      state.jobPreference = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },

    //------------------------ For Job Project Details ---------------------------

    saveProjectDetails: (state, action) => {
      state.projectDetails = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },

    //------------------------ For Job Publication Details ---------------------------

    savePublicationDetails: (state, action) => {
      state.publicationDetails = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },

    //------------------------ For Job Certificaion Details ---------------------------

    saveCertificationDetails: (state, action) => {
      state.certificationDetails = action.payload;
      localStorage.setItem("forms", JSON.stringify(state));
    },


    clearAllForms: () => {
      localStorage.removeItem("forms");
      return {
        personalInformation: {},
        contactDetails: {},
        educationalDetails: {
          degreeGraduation: {},
          twelfthDetails: {},
          tenthDetails: {},
        },
        attachmentDocuments: {},
        tempProfessionalDetails: [],
        professionalDetails: {},
        jobPreference: {},
        projectDetails: {},
        publicationDetails: {},
        certificationDetails: {},
      };
    },
    removeAttachment: (state, action) => {
      state.attachmentDocuments = state.attachmentDocuments.filter(
        (_, index) => index !== action.payload
      );
      localStorage.setItem("forms", JSON.stringify(state));
    },
  },
});

export const {
  savePersonalInformation,
  saveContactDetails,
  saveEducationalDetails,
  saveDegreeGraduation,
  saveTwelfthDetails,
  saveTenthDetails,
  saveAttachmentDocuments,
  saveTempProfessionalDetails,
  finalizeProfessionalDetails,
  deleteTempProfessionalExperience,
  deleteFinalProfessionalExperience,
  editTempProfessionalExperience,
  editFinalProfessionalExperience,
  saveProfessionalDetails,
  saveJobPreference,
  saveProjectDetails,
  savePublicationDetails,
  saveCertificationDetails,
  clearAllForms,
  deleteEducationalDetail,
  removeAttachment,
} = profileFormsSlice.actions;

export default profileFormsSlice.reducer;
