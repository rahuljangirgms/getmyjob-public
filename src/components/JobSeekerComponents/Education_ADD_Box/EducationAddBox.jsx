import React, { useState } from 'react'
import emptyBox from './../../../assets/images/empty-box.png';
import { IoIosAddCircleOutline } from 'react-icons/io';
import EducationDetailsModal from './../ModalForms/EducationDetailsModal';



function EducationAddBox({title, onSubmit}) {
 
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="flex flex-col justify-between items-center mb-4 rounded-lg bg-white p-4 md:p-6 shadow-sm w-full">
      
    {/* Header Section */}
    <div className="flex justify-between items-center w-full">
      <h2 className="text-sm md:text-lg font-semibold text-gray-900 break-words">
        {title}
      </h2>
      <button
        className="flex items-center text-blue-600 hover:text-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        <IoIosAddCircleOutline className="w-6 h-6 md:w-8 md:h-8 mr-1" />
        <span className="text-sm md:text-xl font-semibold">Add</span>
      </button>
    </div>

    {/* Image Section */}
    <img
      src={emptyBox}
      className="w-16 h-16 md:w-24 md:h-24 mt-2"
      alt="Empty"
    />

    {/* No Record Message */}
    <p className="text-xs md:text-sm text-gray-500 text-center">
      No records added yet.
    </p>

    {/* Modal */}
    {isModalOpen && (
      <EducationDetailsModal
        onClose={() => setIsModalOpen(false)}
        title={title}
        onSubmit={onSubmit}
      />
    )}
  </div>

        
  )
}

export default EducationAddBox
