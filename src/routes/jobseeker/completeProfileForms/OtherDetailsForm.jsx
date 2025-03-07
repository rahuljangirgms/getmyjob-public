import React,{useEffect,useState} from "react";
import { Formik, Form } from "formik";
import ReusableInputList from "./../../../components/JobSeekerComponents/ReusableComponents/ReusableInputList";
import ChipsComponent from "./../../../components/JobSeekerComponents/ReusableComponents/ChipsComponent";
import { FaSave } from "react-icons/fa";
import * as Yup from "yup"; // Import Yup for validation
import { useDispatch, useSelector } from "react-redux";
import {
  saveOtherDetails,
  editOtherDetails,
  setProfileComplete
} from "./../../../store/slices/profileFormsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useOutletContext } from "react-router-dom"; // Import useOutletContext
import { processFinalData } from './Form_Functions/processFinalData ';


// Yup validation schema
const validationSchema = Yup.object().shape({
  summary: Yup.string().required("Summary is required"), // Make summary required
  expertise: Yup.array().min(1, "At least one skill is required"), // Make expertise (skills) required
  softSkills: Yup.array().min(1, "At least one Soft skill is required"), // Make expertise (skills) required
  achievements: Yup.array().notRequired(), // Optional field
  extraCurricular: Yup.array().notRequired(), // Optional field
});

function OtherDetailsForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Get the initial form values from the Redux store
  const otherDetails = useSelector((state) => state.profileForms.otherDetails);

  // Fallback to default values if otherDetails is empty
  const initialValues = otherDetails || {
    summary: "",
    expertise: [],
    softSkills:[],
    achievements: [],
    extraCurricular: [],
  };

  const { setIsFormDirty } = useOutletContext();

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsFormDirty(isDirty);
  }, [isDirty, setIsFormDirty]);

  // Submit handler: Save the form data to Redux
  const handleSubmit = (values) => {
    // Clean up the arrays to remove empty strings
    const cleanedValues = {
      ...values,
      expertise: values.expertise.filter((item) => item.trim() !== ""),
      achievements: values.achievements.filter((item) => item.trim() !== ""),
      extraCurricular: values.extraCurricular.filter(
        (item) => item.trim() !== ""
      ),

    };

    const isValid = processFinalData(dispatch);

    if (!isValid) {
      console.log("Missing Fields:", missingFields);
      return;
    }

    console.log("Final Data Saved Successfully");

    if(isValid){
      toast.success("Details saved successfully!", {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-50",
      });
    }
    // If editing an existing form, use editOtherDetails
    if (values.id) {
      dispatch(editOtherDetails(cleanedValues));
    } else {
      // If new form, save using saveOtherDetails
      dispatch(saveOtherDetails(cleanedValues));
    }
    setIsFormDirty(false); 
    console.log("Form Submitted:", cleanedValues); // Log the cleaned data
    dispatch(setProfileComplete(true));
    setTimeout(() => {
      navigate('/jobseeker/resume-builder');
    }, 5000); // 3 seconds delay
  };


  const missingFields = useSelector((state) => state.profileForms.missingFields);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <ToastContainer />
      <div className="mx-auto w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {

            const { values, setFieldValue, errors, touched, dirty } = formikProps; 

            setIsDirty(dirty);  

            return(
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
                    onChange={(e) => setFieldValue("summary", e.target.value)}
                  ></textarea>
                  <p className="text-gray-500 text-sm text-right">
                    {values.summary.length} / 6000
                  </p>
                  {errors.summary && touched.summary && (
                    <div className="text-red-600 text-sm">{errors.summary}</div>
                  )}
                </div>

                {/* Key Expertise */}
                <div>
                  <ChipsComponent
                    label="Enter Your Skills"
                    placeholder="Add Skills"
                    name="expertise"
                    form={{ values, setFieldValue }}
                  />

                  {/* {errors.expertise && touched.expertise && (
                    <div className="text-red-600 text-sm">
                      {errors.expertise}
                    </div>
                  )} */}
                </div>


                {/* Key Expertise */}
                <div>
                  <ChipsComponent
                    label="Enter Your Soft Skills"
                    placeholder="Add Soft Skills e.g. Teamwork"
                    name="softSkills"
                    form={{ values, setFieldValue }}
                  />

                  {/* {errors.expertise && touched.expertise && (
                    <div className="text-red-600 text-sm">
                      {errors.softSkills}
                    </div>
                  )} */}
                </div>

                {/* Achievements */}
                <ReusableInputList
                  title="Achievements"
                  btnText="Add Achievement"
                  name="achievements" // Field name in Formik
                  form={{ values, setFieldValue }} // Formik helpers
                  error={errors.achievements}
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
                  name="extraCurricular" // Field name in Formik
                  form={{ values, setFieldValue }} // Formik helpers
                  error={errors.extraCurricular}
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
            )
          }}
        </Formik>

        
      </div>
    </div>
  );
}

export default OtherDetailsForm;
