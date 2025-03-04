import { useState } from "react";
import Stepper from "./../../../components/JobSeekerComponents/ReusableComponents/Stepper";
import { toast, ToastContainer } from "react-toastify";
import ResumeDisplay from "./../../../components/JobSeekerComponents/BuildResume_Components/ResumeDisplay";
import ViewMyResume from "./../../../components/JobSeekerComponents/BuildResume_Components/ViewMyResume";
import ReadyForJobs from "./../../../components/JobSeekerComponents/BuildResume_Components/ReadyForJobs";
import { useSelector } from 'react-redux';
import { setTeamplateSelect } from './../../../store/slices/resumeSlice';

function ResumeBuilder() {
  const steps = [
    { title: "Choose Your Template", description: "Step-1" },
    { title: "View Your Resume", description: "Step-2" },
    { title: "Ready for Applying Jobs", description: "Step-3" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  // const isTemplateSelected = useSelector(state => state.resume.isTeamplateSelected);

  const handleTemplateSelect = (template) => {
    // setSelectedTemplate(template);
    setSelectedTemplate(template);
    setTeamplateSelect(true);
    setCurrentStep(1); // Move to ViewMyResume
  };

  const handleStepChange = (newStep) => {
    if (newStep > currentStep && !selectedTemplate) {
      toast.warn("Please select a template before proceeding!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    setCurrentStep(newStep);
  };

  const renderComponent = () => {
    switch (currentStep) {
      case 0:
        return <ResumeDisplay onSelectTemplate={handleTemplateSelect} />;
      case 1:
        return <ViewMyResume template={selectedTemplate} />;
      case 2:
        return <ReadyForJobs />;
      default:
        return <ResumeDisplay onSelectTemplate={handleTemplateSelect} />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 mt-10 md:mt-16 h-lvh">
      <ToastContainer />
      
      {/* Header Section */}
      <div className="w-full flex justify-center items-center flex-col text-center my-6">
        <p className="text-lg text-gray-700 font-semibold py-4">
          Build Your Resume To Get Your Dream Job! with JobVerse
        </p>

        <div className="flex w-full justify-center items-center py-4">
          <Stepper steps={steps} currentStep={currentStep} onStepChange={handleStepChange} />
        </div>

        <p className="text-2xl text-black font-bold py-4">
          {steps[currentStep].title}
        </p>
        <p className="text-medium text-gray-500">
          You can always change your template later.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row w-full px-6 gap-6 justify-center">
        <div className="w-full flex justify-center px-24 h-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
