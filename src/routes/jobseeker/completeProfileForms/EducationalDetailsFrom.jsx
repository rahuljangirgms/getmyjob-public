import React, { useState } from "react";
import EducationAddBox from "./../../../components/JobSeekerComponents/EducationAddBox";
import EducationDetailsDisplay from "./../../../components/JobSeekerComponents/EducationDetailsDisplay";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {saveEducationalDetails,saveTenthDetails} from './../../../store/slices/profileFormsSlice';

function EducationalDetailsFrom() {

  const [tenthData, setTenthData] = useState(null);
  const [twelfthData, setTwelfthData] = useState(null);
  const [graduationData, setGraduationData] = useState(null);

  const dispatch = useDispatch();

  const degreeDetails = useSelector(state => state.profileForms.educationalDetails.degreeGraduation);

  //console.log("Degree Details: ", degreeDetails);
  const twelthDetails = useSelector(state => state.profileForms.educationalDetails.twelfthDetails);
  const tenthDetails = useSelector(state => state.profileForms.educationalDetails.tenthDetails);


  const handleSaveDetails = () =>{
    const combinedEducationalDetails = {
      degreeDetails,
      twelthDetails,
      tenthDetails,
    };


    //dispatch(saveEducationalDetails(combinedEducationalDetails));
  }


  const demodata = {
    degree: "10th SSC",
    stream: "",
    college:
      "Genba Sopanrao Moze College Of Arts, Science & Commerce Yerawada, Pune - 411006",
    collegeCity: "Pune",
    joiningYear: "2017",
    completionYear: "2018",
    graduationType: "Full Time",
    aggregateType: "Percentage",
    aggregate: "87",
    max: "100",
    activeBacklogs: "0",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <div className="mx-auto w-full">

      <div className="flex justify-end">
          <button
            onClick={handleSaveDetails}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 mb-4"
          >
            <FaSave />
            Save
          </button>
        </div>


        {/* <EducationDetailsDisplay
          title={"Masters in Bussiness Intelligence"}
          data={demodata}
        /> */}

        {/* For Degree / Graduation */}
        {degreeDetails && Object.keys(degreeDetails).length > 0 ? (
          <EducationDetailsDisplay
            title={"Degree / Graduation"}
            data={degreeDetails}
          />
        ) : (
          <EducationAddBox
            title={"Degree / Graduation"}
            onSubmit={(data) => {
              setGraduationData(data);
              dispatch(saveEducationalDetails({ degreeGraduation: data }));
            }}
            
          />
        )}

        {/* for 12th HSC  */}

        {twelthDetails && Object.keys(twelthDetails).length > 0 ? (
          <EducationDetailsDisplay
            title={"12th Standard (Higher / Senior Secondary)"}
            data={twelthDetails}
          />
        ) : (
          <EducationAddBox
            title={"12th Standard (Higher / Senior Secondary)"}
            onSubmit={(data) => {
              setTwelfthData(data);
              dispatch(saveEducationalDetails({ twelfthDetails: data }));
            }}
          />
        )}

        {/* for 10th SSC */}

        {tenthDetails && Object.keys(tenthDetails).length > 0 ? (
          <EducationDetailsDisplay
            title={"10th Standard (Secondary)"}
            data={tenthDetails}
          />
        ) : (
          <EducationAddBox
            title={"10th Standard (Secondary)"}
            onSubmit={(data) => {
              setTenthData(data);
              dispatch(saveTenthDetails(data));
            }}
          />
        )}

        {/*  Modal Here */}

       
      </div>
    </div>
  );
}

export default EducationalDetailsFrom;
