import React from "react";
import resimg1 from "./../../../assets/images/Resume Teamplates UI/Images.jpg";
import resimg2 from "./../../../assets/images/Resume Teamplates UI/ditto.jpg";
import resimg3 from "./../../../assets/images/Resume Teamplates UI/leafish.jpg";
import resimg4 from "./../../../assets/images/Resume Teamplates UI/onyx.jpg";
import resimg5 from "./../../../assets/images/Resume Teamplates UI/pikachu.jpg";
import resimg6 from "./../../../assets/images/Resume Teamplates UI/Images.jpg";
import ResumeCard from "./../ReusableComponents/ResumeCard";
import ResTemplateFilter from "./../FilterComponents/ResTemplateFilter";

const templates = [
  { id: "template1", image: resimg1, name: "Template 1" },
  { id: "template2", image: resimg2, name: "Template 2" },
  { id: "template3", image: resimg3, name: "Template 3" },
  { id: "template4", image: resimg4, name: "Template 4" },
  { id: "template5", image: resimg5, name: "Template 5" },
  { id: "template6", image: resimg6, name: "Template 6" },
];

function ResumeDisplay({ onSelectTemplate }) {
  return (
    <div className="flex flex-col lg:flex-row w-full px-6 gap-6 justify-center">
      <div className="lg:w-1/4 md:w-1/3 sm:w-full flex justify-center">
        <ResTemplateFilter />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {templates.map((template) => (
          <div key={template.id} onClick={() => onSelectTemplate(template)}>
            <ResumeCard imageSrc={template.image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeDisplay;
