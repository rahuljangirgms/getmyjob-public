import React, { useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {deleteDocumentRequest, getDocumentRequest} from './../../../store/slices/jobSeeker/Profile_Form/documentsSlice'

function FileCard() {
  const dispatch = useDispatch();
  const { uploadedDocuments } = useSelector((state) => state.documentsInfoForm);

  useEffect(()=>{
    dispatch(getDocumentRequest());
  },[dispatch])

  const educationTitles = {
    tenth: "10th Standard Marksheet",
    twelfth: "12th Standard Marksheet",
    diploma: "Diploma Marksheet",
    graduation: "Graduation / Bachelor's Degree Marksheet",
    masters: "Master's Degree / Post-Graduation Marksheet",
    other: "Other Degree Marksheet",
  };

  const handleDelete = (doc_id) => {
    dispatch(deleteDocumentRequest(doc_id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {uploadedDocuments?.length === 0 ? (
        <p className="text-gray-500">No files uploaded.</p>
      ) : (
        uploadedDocuments.map((doc) => (
          <div
            key={doc.doc_id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-white"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {educationTitles[doc.type] || "Unknown Attachment"}
              </p>
              <a
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View / Download
              </a>
            </div>
            <button
              onClick={() => handleDelete(doc.doc_id)}
              className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 p-2 rounded-lg"
            >
              <RiDeleteBinLine size={20} />
            </button>
            
          </div>
        ))
      )}
    </div>
  );
}

export default FileCard;
