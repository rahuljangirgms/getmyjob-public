import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import Template1 from './../../../../components/JobSeekerComponents/BuildResume_Components/ResumeTemplates/Template1';


const ResumeViewer = ({ isOpen, onClose, resumeData, style }) => {
  const resumeRef = useRef(); // Reference for PDF export

  // Function to handle PDF export
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "My_Resume",
  });

  if (!isOpen) return null; // Hide modal when not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
        >
          <IoClose size={28} />
        </button>

        {/* Resume Content (Hidden in PDF export) */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-center mb-4">Resume Preview</h2>
          <div ref={resumeRef}>
            <Template1 data={resumeData} style={style} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
