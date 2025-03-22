import React, { useState } from "react";
import { useField } from "formik";
import { FaUpload } from "react-icons/fa";

function FileUploadField({ label, name, setFieldValue }) {
  const [field, meta] = useField(name);
  const [preview, setPreview] = useState(field.value || null); // If already set, show preview

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const base64 = await convertFileToBase64(file);
      setFieldValue(name, base64); // Save as Base64
      setPreview(base64); // Update preview
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
              onChange={handleFileChange}
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
