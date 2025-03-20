import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import ReusableInputList from "./../../../components/JobSeekerComponents/ReusableComponents/ReusableInputList";
import ChipsComponent from "./../../../components/JobSeekerComponents/ReusableComponents/ChipsComponent";
import { FaSave } from "react-icons/fa";
import * as Yup from "yup"; // Import Yup for validation
import { useDispatch, useSelector } from "react-redux";
import {
  saveOtherDetails,
  editOtherDetails,
  setProfileComplete,
} from "./../../../store/slices/profileFormsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useOutletContext } from "react-router-dom"; // Import useOutletContext
import { processFinalData } from "./Form_Functions/processFinalData ";
import {
  getOtherDetailsRequest,
  addOtherDetailsRequest,
  clearMessage,
} from "./../../../store/slices/jobSeeker/Profile_Form/otherDetailsFormSlice";
import Loader from "./../../../components/JobSeekerComponents/ReusableComponents/Loader";
// import {getMasterResumeRequest} from './../../../store/slices/jobSeeker/master_Resume_Data/masterResumeSlice';
import {checkProfileCompleteRequest, clearProfileCheckMessage} from './../../../store/slices/jobSeeker/isProfileCompleted/isProfileCompleteSlice';

// Yup validation schema
const validationSchema = Yup.object().shape({
  summary: Yup.string().required("Summary is required"), // Make summary required
  skills: Yup.array().min(1, "At least one skill is required"), // Make skills (skills) required
  soft_skills: Yup.array().min(1, "At least one Soft skill is required"), // Make skills (skills) required
  achievement: Yup.array().notRequired(), // Optional field
  extra_curricular: Yup.array().notRequired(), // Optional field
});

function OtherDetailsForm() {

  const dispatch = useDispatch();

  
  // Other Details form State

  const { message, status, loading, data } = useSelector(
    (state) => state.otherDetailsForm
  );

  // is Profile Complete Message State

  const isProfileCompleteMsg = useSelector((state) => state.isProfileComplete.message);

  // is Profile Complete Status State

  const isProfileCompletedStatus = useSelector((state) => state.isProfileComplete.isComplete);



  useEffect(() => {
    if (Array.isArray(isProfileCompleteMsg) && isProfileCompleteMsg.length > 0) {
      isProfileCompleteMsg.forEach((msg) => {
        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
          className: "bg-red-50",
        });
      });

      // ✅ Clear messages after displaying
      dispatch(clearProfileCheckMessage());
    }
  }, [isProfileCompleteMsg, dispatch]);


  // Master Resume JSON Data

  // const masterResumeJson = useSelector((state) => state.masterResumeJson.data);
  // console.log("Master Resume JSON: ", masterResumeJson);



  useEffect(() => {
    dispatch(getOtherDetailsRequest());
  }, [dispatch]);


  console.log("Other Details frm API", data);


  useEffect(() => {
    if (message && status) {
      // ✅ Ensure status is true to avoid duplicate toast
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-50",
      });

      // ✅ Clear the message after displaying Toast
      dispatch(clearMessage());
    }
  }, [message,isProfileCompletedStatus ]); // ✅ Only runs when `message` changes

  const navigate = useNavigate();

  // Get the initial form values from the Redux store
  const otherDetails = useSelector((state) => state.profileForms.otherDetails);

// Ensure that the API data is properly parsed
const initialValues = 
data
  ? {
      summary: data.summary || "",
      skills: data.skills ? JSON.parse(data.skills) : [], // ✅ Parse stringified array
      soft_skills: data.soft_skills ? JSON.parse(data.soft_skills) : [], // ✅ Parse stringified array
      achievement: data.achievement ? JSON.parse(data.achievement) : [], // ✅ Parse stringified array
      extra_curricular: data.extra_curricular
        ? JSON.parse(data.extra_curricular)
        : [], // ✅ Parse stringified array
    }
  : {
      summary: "",
      skills: [],
      soft_skills: [],
      achievement: [],
      extra_curricular: [],
    };

  const { setIsFormDirty } = useOutletContext();

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsFormDirty(isDirty);
  }, [isDirty, setIsFormDirty]);

  // Submit handler: Save the form data to Redux
  const handleSubmit = (values) => {
    // Clean up the arrays to remove empty strings
    // const cleanedValues = {
    //   ...values,
    //   skills: values.skills.filter((item) => item.trim() !== ""),
    //   achievement: values.achievement.filter((item) => item.trim() !== ""),
    //   extra_curricular: values.extra_curricular.filter(
    //     (item) => item.trim() !== ""
    //   ),
    // };

    const cleanedValues = {
      ...values,
      skills: values.skills.filter((item) => item.trim() !== ""),
      achievement: values.achievement.filter((item) => item.trim() !== ""),
      extra_curricular: values.extra_curricular.filter(
        (item) => item.trim() !== ""
      ),
    };

    // console.log("FROM VALUES:: cleanedValues-" ,cleanedValues);

    dispatch(checkProfileCompleteRequest());


    //  POST to backend
    dispatch(addOtherDetailsRequest(cleanedValues));
  


    

    // dispatch(getMasterResumeRequest());

    // const isValid = processFinalData(dispatch);

    // if (!isValid) {
    //   console.log("Missing Fields:", missingFields);
    //   return;
    // }

    // console.log("Final Data Saved Successfully");

    // if(isValid){
    //   toast.success("Details saved successfully!", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     className: "bg-green-50",
    //   });
    // }
    // If editing an existing form, use editOtherDetails
    // if (values.id) {
    //   dispatch(editOtherDetails(cleanedValues));
    // } else {
    //   // If new form, save using saveOtherDetails
    //   dispatch(saveOtherDetails(cleanedValues));
    // }
    // dispatch(saveOtherDetails(cleanedValues));
    setIsFormDirty(false);
    // dispatch(setProfileComplete(true));
    // setTimeout(() => {
    //   navigate("/jobseeker/resume-builder");
    // }, 5000); // 3 seconds delay
  };

  const missingFields = useSelector(
    (state) => state.profileForms.missingFields
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => {
              const { values, setFieldValue, errors, touched, dirty } =
                formikProps;

              setIsDirty(dirty);

              return (
                <Form className="space-y-8 rounded-lg bg-white p-6 shadow-sm">
                  <div className="mx-auto w-full space-y-6">
                    {/* Brief Summary */}
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-700">
                        Brief Summary
                      </h3>
                      <textarea
                        name="summary"
                        placeholder="Please mention a brief summary of your career objective here..."
                        className="w-full border rounded-lg p-3 h-48 "
                        value={values.summary}
                        onChange={(e) =>
                          setFieldValue("summary", e.target.value)
                        }
                      ></textarea>
                      <p className="text-gray-500 text-sm text-right">
                        {values.summary.length} / 6000
                      </p>
                      {errors.summary && touched.summary && (
                        <div className="text-red-600 text-sm">
                          {errors.summary}
                        </div>
                      )}
                    </div>

                    {/* Key skills */}
                    <div>
                      <ChipsComponent
                        label="Enter Your Skills"
                        placeholder="Add Skills"
                        name="skills"
                        form={{ values, setFieldValue }}
                      />

                      {/* {errors.skills && touched.skills && (
                   <div className="text-red-600 text-sm">
                     {errors.skills}
                   </div>
                 )} */}
                    </div>

                    {/* Key skills */}
                    <div>
                      <ChipsComponent
                        label="Enter Your Soft Skills"
                        placeholder="Add Soft Skills e.g. Teamwork"
                        name="soft_skills"
                        form={{ values, setFieldValue }}
                      />

                      {/* {errors.skills && touched.skills && (
                   <div className="text-red-600 text-sm">
                     {errors.soft_skills}
                   </div>
                 )} */}
                    </div>

                    {/* achievement */}
                    <ReusableInputList
                      title="achievement"
                      btnText="Add Achievement"
                      name="achievement" // Field name in Formik
                      form={{ values, setFieldValue }} // Formik helpers
                      error={errors.achievement}
                    />


                    {/* Awards */}
                    {/* <ReusableInputList
                 title="Awards"
                 btnText="Add Award"
                 name="awards" // Field name in Formik
                 form={{ values, setFieldValue }} // Formik helpers
                 error={errors.awards}
               /> */}

                    {/* Extra Curricular */}
                    <ReusableInputList
                      title="Extra Curricular"
                      btnText="Add Activity"
                      name="extra_curricular" // Field name in Formik
                      form={{ values, setFieldValue }} // Formik helpers
                      error={errors.extra_curricular}
                    />


                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        <FaSave />
                        Save
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default OtherDetailsForm;
