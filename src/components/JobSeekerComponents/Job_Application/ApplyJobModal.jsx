import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { getResumeListRequest } from "./../../../store/slices/jobSeeker/genrateResume/genrateResumeSlice";
import { useDispatch, useSelector } from "react-redux";
import ResumeCardSm from "./ResumeCardSm";
import ResumeCardSmSkeleton from "./ResumeCardSmSkeleton";
import { applyJobRequest, clearJobApplyStatus } from "./../../../store/slices/jobSeeker/Job_Apply/jobApplySlice";
import { toast } from 'react-toastify';

function ApplyJobModal({ onClose, id, bash_id }) {
  const dispatch = useDispatch();

  const [selectedResId, setSelectedResId] = useState(null);

  useEffect(() => {
    dispatch(getResumeListRequest());
  }, [dispatch]);

  const { loading, resumes } = useSelector((state) => state.genrateResume);

  const { message, success } = useSelector((state) => state.jobSeekerJobApply);

  // useEffect(() => {
  //   if (message) {
  //     toast.success(message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       className: "bg-green-50 text-green-700",
  //     });
  //     dispatch(clearJobApplyStatus());
  //   }
  // }, [message]);

  // Handle Submit Job Application Button

  const handleSubmit = () => {

    console.log("handle submit");
    dispatch(
      applyJobRequest({
        id: id,
        bash_id: bash_id,
        resume_id: selectedResId,
      })
    );
    if(success){
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="relative p-4 w-full max-w-4xl h-[450px] lg:h-auto bg-white rounded-lg shadow-lg m-5 overflow-y-scroll">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">Select Your Resume</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        <div className="flex gap-2 flex-row flex-wrap justify-center my-6">
          {loading ? (
            <div className="flex gap-2 flex-row flex-wrap justify-center">
              <ResumeCardSmSkeleton />
              <ResumeCardSmSkeleton />
              <ResumeCardSmSkeleton />
            </div>
          ) : (
            resumes.map((res) => (
              <ResumeCardSm
                key={res.id}
                title={res.resume_name}
                resId={res.id}
                filePath={res.resume}
                onSelect={() => setSelectedResId(res.id)}
                selectedResId={selectedResId}
              />
            ))
          )}
        </div>

        <div className="flex justify-center lg:justify-end bottom-0">
         {selectedResId && <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleSubmit()}
          >
            Submit My Job Application
          </button>}
        </div>
      </div>
    </div>
  );
}

export default ApplyJobModal;
