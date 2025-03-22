import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { FaUpload } from "react-icons/fa";

function FileUploadField({ label, name, setFieldValue, profileImg }) {
  const [field, meta] = useField(name);
  const [preview, setPreview] = useState(profileImg || null); // Initialize with profileImg or null

  useEffect(() => {
    if (profileImg) {
      setPreview(profileImg); // Update preview when profileImg changes
    }
  }, [profileImg]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue(name, file); // Store file object in Formik field
      setPreview(URL.createObjectURL(file)); // Update preview to show new image
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 pb-2">{label}</label>
      <div className="flex items-center justify-center">
        <div className="relative h-40 w-40">
          <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
            ) : (
              <div className="flex flex-col items-center">
                <FaUpload className="mb-2 h-6 w-6 text-gray-400" />
                <p className="text-sm text-gray-500">Click to upload</p>
                <p className="mt-1 text-xs text-gray-400">File size must be below 3MB</p>
              </div>
            )}
            <input
              type="file"
              name={name}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={handleFileChange} // When file is selected, update form field and preview
              accept="image/*"
            />
          </div>
        </div>
      </div>
      {meta.touched && meta.error && (
        <div className="mt-1 text-sm text-center py-2 text-red-600">{meta.error}</div>
      )}
    </div>
  );
}

export default FileUploadField;
