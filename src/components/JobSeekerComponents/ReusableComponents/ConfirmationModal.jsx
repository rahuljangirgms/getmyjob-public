import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  if (!isOpen) return null; // Prevent rendering when modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-4 md:mx-0 max-w-xl">
        <h3 className="text-2xl font-medium text-blue-700 mb-4">{title}</h3>
        <p className=" text-base text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-300"
          >
            {cancelText || "No, cancel"}
          </button>
          <button
            onClick={onConfirm}
            className="py-2.5 px-5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            {confirmText || "Yes, leave"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
