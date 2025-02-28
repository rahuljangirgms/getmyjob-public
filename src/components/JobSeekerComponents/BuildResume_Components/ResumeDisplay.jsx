import React from 'react'
import resimg1 from "./../../../assets/images/Resume Teamplates UI/Images.jpg";
import resimg2 from "./../../../assets/images/Resume Teamplates UI/ditto.jpg";
import resimg3 from "./../../../assets/images/Resume Teamplates UI/leafish.jpg";
import resimg4 from "./../../../assets/images/Resume Teamplates UI/onyx.jpg";
import resimg5 from "./../../../assets/images/Resume Teamplates UI/pikachu.jpg";
import resimg6 from "./../../../assets/images/Resume Teamplates UI/Images.jpg";
import ResumeCard from './../ReusableComponents/ResumeCard';


function ResumeDisplay() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <ResumeCard imageSrc={resimg1} isRecommended={true} />
            <ResumeCard imageSrc={resimg2} isPaid={true} />
            <ResumeCard imageSrc={resimg3} isRecommended={true} />
            <ResumeCard imageSrc={resimg4} isPaid={true} />
            <ResumeCard imageSrc={resimg5} isPaid={true} />
            <ResumeCard imageSrc={resimg6} isPaid={true} />
          </div>
    </div>
  )
}

export default ResumeDisplay
