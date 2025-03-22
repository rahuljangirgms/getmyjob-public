import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DropDown from "./DropDown";
import submitFileLogo from "./../../assets/images/submit-file.png";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { saveAttachmentDocuments } from "../../store/slices/profileFormsSlice";
import { FaSave } from "react-icons/fa";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object().shape({
  fileTypes: Yup.array()
    .of(Yup.string().required("File type is required"))
    .min(3, "You must select a type for each file before saving"), // 🔥 Requires all types
});

function AcadamicAttachModal({ onClose }) {
  const dispatch = useDispatch();
  const storedFiles = useSelector((state) => state.profileForms.attachmentDocuments);
  const [files, setFiles] = useState([]);
  const maxFiles = 3;

  useEffect(() => {
    if (Array.isArray(storedFiles) && storedFiles.length > 0) {
      setFiles(storedFiles);
    }
  }, [storedFiles]);

  // ✅ Handle File Upload
  const handleFileChange = (event) => {
    if (event.target.files.length + files.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    const newFiles = Array.from(event.target.files).map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: "",
    }));

    setFiles([...files, ...newFiles]); // ✅ Only update local state, NOT Redux
  };

  // ✅ Handle Type Selection
  const handleTypeChange = (index, value, setFieldValue) => {
    const updatedFiles = files.map((file, i) =>
      i === index ? { ...file, type: value } : file
    );

    setFiles(updatedFiles);
    setFieldValue(`fileTypes[${index}]`, value); // ✅ Update Formik field only
  };

  // ✅ Remove File
  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  // ✅ Save Data to Redux
  const handleSave = (values) => {
    if (files.length !== maxFiles) {
      alert(`Please upload exactly ${maxFiles} files before saving.`);
      return;
    }
    dispatch(saveAttachmentDocuments(files)); // ✅ Save to Redux
    onClose(); // ✅ Close modal
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
          initialValues={{ fileTypes: files.map((file) => file.type || "") }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
          enableReinitialize // ✅ Keeps Formik in sync with state updates
        >
          {({ setFieldValue, errors }) => (
            <Form className="p-4 space-y-4">
              {/* ✅ File Upload Box */}
              {files.length < maxFiles && (
                <div
                  className="border-dashed border-2 border-gray-300 p-6 text-center rounded-md cursor-pointer"
                  onClick={() => document.getElementById("fileUpload").click()}
                >
                  <p className="text-sm text-gray-500">
                    You can add up to {maxFiles} documents/attachments.
                  </p>
                  <input
                    type="file"
                    multiple
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

              {/* ✅ Uploaded Files List */}
              {files.length > 0 && (
                <div>
                  {files.map((file, index) => (
                    <div key={index} className="border p-2 rounded mt-2">
                      <div className="flex justify-between">
                        <span className="text-blue-700 font-semibold text-sm">
                          {file.name} ({file.size})
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          type="button"
                          className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center"
                        >
                          <RiDeleteBinLine size={18} />
                        </button>
                      </div>

                      {/* ✅ Dropdown with Validation */}
                      <Field name={`fileTypes[${index}]`}>
                        {({ field }) => (
                          <div>
                            <DropDown
                              label="Type"
                              {...field}
                              options={[
                                { label: "10th Marksheet", value: "10th_marksheet" },
                                { label: "12th Marksheet", value: "12th_marksheet" },
                                { label: "Graduation Marksheet", value: "graduation_marksheet" },
                              ]}
                              onChange={(e) => handleTypeChange(index, e.target.value, setFieldValue)}
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  ))}
                </div>
              )}

              {/* ✅ Save Button */}
              <div className="flex justify-end p-4 border-t">
                <button
                  type="submit"
                  disabled={Object.keys(errors).length > 0 || files.length !== maxFiles} // ✅ Prevent invalid save
                  className={`px-4 py-2 rounded-lg ${
                    files.length !== maxFiles
                      ? "bg-gray-400 cursor-not-allowed inline-flex items-center gap-2 px-6 py-2 text-white disabled:opacity-50"
                      : "inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }`}
                >
                  <FaSave />
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
