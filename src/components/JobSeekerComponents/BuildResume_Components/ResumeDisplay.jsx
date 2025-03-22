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
    <div className="flex flex-col lg:flex-row w-full px-0 md:px-8 lg:px-16 gap-6 md:justify-center ">
      {/* Filter Panel: Full width on mobile, 33% on tablets, 25% on desktops */}
      <div className="w-full  lg:w-1/4 flex justify-center">
        <ResTemplateFilter />
      </div>

      {/* Templates Grid: 1 column on mobile, 2 columns on small screens, 3 columns on medium screens and up */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className="cursor-pointer"
          >
            <ResumeCard imageSrc={template.image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeDisplay;
