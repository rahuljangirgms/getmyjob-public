import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrUpdateEducation, deleteEducation } from "./../../../store/slices/profileFormsSlice";
import EducationAddBox from "./../../../components/JobSeekerComponents/Education_ADD_Box/EducationAddBox";
import EducationDetailsDisplay from "./../../../components/JobSeekerComponents/DataDisplayBox/EducationDetailsDisplay";
import EducationDetailsModal from './../../../components/JobSeekerComponents/ModalForms/EducationDetailsModal';
import {postEducationInfoRequest,getEducationInfoRequest} from './../../../store/slices/jobSeeker/Profile_Form/educationInfoSlice';

function EducationalDetailsForm() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  // Get education details from Redux store
  const educationDetails = useSelector((state) => state.profileForms.educationDetails);

  const apiData = useSelector((state) => state.contactInfoForm.data);

  const educationTitles = {
    tenth: "10th Standard / Secondary Education",
    twelfth: "12th Standard / Higher Secondary Education",
    diploma: "Diploma",
    graduation: "Graduation / Bachelor's Degree",
    masters: "Master's Degree / Post-Graduation",
    other: "Other Degree",
  };

  useEffect(()=>{
    dispatch(getEducationInfoRequest());
   
  },[dispatch]);

  console.log("Education data frm api: ",apiData);

  const handleAddOrUpdate = (type, data) => {
    dispatch(addOrUpdateEducation({ type, data }));
    dispatch(postEducationInfoRequest({ type: type, data: data }));


    setModalOpen(false); // Close modal after saving
  };

  const handleDelete = (type) => {
    dispatch(deleteEducation(type));
  };

  const handleEdit = (type) => {
    const existingEntry = educationDetails.find((edu) => edu.type === type);
    setEditingType(type);
    setInitialValues(existingEntry ? existingEntry.data : {});
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <div className="mx-auto w-full">
       

        {Object.keys(educationTitles).map((type) => {
          const existingEntry = educationDetails.find((edu) => edu.type === type);
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
                <EducationAddBox
                  title={educationTitles[type]}
                  onSubmit={(data) => handleAddOrUpdate(type, data)}
                />
              )}
            </div>
          );
        })}

        {/* Education Details Modal */}
        {modalOpen && (
          <EducationDetailsModal
            onClose={() => setModalOpen(false)}
            onSubmit={(data) => handleAddOrUpdate(editingType, data)}
            initialValues={initialValues}
            isEditing={!!initialValues.qualification}
            title={educationTitles[editingType]}
          />
        )}
      </div>
    </div>
  );
}

export default EducationalDetailsForm;
