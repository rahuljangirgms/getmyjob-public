import React, { useEffect, useState } from "react";
import ModalOpenerForms from "../../../components/JobSeekerComponents/Modal_Opener_Forms/ModalOpenerForms";
import { FaSave } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import FileCard from "../../../components/JobSeekerComponents/ReusableComponents/FileCard";
import { saveAttachmentDocuments } from "../../../store/slices/profileFormsSlice";
import AcadamicAttachModal from "../../../components/JobSeekerComponents/ModalForms/AcadamicAttachModal";
import { getDocumentRequest ,clearDocMessage} from "./../../../store/slices/jobSeeker/Profile_Form/documentsSlice";
import Loader from "./../../../components/JobSeekerComponents/ReusableComponents/Loader";
import { toast, ToastContainer } from "react-toastify";

function AttachmentsForm() {
  const dispatch = useDispatch();

  const { uploadedDocuments, message, loading, status } = useSelector(
    (state) => state.documentsInfoForm
  );

  useEffect(() => {
    if (message && status) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-50 text-green-700",
      });
  
      dispatch(clearDocMessage());
    } else if (message && !status) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-50 text-green-700",
      });
  
      dispatch(clearDocMessage());
    }
  }, [message, status, dispatch]);

  console.log("Documents: ",uploadedDocuments);

  const [currentFile, setCurrentFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getDocumentRequest());
  }, [dispatch]);

  const handleOpenModal = () => {
    setCurrentFile(null);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (currentFile) {
      dispatch(saveAttachmentDocuments([currentFile]));
      setCurrentFile(null);
      setModalOpen(false);
    } else {
      alert("Please select a file before saving.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <ToastContainer />
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
          <Loader />
        </div>
      )}

      <div className={`mx-auto w-full ${loading ? "opacity-50 pointer-events-none" : ""}`}>
        {uploadedDocuments?.length > 0 ? (
          <div className="flex justify-end mb-4">
            <button
              className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleOpenModal}
            >
              <FaSave className="me-2 h-4 w-4" />
              Upload File
            </button>
          </div>
        ) : (
          <ModalOpenerForms title={"Academic Records"} modalType={"academic"} />
        )}

          {Array.isArray(uploadedDocuments) && uploadedDocuments.length > 0 && <FileCard />}

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

      {isModalOpen && <AcadamicAttachModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default AttachmentsForm;
