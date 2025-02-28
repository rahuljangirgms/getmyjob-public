import React, { useState } from "react";
import ModalOpenerForms from "../../../components/JobSeekerComponents/Modal_Opener_Forms/ModalOpenerForms";
import { FaSave } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import FileCard from "../../../components/JobSeekerComponents/ReusableComponents/FileCard";
import { saveAttachmentDocuments } from "../../../store/slices/profileFormsSlice";
import AcadamicAttachModal from "../../../components/JobSeekerComponents/ModalForms/AcadamicAttachModal";

function AttachmentsForm() {
  const dispatch = useDispatch();
  const availFiles = useSelector((state) => state.profileForms.attachmentDocuments);
  // const filteredFiles = availFiles.filter((file) => file && file.name);

  // Track the current file being uploaded
  const [currentFile, setCurrentFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // To control modal visibility

  // Handle file selection from the input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentFile(file);
    }
  };

  const handleSubmit = () => {
    if (currentFile) {
      dispatch(saveAttachmentDocuments([currentFile])); // Save the file immediately to the store
      setCurrentFile(null); // Clear the current file state after upload
      setModalOpen(false); // Close the modal after saving
    } else {
      alert("Please select a file before saving.");
    }
  };

  const handleOpenModal = () => {
    setCurrentFile(null); // Reset file before opening the modal
    setModalOpen(true); // Open the modal
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <div className="mx-auto w-full">
        {/* Upload file button should be visible only after a file has been uploaded */}
        {availFiles.length > 0 ? (
          <div className="flex justify-end mb-4">
            <button
              className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleOpenModal} // Open modal again to upload a new file
            >
              <FaSave className="me-2 h-4 w-4" />
              Upload File
            </button>
          </div>
        ) : (
          // If no file is uploaded, show the ModalOpenerForms
          <ModalOpenerForms title={"Academic Records"} modalType={"academic"} />
        )}

        {/* Show the FileCard if there are files */}
        {availFiles && availFiles.length > 0 ? (
          <FileCard />
        ) : null}

        {/* Display Save button only if there is a file ready for upload */}
        {currentFile && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
            >
              <FaSave />
              Save
            </button>
          </div>
        )}
      </div>

      {/* Display modal to upload file */}
      {isModalOpen && (
        <AcadamicAttachModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

export default AttachmentsForm;
