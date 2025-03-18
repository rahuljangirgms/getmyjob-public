import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import submitFileLogo from "./../../../assets/images/submit-file.png";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { saveAttachmentDocuments } from "../../../store/slices/profileFormsSlice";
import { FaSave } from "react-icons/fa";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object().shape({
  selectedAttachment: Yup.string().required("Please select an attachment type"),
});

function AcadamicAttachModal({ onClose }) {
  const dispatch = useDispatch();

  // Get API Data from Redux Store
  const apiData = useSelector((state) => state.educationInfoForm.data);
  console.log("Raw API Data:", apiData);

  // ✅ Parse API Data before using it
  const parsedApiData = apiData?.educations ? JSON.parse(apiData.educations) : [];
  console.log("Parsed Education Data:", parsedApiData);

  // ✅ Get stored attachments from Redux
  const storedFiles = useSelector((state) => state.profileForms.attachmentDocuments) || [];

  // ✅ List of available attachment types based on education records
  const attachmentOptions = {
    tenth: "10th Marksheet",
    twelfth: "12th Marksheet",
    diploma: "Diploma Certificate",
    graduation: "Graduation Degree",
    masters: "Master’s Degree Certificate",
    other: "Other Education Certificate",
  };

  // ✅ Track already uploaded attachments
  const uploadedTypes = storedFiles.map((file) => file.educationType);

  // ✅ Filter available options to prevent duplicate selections
  const availableAttachments = Object.entries(attachmentOptions)
    .filter(([type]) => parsedApiData.some((edu) => edu.type === type)) // ✅ Use parsedApiData instead of apiData
    .filter(([type]) => !uploadedTypes.includes(type)); // ✅ Prevent duplicate selections

  console.log("Available Attachments:", availableAttachments);

  // ✅ State for attachment selection & file upload
  const [selectedAttachment, setSelectedAttachment] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // ✅ Reset the state when the modal opens or closes
  useEffect(() => {
    setSelectedAttachment("");
    setUploadedFile(null);
  }, [onClose]);

  // ✅ Handle File Upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);  // ✅ Store actual file instead of metadata
  }
  };

  // ✅ Handle Save
  const handleSave = (values) => {
    if (!uploadedFile || !selectedAttachment) {
      alert("Please upload a file and select an attachment type.");
      return;
    }

    // Dispatch to Redux
    dispatch(
      saveAttachmentDocuments({
        type: selectedAttachment,
        file: uploadedFile,
      })
    );

    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-4xl h-auto bg-white rounded-lg shadow-lg m-5 overflow-y-scroll">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">Upload Attachment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <RxCross2 size={20} />
          </button>
        </div>

        <Formik
          initialValues={{ selectedAttachment: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, values, errors }) => (
            <Form className="p-4 space-y-4" onSubmit={handleSubmit}>
              {/* ✅ Attachment Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Attachment Type:
                </label>
                <Field
                  as="select"
                  name="selectedAttachment"
                  value={selectedAttachment}
                  onChange={(e) => {
                    setSelectedAttachment(e.target.value);
                    setFieldValue("selectedAttachment", e.target.value);
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                >
                  <option value="" disabled>Select an attachment type</option>
                  {availableAttachments.map(([type, label]) => (
                    <option key={type} value={type}>
                      {label}
                    </option>
                  ))}
                </Field>
                {errors.selectedAttachment && (
                  <div className="text-red-600 text-sm">{errors.selectedAttachment}</div>
                )}
              </div>

              {/* ✅ File Upload */}
              {selectedAttachment && uploadedFile === null && (
                <div
                  className="border-dashed border-2 border-gray-300 p-6 text-center rounded-md cursor-pointer"
                  onClick={() => document.getElementById("fileUpload").click()}
                >
                  <p className="text-sm text-gray-500">You can upload one document/attachment.</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileUpload"
                  />
                  <div className="flex justify-center items-center py-4">
                    <img src={submitFileLogo} className="h-20 w-20" />
                  </div>
                  <label htmlFor="fileUpload" className="cursor-pointer text-blue-600">
                    Click to upload
                  </label>
                  <p className="text-sm text-gray-400">
                    File size must be below 4MB. Only .pdf, .png, .gif, .bmp, .jpg, .jpeg can be uploaded.
                  </p>
                </div>
              )}

              {/* ✅ Show Uploaded File */}
              {uploadedFile && (
                <div className="border p-2 rounded mt-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700 font-semibold text-sm">
                      {uploadedFile.name} ({uploadedFile.size})
                    </span>
                    <button
                      onClick={() => setUploadedFile(null)}
                      type="button"
                      className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center"
                    >
                      <RiDeleteBinLine size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* ✅ Save Button */}
              <div className="flex justify-end p-4 border-t">
                <button
                  type="submit"
                  disabled={!selectedAttachment || !uploadedFile}
                  className={`px-4 py-2 rounded-lg flex justify-center items-center ${
                    !selectedAttachment || !uploadedFile
                      ? "bg-gray-400 cursor-not-allowed text-white disabled:opacity-50"
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }`}
                >
                  <FaSave className="me-2"/>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AcadamicAttachModal;
