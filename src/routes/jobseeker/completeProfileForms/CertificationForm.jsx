import React, { useEffect, useState } from "react";
import ModalOpenerForms from "../../../components/JobSeekerComponents/Modal_Opener_Forms/ModalOpenerForms";
import ExperienceDetailsDisplay from "../../../components/JobSeekerComponents/DataDisplayBox/ExperienceDetailsDisplay";
import CertificationModal from "../../../components/JobSeekerComponents/ModalForms/CertificationModal";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  // deleteTempCertification,
  deleteFinalCertification,
  // editTempCertification,
  editFinalCertification,
  finalizeCertificationDetails,
  saveTempCertification,
} from "./../../../store/slices/profileFormsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext
import {getCertificationRequest, addCertificationRequest, updateCertificationRequest, deleteCertificationRequest, deleteTempCertification, editTempCertification, clearMessage} from './../../../store/slices/jobSeeker/Profile_Form/certificationSlice';

function CertificationForm() {

  // Certifications Form State
  const {status, message, loading, data} = useSelector((state) => state.certificationForm);

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

  const tempCertificationList = useSelector(
    (state) => state.certificationForm.tempCertificationDetails || []
  );

  const finalCertificationList = useSelector(
    (state) => state.profileForms.certificationDetails || []
  );

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCertificationRequest());
  },[dispatch]);

  const parsedCertificationData = data?.certifications ? JSON.parse(data.certifications) : [];
  console.log("API Data: ", parsedCertificationData);


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
    if (tempCertificationList.length > 0 || parsedCertificationData.length > 0) {
      setHasFilledForm(true);
    }
    if(parsedCertificationData.length > 0){
      setIsDirty(false);
    }
    if (tempCertificationList.length > 0 ){
      setIsDirty(true);
      
    }
  }, [tempCertificationList, parsedCertificationData]);

  const handleCertificationSubmit = (data) => {
    setIsModalOpen(false);
    setHasFilledForm(true);
  };

  const handleTempDelete = (index) => {
    dispatch(deleteTempCertification(index));
  };

  const handleFinalDelete = (index) => {
    dispatch(deleteCertificationRequest(index));
  };

  const handleEdit = (index, certId, isTemp) => {
    setIsEditingTemp(isTemp);
    setFinalEditIndex(certId);
    setEditIndex(index);
    const selectedCertification = isTemp
      ? tempCertificationList[index]
      : parsedCertificationData[index];
    setInitialFormValues({ ...selectedCertification });
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedData) => {
    if (isEditingTemp) {
      dispatch(editTempCertification({ index: editIndex, updatedData }));
    } else {
      dispatch(updateCertificationRequest({ finalEditIndex, updatedData }));
    }
    setIsModalOpen(false);
    setEditIndex(null);
    setIsEditingTemp(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <ToastContainer />
      <div className="mx-auto w-full">
        {!hasFilledForm && (
          <ModalOpenerForms
            title={"Add Certification"}
            modalType={"certification"}
            onSubmit={handleCertificationSubmit}
          />
        )}

        {tempCertificationList.length > 0  && isSaved && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 mb-4"
              onClick={() => {
                dispatch(addCertificationRequest(tempCertificationList));
                setIsSaved(true);
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
                setInitialFormValues(null); // Reset form values for new entry
                setEditIndex(null);
                setIsModalOpen(true);
              }}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add Another Certification
            </button>
          </div>
        )}

        {tempCertificationList.length > 0 &&
          tempCertificationList.map((certification, index) => (
            <ExperienceDetailsDisplay
              key={index}
              title={certification.name}
              data={certification}
              onDelete={() => handleTempDelete(index)}
              onEdit={() => handleEdit(index,index, true)}
            />
          ))}

        {parsedCertificationData.length > 0 &&
          parsedCertificationData.map((certification, index) => (
            <ExperienceDetailsDisplay
              key={certification.certification_id}
              title={certification.name}
              data={certification}
              onDelete={() => handleFinalDelete(certification.certification_id)}
              onEdit={() => handleEdit(index,certification.certification_id, false)}
            />
          ))}

        {isModalOpen && ( 
          <CertificationModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={
              editIndex !== null ? handleSaveEdit : handleCertificationSubmit
            }
            initialValues={
              initialFormValues || {
                name: "",
                provider: "",
                enrollmentNumber: "",
                validUpto: "",
                marksType: "",
                aggregate: "",
                max: "",
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
    </div>
  );
}

export default CertificationForm;
