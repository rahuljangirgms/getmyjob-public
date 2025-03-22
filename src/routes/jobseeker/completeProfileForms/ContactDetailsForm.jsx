import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "./../../../components/JobSeekerComponents/InputField";
import { FaSave } from "react-icons/fa";
import {saveContactDetails} from './../../../store/slices/profileFormsSlice';
import { useDispatch, useSelector } from 'react-redux';


const validationSchema = Yup.object({
  secondaryPhone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Secondary phone number is required"),
  otherEmail: Yup.string()
    .email("Invalid email address")
    .required("Other email is required"),
  linkedInUrl: Yup.string().url("Invalid URL"), // Optional
  githubUrl: Yup.string().url("Invalid URL"), // Optional
});


function ContactDetailsForm() {

  const savedContactDetails = useSelector((state) => state.profileForms.contactDetails);
  
const initialValues = {
  secondaryPhone: savedContactDetails.secondaryPhone|| "",
  otherEmail: savedContactDetails.otherEmail  || "",
  linkedInUrl: savedContactDetails.linkedInUrl  ||"", // Optional field
  githubUrl: savedContactDetails.githubUrl || "", // Optional field
};


  const dispatch = useDispatch();



  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form submitted with values:", values);
    dispatch(saveContactDetails(values));
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <div className="mx-auto w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false} // Run validation only on submit
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8 rounded-lg bg-white p-6 shadow-sm">
              <InputField label="Secondary Phone Number" name="secondaryPhone" />
              <InputField label="Other Email" name="otherEmail" type="email" />
              <InputField
                  optional={true}
                  label="LinkedIn URL"
                  name="linkedInUrl"
                  type="url"
                  placeholder="https://www.linkedin.com/in/your-profile"
                /> 
               <InputField
                  optional={true}
                  label="GitHub URL"
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/your-username"
                />
    
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  <FaSave />
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ContactDetailsForm;
