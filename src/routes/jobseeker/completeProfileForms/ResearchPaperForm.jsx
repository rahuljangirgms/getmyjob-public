import React, { useEffect, useState } from "react";
import ModalOpenerForms from "../../../components/JobSeekerComponents/Modal_Opener_Forms/ModalOpenerForms";
import ExperienceDetailsDisplay from "./../../../components/JobSeekerComponents/DataDisplayBox/ExperienceDetailsDisplay";
import ResearchPaperModal from "./../../../components/JobSeekerComponents/ModalForms/ResearchPaperModal";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  // deleteTempResearchPaper,
  deleteFinalResearchPaper,
  // editTempResearchPaper,
  editFinalResearchPaper,
  finalizeResearchPapers,
  saveTempResearchPaper,
} from "./../../../store/slices/profileFormsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext
import {
  getResearchPaperRequest,
  addResearchPaperRequest,
  updateResearchPaperRequest,
  editTempResearchPaper,
  deleteTempResearchPaper,
  deleteResearchPaperRequest,
  clearMessage,
} from "./../../../store/slices/jobSeeker/Profile_Form/researchPaperSlice";
import Loader from "./../../../components/JobSeekerComponents/ReusableComponents/Loader";

function ResearchPaperForm() {
  const { data, message, loading, status } = useSelector(
    (state) => state.researchPaperForm
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFilledForm, setHasFilledForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [finalEditIndex, setFinalEditIndex] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isEditingTemp, setIsEditingTemp] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const { setIsFormDirty } = useOutletContext();

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsFormDirty(isDirty);
  }, [isDirty, setIsFormDirty]);

  const tempSavedList = useSelector(
    (state) => state.researchPaperForm.tempResearchPaperDetails || []
  );

  const dispatch = useDispatch();

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
    dispatch(getResearchPaperRequest());
  }, [dispatch]);

  const parsedPaperData = data?.publications ? JSON.parse(data.publications) : [];

  // console.log("API DATA:", parsedPaperData);

  useEffect(() => {
    if (tempSavedList.length > 0 || parsedPaperData.length > 0) {
      setHasFilledForm(true);
    }

    if (parsedPaperData.length > 0) {
      setIsDirty(false);
    }

    if (tempSavedList.length > 0) {
      setIsDirty(true);
    }
  }, [tempSavedList, parsedPaperData]);

  const handlePaperSubmit = (data) => {
    setIsModalOpen(false);
    setHasFilledForm(true);
  };
  const handleTempDelete = (index) => {
    dispatch(deleteTempResearchPaper(index));
  };

  const handleFinalDelete = (index) => {
    dispatch(deleteResearchPaperRequest(index));
  };

  const handleEdit = (index, paperId, isTemp) => {
    setIsEditingTemp(isTemp);
    setFinalEditIndex(paperId);
    setEditIndex(index);
    const selectedPaper = isTemp
      ? tempSavedList[index]
      : parsedPaperData[index];
    setInitialFormValues({ ...selectedPaper });
    setIsModalOpen(true);
    setIsDirty(true);
  };

  const handleSaveEdit = (updatedData) => {
    if (isEditingTemp) {
      dispatch(editTempResearchPaper({ index: editIndex, updatedData }));
    } else {
      dispatch(updateResearchPaperRequest({ finalEditIndex, updatedData }));
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
          {!hasFilledForm && (
            <ModalOpenerForms
              title={"Add Research / White Paper"}
              modalType={"paper"}
              onSubmit={handlePaperSubmit}
            />
          )}

          {tempSavedList.length > 0 && isSaved && (
            <div className="flex justify-end">
              <button
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 mb-4"
                onClick={() => {
                  dispatch(addResearchPaperRequest(tempSavedList));
                  setHasFilledForm(true);
                  setIsDirty(false);
                  setIsSaved(true);
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
                  setInitialFormValues(null);
                  setIsModalOpen(true);
                }}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add Another Paper
              </button>
            </div>
          )}

          {tempSavedList.length > 0 &&
            tempSavedList.map((paper, index) => (
              <ExperienceDetailsDisplay
                key={index}
                title={paper.name}
                data={paper}
                onDelete={() => handleTempDelete(index)}
                onEdit={() => handleEdit(index,index, true)}
              />
            ))}

          {parsedPaperData.length > 0 &&
            parsedPaperData.map((paper, index) => (
              <ExperienceDetailsDisplay
                key={paper.publication_id}
                title={paper.name}
                data={paper}
                onDelete={() => handleFinalDelete(paper.publication_id)}
                onEdit={() => handleEdit(index,paper.publication_id, false)}
              />
            ))}

          {isModalOpen && (
            <ResearchPaperModal
              onClose={() => setIsModalOpen(false)}
              onSubmit={editIndex !== null ? handleSaveEdit : handlePaperSubmit}
              initialValues={
                initialFormValues || {
                  name: "",
                  publicationName: "",
                  publicationDate: "",
                  mentor: "",
                  authorsCount: "",
                  type: "",
                  skills: [],
                  description: "",
                }
              }
              isEditing={editIndex !== null}
              isEditingTemp={isEditingTemp}
              editIndex={editIndex}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ResearchPaperForm;
