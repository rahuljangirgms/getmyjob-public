import React, { useEffect, useState } from "react";
import ModalOpenerForms from "../../../components/JobSeekerComponents/Modal_Opener_Forms/ModalOpenerForms";
import ExperienceDetailsDisplay from "./../../../components/JobSeekerComponents/DataDisplayBox/ExperienceDetailsDisplay";
import ProfessionalExperienceModal from "./../../../components/JobSeekerComponents/ModalForms/ProfessionalExperienceModal";
import { FaSave } from "react-icons/fa";
import {
  finalizeProfessionalDetails,
  // deleteTempProfessionalExperience,
  deleteFinalProfessionalExperience,
  // editTempProfessionalExperience,
  editFinalProfessionalExperience,
} from "./../../../store/slices/profileFormsSlice";

import {
  deleteTempProfessionalExperience,
  editTempProfessionalExperience,
} from "./../../../store/slices/jobSeeker/Profile_Form/professionalExpSlice";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext
import {
  addProfessionalExperienceRequest,
  getProfessionalExperienceRequest,
  updateProfessionalExperienceRequest,
  deleteProfessionalExperienceRequest,
  clearMessage,
} from "./../../../store/slices/jobSeeker/Profile_Form/professionalExpSlice";
import Loader from "./../../../components/JobSeekerComponents/ReusableComponents/Loader";

function ProfessionalDetailForm() {
  // Professional Experience Form State

  const { data, status, loading, message } = useSelector(
    (state) => state.profExpForm
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFilledForm, setHasFilledForm] = useState(false); // Track first-time form filling

  const [editIndex, setEditIndex] = useState(null);
  const [finalEditIndex,setFinalEditIndex] = useState(null);
  const [isEditingTemp, setIsEditingTemp] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(null);

  const [isSaved, setIsSaved] = useState(false);

  const { setIsFormDirty } = useOutletContext();

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (message && status) {
      // ✅ Ensure status is true to avoid duplicate toast
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-50",
      });

      // ✅ Clear the message after displaying Toast
      dispatch(clearMessage());
    }
  }, [message]); // ✅ Only runs when `message` changes

  useEffect(() => {
    setIsFormDirty(isDirty);
  }, [isDirty, setIsFormDirty]);

  const tempSavedList = useSelector(
    (state) => state.profExpForm.tempProfessionalDetails || []
  );


  const parsedExperienceData = data?.experience
    ? JSON.parse(data.experience)
    : [];

  console.log("API Data: ", data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessionalExperienceRequest());
  }, [dispatch]);

  useEffect(() => {
    // If there is any saved experience, mark form as filled
    if (tempSavedList.length > 0 || parsedExperienceData.length > 0) {
      setHasFilledForm(true);
      setIsSaved(true);
    }
    if(parsedExperienceData.length > 0){
      setIsDirty(false);
    }
    if (tempSavedList.length > 0) {
      setIsDirty(true);
      setIsSaved(true);
    }
  }, [tempSavedList, parsedExperienceData]);

  const handleExperienceSubmit = (data) => {
    setIsModalOpen(false); // Close modal after submission
    setHasFilledForm(true); // Mark as filled when first experience is added
  };

  const handleTempDelete = (index) => {
    dispatch(deleteTempProfessionalExperience(index));
  };

  const handleFinalListDelete = (index) => {
    dispatch(deleteProfessionalExperienceRequest(index));
  };

  const handleEdit = (index, expId, isTemp) => {
    setIsEditingTemp(isTemp);
    setEditIndex(index);
    setFinalEditIndex(expId);
    const selectedExperience = isTemp
      ? tempSavedList[index]
      : parsedExperienceData[index];

    console.log("Editing Experience:", selectedExperience); // Debugging Log

    setInitialFormValues({ ...selectedExperience }); // Ensure values are copied
    setIsModalOpen(true);
    setIsDirty(true);
  };

  const handleSaveEdit = (updatedData) => {
    if (isEditingTemp) {
      dispatch(
        editTempProfessionalExperience({ index: editIndex, updatedData })
      );
      setIsDirty(false);
    } else {
      dispatch(
        updateProfessionalExperienceRequest({finalEditIndex,updatedData})
      );
      setIsDirty(false);
    }

    setIsModalOpen(false);
    setIsDirty(false);
    setEditIndex(null);
    setIsEditingTemp(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto w-full">
          {/* Show 'Add Professional Experience' Button if No Experience Exists */}
          {!hasFilledForm && (
            <div className="flex justify-center my-4">
              <ModalOpenerForms
                title={"Add Professional Experience"}
                modalType={"experience"}
                onSubmit={handleExperienceSubmit}
              />
            </div>
          )}

          {/* Show 'Save' Button Only When tempSavedList Has Data */}
          {tempSavedList.length > 0 && isSaved && (
            <div className="flex justify-end">
              <button
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 mb-4"
                onClick={() => {
                  // dispatch(finalizeProfessionalDetails());
                  dispatch(addProfessionalExperienceRequest(tempSavedList));
                  setIsSaved(false);
                  setHasFilledForm(true); // Ensure UI remains updated
                  setIsDirty(false);
                }}
              >
                <FaSave />
                Save
              </button>
            </div>
          )}

          {/* Show 'Add Another Experience' Button if any experience exists */}
          {hasFilledForm && (
            <div className="flex justify-end my-2">
              <button
                onClick={() => {
                  setInitialFormValues(null); // ✅ Clear previous form values
                  setEditIndex(null); // ✅ Ensure we're not editing
                  setIsModalOpen(true);
                }}
                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add Another Experience
              </button>
            </div>
          )}

          {/* Display Experiences from tempSavedList */}
          {tempSavedList.length > 0 &&
            tempSavedList.map((experience, index) => (
              <ExperienceDetailsDisplay
                key={index}
                title={experience.organisation}
                data={experience}
                onDelete={() => handleTempDelete(index)}
                onEdit={() => handleEdit(index, index, true)}
              />
            ))}

          {/* Display Experiences from finalSavedList (After Saving) */}
          {parsedExperienceData.length > 0 &&
            parsedExperienceData.map((experience, index) => (
              <ExperienceDetailsDisplay
                key={experience.exp_id}
                title={experience.organisation}
                data={experience}
                onDelete={() => handleFinalListDelete(experience.exp_id)}
                onEdit={() => handleEdit(index, experience.exp_id,false)}
              />
            ))}

          {/* Show Modal When Triggered */}
          {isModalOpen && (
            <ProfessionalExperienceModal
              onClose={() => setIsModalOpen(false)}
              onSubmit={
                editIndex !== null ? handleSaveEdit : handleExperienceSubmit
              }
              initialValues={
                initialFormValues || {
                  // Ensure fallback values
                  designation: "",
                  organisation: "",
                  industrySector: "",
                  department: "",
                  ctc: "",
                  from: "",
                  to: "",
                  currentlyWorking: false,
                  country: "",
                  state: "",
                  city: "",
                  skills: [],
                  description: "",
                }
              }
              editIndex={editIndex} // ✅ Pass editIndex
              isEditing={editIndex !== null} // ✅ Pass if editing
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ProfessionalDetailForm;
