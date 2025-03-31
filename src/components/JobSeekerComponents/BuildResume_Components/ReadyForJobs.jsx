import React, { useEffect } from 'react'
import ReadyImage from './../../../assets/images/Ready-for-job.jpg'
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function ReadyForJobs() {

  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
      navigate('/jobseeker/trail-quiz');
    },3000)
  },[])

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-up">
      
      <div className="flex justify-end">
      <button type="button" className="text-white bg-gradient-to-r flex items-center gap-2 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-30 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
      onClick={()=>navigate('/jobseeker/trail-quiz')}>Apply For Jobs Now <FaArrowRight size={20}/></button>
      </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

       

          <div className="space-y-6">
            <h3 className="font-medium text-xl">Your Resume is Ready!</h3>
            <p className="text-gray-600">
              Your professional resume is now ready to help you land your dream job. 
              Here are some next steps you can take:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-sm">Download your resume as PDF</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-sm">Email your resume to recruiters</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-sm">Apply to jobs directly from our platform</span>
              </li>
            </ul>
            <div className="pt-4">
              <button className="px-6 py-3 bg-brand-blue text-white font-medium rounded-lg shadow-sm hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02]">
                Browse Job Listings
              </button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          <img src={ReadyImage}/>
          </div>
        </div>
      </div>
      {/* <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Share your resume with potential employers or save it for future use.
        </p>
      </div> */}
    </div>
  </div>
  )
}

export default ReadyForJobs
