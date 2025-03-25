import React, { useEffect } from "react";
import ResumeBox from "./ResumeBox";
import MasterResumeLogo from "./../../../../assets/images/resume-and-cv.png";
import ResumeLogo from "./../../../../assets/images/curriculum-vitae.png";
import { useDispatch, useSelector } from "react-redux";
import { getMasterResumeRequest } from "./../../../../store/slices/jobSeeker/master_Resume_Data/masterResumeSlice";
import { getResumeListRequest } from "./../../../../store/slices/jobSeeker/genrateResume/genrateResumeSlice";
import CardSkelaton from "./../../../../components/JobSeekerComponents/ReusableComponents/CardSkelaton";

function ResumeSection() {
  const Resumes = useSelector((state) => state.resume.resumes);

  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(getMasterResumeRequest());
    dispacth(getResumeListRequest());
  }, [dispacth]);

  const masterResumeJson = useSelector((state) => state.masterResumeJson.data);

  const { resumes, status } = useSelector((state) => state.genrateResume);

  //console.log("Resumes Frm GET requsest: ", resumes);

  const getResumeLoading = useSelector((state) => state.genrateResume.loading);

  //console.log("masterResumeJson:", masterResumeJson);
  const { loading } = useSelector((state) => state.masterResumeJson);

  //   console.log("Resumes: ", Resumes);

  return (
    <>
      {resumes.length > 0 ? (
        <div className="flex-1 bg-white flex p-6 rounded-lg shadow-md order-2 lg:order-1">
          <div className="flex justify-center flex-col">
            <h2 className="text-2xl font-bold text-black border-b pb-2 mb-4">
              Your Resumes
            </h2>

            {/* <h1 className="text-2xl font-bold text-gray-800 ">Your Profile</h1> */}

            {loading && masterResumeJson && getResumeLoading ? (
              <CardSkelaton />
            ) : (
              <div className="flex flex-row flex-wrap gap-4 justify-start">
                {/* <ResumeBox title={"Master Resume"} imgSrc={MasterResumeLogo} resumeData={masterResumeJson}  /> */}

                {resumes.map((res, index) => (
                  <ResumeBox
                    key={res.id}
                    id={res.id}
                    title={res.resume_name}
                    imgSrc={ResumeLogo}
                    resumeData={res.resume_json}
                    filePath={res.resume}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ResumeSection;
