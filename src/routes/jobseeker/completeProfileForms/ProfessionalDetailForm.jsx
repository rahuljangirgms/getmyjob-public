import React, { useEffect, useState } from "react";
import ModalOpenerForms from "./../../../components/JobSeekerComponents/ModalOpenerForms";
import ExperienceDetailsDisplay from "./../../../components/JobSeekerComponents/ExperienceDetailsDisplay";
import ProfessionalExperienceModal from "./../../../components/JobSeekerComponents/ProfessionalExperienceModal";
import { FaSave } from "react-icons/fa";
import {
  finalizeProfessionalDetails,
  deleteTempProfessionalExperience,
  deleteFinalProfessionalExperience,
  editTempProfessionalExperience,
  editFinalProfessionalExperience,
} from "./../../../store/slices/profileFormsSlice";
import { useDispatch, useSelector } from "react-redux";

function ProfessionalDetailForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFilledForm, setHasFilledForm] = useState(false); // Track first-time form filling

  const [editIndex, setEditIndex] = useState(null);
  const [isEditingTemp, setIsEditingTemp] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(null);

  const tempSavedList = useSelector(
    (state) => state.profileForms.tempProfessionalDetails || []
  );

  const finalSavedList = useSelector(
    (state) => state.profileForms.professionalDetails || []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // If there is any saved experience, mark form as filled
    if (tempSavedList.length > 0 || finalSavedList.length > 0) {
      setHasFilledForm(true);
    }
  }, [tempSavedList, finalSavedList]);

  const handleExperienceSubmit = (data) => {
    setIsModalOpen(false); // Close modal after submission
    setHasFilledForm(true); // Mark as filled when first experience is added
  };

  const handleTempDelete = (index) => {
    dispatch(deleteTempProfessionalExperience(index));
  };

  const handleFinalListDelete = (index) => {
    dispatch(deleteFinalProfessionalExperience(index));
  };

  const handleEdit = (index, isTemp) => {
    setIsEditingTemp(isTemp);
    setEditIndex(index);
    const selectedExperience = isTemp ? tempSavedList[index] : finalSavedList[index];
  
    console.log("Editing Experience:", selectedExperience); // Debugging Log
  
    setInitialFormValues({ ...selectedExperience }); // Ensure values are copied
    setIsModalOpen(true);
  }

  const handleSaveEdit = (updatedData) => {
    if (isEditingTemp) {
      dispatch(
        editTempProfessionalExperience({ index: editIndex, updatedData })
      );
    } else {
      dispatch(
        editFinalProfessionalExperience({ index: editIndex, updatedData })
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
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
        {tempSavedList.length > 0 && (
          <div className="flex justify-end">
            <button
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 mb-4"
              onClick={() => {
                dispatch(finalizeProfessionalDetails());
                setHasFilledForm(true); // Ensure UI remains updated
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
              onClick={() => setIsModalOpen(true)}
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
              onEdit={() => handleEdit(index, true)}
            />
          ))}

        {/* Display Experiences from finalSavedList (After Saving) */}
        {finalSavedList.length > 0 &&
          finalSavedList.map((experience, index) => (
            <ExperienceDetailsDisplay
              key={index}
              title={experience.organisation}
              data={experience}
              onDelete={() => handleFinalListDelete(index)}
              onEdit={() => handleEdit(index, false)}
            />
          ))}

        {/* Show Modal When Triggered */}
        {isModalOpen && (
  <ProfessionalExperienceModal
    onClose={() => setIsModalOpen(false)}
    onSubmit={editIndex !== null ? handleSaveEdit : handleExperienceSubmit}
    initialValues={initialFormValues || { // Ensure fallback values
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
    }}
  />
)}

      </div>
    </div>
  );
}

export default ProfessionalDetailForm;
