import { saveFinalData, setMissingFields } from "./../../../../store/slices/profileFormsSlice";
import { toast } from "react-toastify";

export const processFinalData = (dispatch) => {
  // ✅ Fetch data from localStorage
  const storedData = JSON.parse(localStorage.getItem("forms")) || {};

  // ✅ Required fields (excluding `internshipDetails`)
  const requiredFields = [
    "personalInformation",
    "certificationDetails",
    "contactDetails",
    "professionalDetails",
    "projectDetails",
    "researchPapers",
    "trainingDetails",
    "otherDetails",
    "educationDetails",
  ];

  let missingFields = [];

  // ✅ Check for missing required fields
  requiredFields.forEach((field) => {
    if (!storedData[field] || (Array.isArray(storedData[field]) && storedData[field].length === 0)) {
      missingFields.push(field);
    }
  });

  // ✅ Ensure `internshipDetails` exists (set empty if missing)
  if (!storedData["internshipDetails"] || !Array.isArray(storedData["internshipDetails"])) {
    storedData["internshipDetails"] = [];
  }

  // ✅ If required fields are missing, warn the user using `toast`
  if (missingFields.length > 0) {
    dispatch(setMissingFields(missingFields));

    // ✅ Show toast warning for each missing field
    missingFields.forEach((field) => {
      toast.error(`Please fill in ${field.replace(/([A-Z])/g, " $1")}`);
    });

    return false; // Stop execution if required fields are missing
  }

  // ✅ Save the final data in Redux store (including empty `internshipDetails`)
  const finalData = requiredFields.reduce((acc, field) => {
    acc[field] = storedData[field];
    return acc;
  }, {});

  finalData["internshipDetails"] = storedData["internshipDetails"]; // Ensure it's always present

  dispatch(saveFinalData(finalData));

  // ✅ Show success toast
  toast.success("Final data saved successfully!");
  return true;
};
