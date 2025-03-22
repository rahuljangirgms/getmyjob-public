import React, { useState } from "react";
import emptyBox from "./../../../assets/images/empty-box.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import AcadamicAttachModal from "../ModalForms/AcadamicAttachModal";
import ProfessionalExperienceModal from "../ModalForms/ProfessionalExperienceModal";
import InternshipExperienceModal from "../ModalForms/InternshipExperienceModal";
import ProjectDetailsModal from "../ModalForms/ProjectDetailsModal";
import ResearchPaperModal from "../ModalForms/ResearchPaperModal";
import TrainingModal from "../ModalForms/TrainingModal";
import CertificationModal from "../ModalForms/CertificationModal";
import EducationDetailsModal from './../ModalForms/EducationDetailsModal';

function ModalOpenerForms({ title, modalType, onSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderModal = () => {
    switch (modalType) {
      case "academic":
        return <AcadamicAttachModal onClose={() => setIsModalOpen(false)} />;
      case "experience":
        return (
          <ProfessionalExperienceModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmit} // Pass data to parent
            initialValues={{
              designation: "",
              organisation: "",
              industrySector: "",
              department: "",
              ctc: "",
              from: "",
              to: "",
              currentlyWorking: false,
              country: "",
              state: "",
              city: "",
              skills: "",
              description: "",
            }}
          />
        );

      
      case "education":
        return(
          <EducationDetailsModal
            onClose={()=> setIsModalOpen(false)}
            onSubmit={onSubmit}
            initialValues={{
              degree: "",
              stream: "",
              college: "",
              collegeCity: "",
              joiningYear: "",
              completionYear: "",
              graduationType: "",
              aggregateType: "",
              aggregate: "",
              max: "",
              activeBacklogs: "",
            }}            
          />
        );


      case "internship":
        return (
          <InternshipExperienceModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmit}
            initialValues={{
              title: "",
              organisation: "",
              industrySector: "",
              department: "",
              stipend: "",
              from: "",
              to: "",
              currentlyWorking: false,
              country: "",
              state: "",
              city: "",
              skills: "",
              description: "",
            }}
          />
        );

      case "project":
        return (
          <ProjectDetailsModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              projectLink: "",
              from: "",
              to: "",
              mentor: "",
              teamSize: "",
              skills: "",
              description: "",
            }}
          />
        );

      case "paper":
        return (
          <ResearchPaperModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              publicationName: "",
              publicationDate: "",
              mentor: "",
              authorsCount: "",
              type: "",
              skills: [],
              description: "",
            }}
          />
        );

      case "training":
        return (
          <TrainingModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              instituteName: "",
              from: "",
              to: "",
              skills: [],
              description: "",
            }}
          />
        );

      case "certification":
        return (
          <CertificationModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              provider: "",
              enrollmentNumber: "",
              validUpto: "",
              marksType: "",
              aggregate: "",
              max: "",
              skills: [],
              description: "",
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-between items-center mb-4 rounded-lg bg-white p-4 md:p-6 shadow-sm w-full">
      {/* Header Section */}
      <div className="flex justify-between w-full">
        <h2 className="text-sm md:text-lg font-semibold text-gray-900">
          {title}
        </h2>
        <button
          className="flex items-center text-blue-600 hover:text-blue-700 text-xs md:text-base"
          onClick={() => setIsModalOpen(true)}
        >
          <IoIosAddCircleOutline className="w-6 h-6 md:w-8 md:h-8 mr-1" />
          <span className="text-sm md:text-xl font-semibold">Add</span>
        </button>
      </div>

      {/* Image */}
      <img
        src={emptyBox}
        className="w-16 h-16 md:w-24 md:h-24 mt-2"
        alt="Empty"
      />

      {/* Message */}
      <p className="text-gray-500 text-xs md:text-sm text-center">
        No records added yet.
      </p>

      {/* Modal */}
      {isModalOpen && renderModal()}
    </div>
  );
}

export default ModalOpenerForms;
