import React from "react";
import ResumeBox from "./ResumeBox";
import MasterResumeLogo from "./../../../../assets/images/resume-and-cv.png";
import ResumeLogo from "./../../../../assets/images/curriculum-vitae.png";
import { useSelector } from "react-redux";

function ResumeSection() {
  const Resumes = useSelector((state) => state.resume.resumes);

  

    //   console.log("Resumes: ", Resumes);

  return (
    <div className="flex justify-center flex-col">
      <h2 className="text-2xl font-bold text-black border-b pb-2 mb-4">
        Your Resumes
      </h2>

      {/* <h1 className="text-2xl font-bold text-gray-800 ">Your Profile</h1> */}

      <div className="flex flex-row flex-wrap gap-4 justify-start">
        <ResumeBox title={"Master Resume"} imgSrc={MasterResumeLogo}/>

        {Resumes.map((res, index) => (
          <ResumeBox key={index} title={res.name} imgSrc={ResumeLogo} resumeData={res.data} />
        ))}
      </div>
    </div>
  );
}

export default ResumeSection;
