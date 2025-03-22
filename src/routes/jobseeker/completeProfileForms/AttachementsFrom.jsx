import React, { useState } from "react";
import ModalOpenerForms from "./../../../components/JobSeekerComponents/ModalOpenerForms";
import { FaSave } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import FileCard from "./../../../components/JobSeekerComponents/FileCard";
import { saveAttachmentDocuments } from "../../../store/slices/profileFormsSlice";

function AttachmentsForm() {
  const dispatch = useDispatch();
  const availFiles = useSelector((state) => state.profileForms.attachmentDocuments);
  
  // ✅ Track if the form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    if (Array.isArray(availFiles) && availFiles.length > 0) {
      dispatch(saveAttachmentDocuments(availFiles)); // ✅ Save to Redux only on submit
      setFormSubmitted(true); // ✅ Mark form as submitted
    } else {
      alert("Please add at least one file before saving.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <div className="mx-auto w-full">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit} // ✅ Save and submit files
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 mb-4"
          >
            <FaSave />
            Save
          </button>
        </div>

        {/* ✅ Only show FileCard after form submission */}
        {availFiles && Object.keys(availFiles).length > 0 ? (
          <FileCard />
        ) : (
          <ModalOpenerForms title={"Acadamic Records"} modalType={"academic"} />
        )}
      </div>
    </div>
  );
}

export default AttachmentsForm;
