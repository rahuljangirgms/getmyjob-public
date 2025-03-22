import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEducationInfoRequest, getEducationInfoRequest, updateEducationInfoRequest, deleteEducationRequest, clearMessage } from "./../../../store/slices/jobSeeker/Profile_Form/educationInfoSlice";
import EducationAddBox from "./../../../components/JobSeekerComponents/Education_ADD_Box/EducationAddBox";
import EducationDetailsDisplay from "./../../../components/JobSeekerComponents/DataDisplayBox/EducationDetailsDisplay";
import EducationDetailsModal from './../../../components/JobSeekerComponents/ModalForms/EducationDetailsModal';
import Loader from './../../../components/JobSeekerComponents/ReusableComponents/Loader';
import { toast, ToastContainer } from 'react-toastify';

function EducationalDetailsForm() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [editId, setEditId] = useState(null);
  
  // Fetch API data from Redux store
  const apiData = useSelector((state) => state.educationInfoForm.data);
  const { loading, status, message, data } = useSelector((state) => state.educationInfoForm);

  // Parse API Data
  const parsedApiData = apiData?.educations ? JSON.parse(apiData.educations) : [];
  console.log("Educations API Data : ", data);

  // Titles mapping
  const educationTitles = {
    tenth: "10th Standard / Secondary Education",
    twelfth: "12th Standard / Higher Secondary Education",
    diploma: "Diploma",
    graduation: "Graduation / Bachelor's Degree",
    masters: "Master's Degree / Post-Graduation",
    other: "Other Degree",
  };

  useEffect(() => {
    dispatch(getEducationInfoRequest());
  }, [dispatch]);

  // useEffect(() => {
  //   if (status) {
  //     dispatch(getEducationInfoRequest());
  //   }
  // }, [status, dispatch]);




  // Handle Add/Update
  const handleAddOrUpdate = async (type, data) => {
    const educationId = editId || data.education_id; 
  
    if (editingType && educationId) {
      dispatch(updateEducationInfoRequest({ id: educationId, data }));
    } else {
      dispatch(postEducationInfoRequest({ type, data }));
    };

    
   
    setModalOpen(false);
    setEditId(null);
  };


  useEffect(() => {
    if (message && status) { // ✅ Ensure status is true to avoid duplicate toast
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-50",
      });
  
      // ✅ Clear the message after displaying Toast
      dispatch(clearMessage());
    }
  }, [message]); // ✅ Only runs when `message` changes
  
  
  
  // Handle Edit
  const handleEdit = (type) => {
    const existingEntry = parsedApiData?.find((edu) => edu.type === type);

    if (existingEntry) {
      setEditId(existingEntry.education_id || existingEntry.data.education_id);
      setEditingType(type);
      setInitialValues({
        ...existingEntry.data,
        education_id: existingEntry.education_id || existingEntry.data.education_id || null,
      });
      setModalOpen(true);
    }
  };

  // Handle Delete 
  const handleDelete = (type) => {
    const existingEntry = parsedApiData?.find((edu) => edu.type === type);

    if (existingEntry && existingEntry.data.education_id) {
      dispatch(deleteEducationRequest({ id: existingEntry.data.education_id }));
  

      // setTimeout(() => dispatch(getEducationInfoRequest()), 500);
    } 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto w-full">
          {Object.keys(educationTitles).map((type) => {
            const existingEntry = parsedApiData?.find((edu) => edu.type === type);
            return (
              <div key={type} className="mb-4">
                {existingEntry ? (
                  <EducationDetailsDisplay
                    title={educationTitles[type]}
                    data={existingEntry.data}
                    onEdit={() => handleEdit(type)}
                    onDelete={() => handleDelete(type)}
                  />
                ) : (
                  <EducationAddBox title={educationTitles[type]} onSubmit={(data) => handleAddOrUpdate(type, data)} />
                )}
              </div>
            );
          })}
          {modalOpen && <EducationDetailsModal onClose={() => setModalOpen(false)} onSubmit={(data) => handleAddOrUpdate(editingType, data)} initialValues={initialValues} isEditing={!!initialValues.qualification} title={educationTitles[editingType]} />}
        </div>
      )}
    </div>
  );
}

export default EducationalDetailsForm;
