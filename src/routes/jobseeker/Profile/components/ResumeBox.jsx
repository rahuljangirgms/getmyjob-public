import React, { useState, useRef, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import AIButton from "./../../../../components/JobSeekerComponents/Buttons/AIButton";
import Template1 from "./../../../../components/JobSeekerComponents/BuildResume_Components/ResumeTemplates/Template1";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BiTrash } from "react-icons/bi";
import ConfirmDeleteModal from './../../../../components/JobSeekerComponents/ReusableComponents/ConfirmDeleteModal';
import {deleteResumeRequest, clearResumeMessages, getResumeListRequest} from './../../../../store/slices/jobSeeker/genrateResume/genrateResumeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function ResumeBox({ id,title, imgSrc, resumeData, filePath, bash_id }) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // handle AI button click 

  const aiButtonClick = () =>{
    navigate(`/jobseeker/resume-analyzer/${id}/${bash_id}`)
  }

  const [deleteId,setDeleteId] = useState(0);

  const message = useSelector((state) => state.genrateResume.message);

   useEffect(() => {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-50 text-green-700",
      });
      dispatch(clearResumeMessages());
      dispatch(getResumeListRequest());
      
  
    }, [message]);

  const [modalOpen, setModalOpen] = useState(false);

  const[isConfirmModalOpen,setIsConfirmModalOpen] = useState(false);

  const handleDeleteBtn = (id) =>{
    setIsConfirmModalOpen(true);
    setDeleteId(id);
  }

  const handleFinalDelete = () =>{
     
    dispatch(deleteResumeRequest(deleteId));
    setIsConfirmModalOpen(false);
  };


  const resumeRef = useRef(null); // Reference for the resume container

  // ✅ Function to generate PDF using jsPDF & html2canvas (Supports Multi-Page)
    const generatePDF = async () => {
      if (!resumeRef.current) {
        console.error("❌ Resume reference is null");
        return;
      }

      const input = resumeRef.current;

      html2canvas(input, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          let imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          // Handle multi-page content
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save(title);
        })
        .catch((error) => console.error("❌ Error generating PDF:", error));
    };

  return (
    <>
      {/* Resume Box */}
      <div className="bg-white h-64 w-64 rounded-lg px-4 py-4 flex flex-col items-center justify-center border border-gray-300 shadow-lg">
        {/* Title */}
       
       <div className="flex flex-row justify-between items-center w-full">
       <h1 className="text-sm font-semibold mb-2">{title}</h1>
       <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-1 text-center me-2 mb-2" onClick={()=> handleDeleteBtn(id)}><BiTrash size={18}/></button>
       </div>


        {/* Logo */}
        <div className="w-20 h-20 flex items-center justify-center">
          <img src={imgSrc} alt="Resume Logo" className="w-full h-full object-contain" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full mt-4">
          <button
            type="button"
            onClick={() => setModalOpen(true)} // Open modal
            className="w-1/2 flex flex-row items-center justify-center gap-2 text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            <FiEye size={16} /> View
          </button>

          <a
           href={filePath}
           target="_blank"
           rel="noopener noreferrer"
            className="w-1/2 flex flex-row items-center justify-center gap-2 text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            <LuDownload size={16} /> Download
          </a>

          {/* href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline" */}
        </div>

        <div className="w-full my-2 flex justify-center">
          <AIButton btnTxt={"Analyze With AI"} onClick={()=> aiButtonClick()} />
        </div>
      </div>

      {/* Resume Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white h-[90vh] overflow-y-scroll rounded-lg shadow-lg w-full max-w-5xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              <IoClose size={28} />
            </button>

            {/* Resume Content inside Modal */}
            <div className="mt-4">

            <div className="flex justify-between p-4">
            <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
              {/* <button
                onClick={generatePDF}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Download PDF
              </button> */}
              </div>
           
              <div ref={resumeRef} className="bg-white p-4 shadow-md">
                <Template1 data={resumeData} />
              </div>
            </div>

            {/* Download PDF Button */}
           
          </div>
        </div>
      )}

<ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleFinalDelete}
        message="Are you sure you want to delete this Resume?"
      />
    </>
  );
}

export default ResumeBox;
