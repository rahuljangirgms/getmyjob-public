import React, { useEffect, useState } from "react";
import ModalOpenerForms from "../../../components/JobSeekerComponents/Modal_Opener_Forms/ModalOpenerForms";
import ExperienceDetailsDisplay from "./../../../components/JobSeekerComponents/DataDisplayBox/ExperienceDetailsDisplay";
import InternshipExperienceModal from "./../../../components/JobSeekerComponents/ModalForms/InternshipExperienceModal";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  // deleteTempInternshipExperience,
  deleteFinalInternshipExperience,
  // editTempInternshipExperience,
  editFinalInternshipExperience,
  finalizeInternshipDetails,
} from "./../../../store/slices/profileFormsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext
import {deleteTempinternshipExperience,editTempinternshipExperience, getinternshipExperienceRequest, updateinternshipExperienceRequest, clearMessage, addinternshipExperienceRequest, deleteinternshipExperienceRequest} from './../../../store/slices/jobSeeker/Profile_Form/internshipExpSlice';
import Loader from './../../../components/JobSeekerComponents/ReusableComponents/Loader';



function InternshipDetailForm() {

  // Internship Experience Form State
  const { data, status, loading, message } = useSelector(
      (state) => state.intershipExpForm
    );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFilledForm, setHasFilledForm] = useState(false); // Track first-time form filling
  const [editIndex, setEditIndex] = useState(null);
  const [isEditingTemp, setIsEditingTemp] = useState(false);
  const [finalEditIndex,setFinalEditIndex] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  
  const [initialFormValues, setInitialFormValues] = useState(null);

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
    (state) => state.intershipExpForm.tempInternshipDetails || []
  );

  const finalSavedList = useSelector(
    (state) => state.profileForms.internshipDetails || []
  );

  const parsedExperienceData = data?.internship
  ? JSON.parse(data.internship)
  : [];

  console.log("API Data: ", parsedExperienceData);

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getinternshipExperienceRequest());
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
    if (tempSavedList.length > 0){
      setIsDirty(true);
      setIsSaved(true);
    }
  }, [tempSavedList, parsedExperienceData]);

  const handleInternshipSubmit = (data) => {
    setIsModalOpen(false);
    setHasFilledForm(true);
  };

  const handleTempDelete = (index) => {
    dispatch(deleteTempinternshipExperience(index));
  };

  const handleFinalDelete = (index) => {
    dispatch(deleteinternshipExperienceRequest(index));
  };

  const handleEdit = (index, expId, isTemp) => {
    setIsEditingTemp(isTemp);
    setEditIndex(index);
    setFinalEditIndex(expId);
    const selectedInternship = isTemp
      ? tempSavedList[index]
      : parsedExperienceData[index];
    setInitialFormValues({ ...selectedInternship });
    setIsModalOpen(true);
    setIsDirty(true);
  };

  const handleSaveEdit = (updatedData) => {
    if (isEditingTemp) {
      dispatch(editTempinternshipExperience({ index: editIndex, updatedData }));
      setIsDirty(false);
    } else {
      dispatch(
        updateinternshipExperienceRequest({ finalEditIndex, updatedData })
      );
      setIsDirty(false);
    }
    setIsDirty(false);
    setIsModalOpen(false);
    setEditIndex(null);
    setIsEditingTemp(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <ToastContainer />
    {loading ? <Loader/> : 
      <div className="mx-auto w-full">
      {!hasFilledForm && (
        <ModalOpenerForms
          title={"Add Internship Experience"}
          modalType={"internship"}
          onSubmit={handleInternshipSubmit}
        />
      )}

      {tempSavedList.length > 0 &&  isSaved && (
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 mb-4"
            onClick={() => {
              dispatch(addinternshipExperienceRequest(tempSavedList));
              setHasFilledForm(true);
              setIsDirty(false);
            }}
          >
            <FaSave />
            Save
          </button>
        </div>
      )}

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
            Add Another Internship
          </button>
        </div>
      )}

      {tempSavedList.length > 0 &&
        tempSavedList.map((internship, index) => (
          <ExperienceDetailsDisplay
            key={index}
            title={internship.organisation}
            data={internship}
            onDelete={() => handleTempDelete(index)}
            onEdit={() => handleEdit(index,index, true)}
          />
        ))}

      {parsedExperienceData.length > 0 &&
        parsedExperienceData.map((internship, index) => (
          <ExperienceDetailsDisplay
            key={internship.internship_id}
            title={internship.organisation}
            data={internship}
            onDelete={() => handleFinalDelete(internship.internship_id)}
            onEdit={() => handleEdit(index, internship.internship_id,false)}
          />
        ))}

      {isModalOpen && (
        <InternshipExperienceModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={
            editIndex !== null ? handleSaveEdit : handleInternshipSubmit
          }
          initialValues={
            initialFormValues || {
              title: "",
              organisation: "",
              industrySector: "",
              department: "",
              stipend: "",
              from: "",
              to: "",
              currentlyWorking: false,
              country: "",
              state: "",
              city: "",
              skills: "",
              description: "",
            }
          }
          editIndex={editIndex} // ✅ Pass editIndex
          isEditingTemp={isEditingTemp}
          isEditing={editIndex !== null} // ✅ Pass if editing
        />
      )}
    </div>
    }
    </div>
  );
}

export default InternshipDetailForm;
