import { useState } from "react";
import Stepper from "./../../../components/JobSeekerComponents/ReusableComponents/Stepper";
import ResTemplateFilter from "./../../../components/JobSeekerComponents/FilterComponents/ResTemplateFilter";

import ResumeDisplay from "./../../../components/JobSeekerComponents/BuildResume_Components/ResumeDisplay";
import ViewMyResume from "./../../../components/JobSeekerComponents/BuildResume_Components/ViewMyResume";
import ReadyForJobs from "./../../../components/JobSeekerComponents/BuildResume_Components/ReadyForJobs";

function ResumeBuilder() {
  const steps = [
    { title: "Choose Your Template", description: "Step-1" },
    { title: "View Your Resume", description: "Step-2" },
    { title: "Ready for Applying Jobs", description: "Step-3" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentStep(1); // Move to ViewMyResume
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

  const renderTitle = () => {
    switch (currentStep) {
      case 0:
        return (
          <p className="text-2xl text-black font-bold py-4">
            Choose From Our Resume Templates
          </p>
        );
      case 1:
        return (
          <p className="text-2xl text-black font-bold py-4">
            Customize Your Resume as per your need
          </p>
        );
      case 2:
        return (
          <p className="text-2xl text-black font-bold py-4">
            Your Ready for applying jobs with Resume
          </p>
        );
      default:
        return (
          <p className="text-2xl text-black font-bold py-4">
            Choose From Our Resume Templates
          </p>
        );
    }
  };

  return (
    <div className="flex-1 h-auto overflow-y-auto p-4 mt-10 md:mt-16">
      {/* Header Section */}
      <div className="w-full flex justify-center items-center flex-col text-center my-6">
        <p className="text-lg text-gray-700 font-semibold py-4">
          Build Your Resume To Get Your Dream Job! with JobVerse
        </p>

        <div className="flex w-full justify-center items-center py-4">
        <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />
        </div>

        {renderTitle()}
        <p className="text-medium text-gray-500">
          You can always change your template later.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row w-full px-6 gap-6 justify-center">
        {/* Filter Section */}
        {/* <div className="lg:w-1/4 md:w-1/3 sm:w-full flex justify-center">
          <ResTemplateFilter />
        </div> */}

        {/* Resume Templates Section */}
        <div className="w-full flex justify-center px-24 h-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
