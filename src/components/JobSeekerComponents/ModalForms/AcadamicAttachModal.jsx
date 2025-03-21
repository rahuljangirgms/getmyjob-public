import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import submitFileLogo from "./../../../assets/images/submit-file.png";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { FaSave } from "react-icons/fa";
import * as Yup from "yup";
import { getEducationInfoRequest } from "../../../store/slices/jobSeeker/Profile_Form/educationInfoSlice";
import { addDocumentRequest } from "../../../store/slices/jobSeeker/Profile_Form/documentsSlice";

const validationSchema = Yup.object().shape({
  selectedAttachment: Yup.string().required("Please select an attachment type"),
});

function AcadamicAttachModal({ onClose }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const apiData = useSelector((state) => state.educationInfoForm.data);
  const uploadedFiles = useSelector((state) => state.documentsInfoForm.uploadedDocuments) || [];

  useEffect(() => {
    dispatch(getEducationInfoRequest());
  }, [dispatch]);

  const parsedApiData = apiData?.educations ? JSON.parse(apiData.educations) : [];

  const attachmentOptions = {
    tenth: "10th Marksheet",
    twelfth: "12th Marksheet",
    diploma: "Diploma Certificate",
    graduation: "Graduation Degree",
    masters: "Master’s Degree Certificate",
    other: "Other Education Certificate",
  };

  const uploadedTypes = uploadedFiles.map((doc) => doc.type);

  const availableAttachments = Object.entries(attachmentOptions)
    .filter(([type]) => parsedApiData.some((edu) => edu.type === type))
    .filter(([type]) => !uploadedTypes.includes(type));

  const [selectedAttachment, setSelectedAttachment] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // ✅ Handle File Upload with 2MB Size Validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSizeInMB = 2;

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxSizeInMB) {
        alert("File size exceeds 2 MB. Please upload a smaller file.");
        event.target.value = ""; // Clear the input
        return;
      }

      setUploadedFile(file);
    }
  };

  // ✅ Handle Save
  const handleSave = (values) => {
    if (!uploadedFile || !selectedAttachment) {
      alert("Please upload a file and select an attachment type.");
      return;
    }

    dispatch(
      addDocumentRequest({
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
        >
          {({ setFieldValue, errors }) => (
            <Form className="p-4 space-y-4">
              {/* Dropdown */}
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="" disabled>Select an attachment type</option>
                  {availableAttachments.map(([type, label]) => (
                    <option key={type} value={type}>{label}</option>
                  ))}
                </Field>
                {errors.selectedAttachment && (
                  <div className="text-red-600 text-sm">{errors.selectedAttachment}</div>
                )}
              </div>

              {/* Upload Section */}
              {selectedAttachment && !uploadedFile && (
                <div
                  className="border-dashed border-2 border-gray-300 p-6 text-center rounded-md cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.png,.gif,.bmp,.jpg,.jpeg"
                  />
                  <div className="flex justify-center items-center py-4">
                    <img src={submitFileLogo} alt="upload" className="h-20 w-20" />
                  </div>
                  <p className="text-blue-600 cursor-pointer">Click to upload</p>
                  <p className="text-sm text-gray-400">
                    File size must be below <strong>2MB</strong>. Only PDF, PNG, JPG, etc.
                  </p>
                </div>
              )}

              {/* Show Uploaded File */}
              {uploadedFile && (
                <div className="border p-2 rounded mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-semibold text-sm">
                      {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                    </span>
                    <button
                      onClick={() => setUploadedFile(null)}
                      type="button"
                      className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white rounded-lg text-sm p-2"
                    >
                      <RiDeleteBinLine size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end p-4 border-t">
                <button
                  type="submit"
                  disabled={!selectedAttachment || !uploadedFile}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    !selectedAttachment || !uploadedFile
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <FaSave className="me-2" />
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
