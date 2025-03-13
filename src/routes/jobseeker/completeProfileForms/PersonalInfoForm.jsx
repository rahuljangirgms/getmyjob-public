import React, { useState, useEffect, use } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaSave } from "react-icons/fa";
import InputField from "../../../components/JobSeekerComponents/ReusableComponents/InputField";
import DropDown from "./../../../components/JobSeekerComponents/ReusableComponents/DropDown";
import FileUploadField from "../../../components/JobSeekerComponents/ReusableComponents/FileUploadField";
import TextAreaField from "../../../components/JobSeekerComponents/ReusableComponents/TextAreaField";
import MultiSelectField from "./../../../components/JobSeekerComponents/ReusableComponents/MultiSelectField";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalInformation } from "./../../../store/slices/profileFormsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext
import {
  getpersonalInfoRequest,
  postpersonalInfoRequest,
} from "./../../../store/slices/jobSeeker/Profile_Form/personalInfoSlice";
import Loader from './../../../components/JobSeekerComponents/ReusableComponents/Loader';


// Validation Schema using Yup
const validationSchema = Yup.object({
  profilePicture: Yup.string().required("Profile picture is required"),
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string().required("Middle name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Phone number is required"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .test("is-16-years-old", "You must be at least 16 years old", (value) => {
      const today = new Date();
      const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 16)); // Subtract 16 years from today

      // Ensure that the user is at least 16 years old
      return value && value <= minAgeDate;
    })
    .test(
      "is-not-in-future",
      "Date of birth cannot be in the future",
      (value) => {
        const today = new Date();
        return value && value <= today; // Ensure that the date of birth is not in the future
      }
    ),
  gender: Yup.string().required("Gender is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  addressLine1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  zipCode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits")
    .required("ZIP code is required"),
  course: Yup.string().required("Course is required"),
  specialization: Yup.string().required("Primary specialization is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  medicalHistory: Yup.string().required("Medical history is required"),
  disability: Yup.string().required("Disability status is required"),
  knownLanguages: Yup.array()
    .min(1, "Select at least one language")
    .required("Known languages are required"),
  totalExpYear: Yup.string().required("Total Years of Experience Required"),
  totalExpMonth: Yup.string().required("Total Months of Experience Required"),
});

function PersonalInfoForm() {
  const dispatch = useDispatch();
  const { setIsFormDirty } = useOutletContext();

  const [isDirty, setIsDirty] = useState(false);

  // const {user} = useSelector((state) => state.jobSeekerAuth);
  const {user} = JSON.parse(localStorage.getItem("auth")); 


  // console.log("USER DATA : ", user);

  useEffect(() => {
    setIsFormDirty(isDirty);
  }, [isDirty, setIsFormDirty]);

  useEffect(() => {
    dispatch(getpersonalInfoRequest());
  }, [dispatch]); // Runs only once when component mounts

  const profileDataFrmApi = useSelector((state) => state.personalInfoForm.data);

  const {status,loading,error} = useSelector((state) => state.personalInfoForm);

  // console.log("Data: ",profileDataFrmApi);

  // const personalInformation = useSelector(
  //   (state) => state.profileForms.personalInformation
  // );



  // Initial Values
  const initialValues = {
    profilePicture: profileDataFrmApi?.profile_picture || null,
    firstName: profileDataFrmApi?.first_name || "",
    middleName: profileDataFrmApi?.middle_name || "",
    lastName: profileDataFrmApi?.last_name || "",
    email: user?.email || "",
    phoneNumber: user?.mobile || "",
    dateOfBirth: profileDataFrmApi?.dob || "",
    gender: profileDataFrmApi?.gender || "",
    maritalStatus: profileDataFrmApi?.marital_status || "",
    addressLine1: profileDataFrmApi?.location || "",
    city: profileDataFrmApi?.city || "",
    state: profileDataFrmApi?.state || "",
    country: profileDataFrmApi?.country || "",
    zipCode: profileDataFrmApi?.zipcode || "",
    course: profileDataFrmApi?.course || "",
    specialization: profileDataFrmApi?.primary_specialization || "",
    bloodGroup: profileDataFrmApi?.blood_group || "",
    medicalHistory: profileDataFrmApi?.medical_history || "",
    disability: profileDataFrmApi?.disability || "",
    knownLanguages: profileDataFrmApi?.language_known
      ? profileDataFrmApi?.language_known.split(",")
      : [],
    totalExpYear: profileDataFrmApi?.total_year_exp || "",
    totalExpMonth: profileDataFrmApi?.total_month_exp || "",
  };

  const handleSubmit = (values, { setSubmitting, setErrors, validateForm }) => {
    // Saving form data
    // dispatch(savePersonalInformation(values));

    console.log("Personal Data: ", values);
    dispatch(postpersonalInfoRequest(values));
    // dispatch(getpersonalInfoRequest());

    // Show success message
    if(status){
       toast.success("Personal information saved successfully!", {
      position: "top-right",
      autoClose: 5000,
      className: "bg-green-50",
    });
    }
    setSubmitting(false);
    setIsFormDirty(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full p-8">

    <ToastContainer />

     {loading ? <Loader/> : <div className="mx-auto w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          validateOnChange={true} // Ensures validation runs on change
          validateOnBlur={true} // Ensures validation runs on blur
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            const { setFieldValue, errors, dirty, isSubmitting } = formikProps;

            setIsDirty(dirty);

            console.log("error",errors)

            return (
              <Form className="space-y-8 rounded-lg bg-white p-6 shadow-sm">
                {/* Profile Picture Upload */}
                <FileUploadField
                  label="Profile Picture"
                  name="profilePicture"
                  setFieldValue={setFieldValue}
                  profileImg={profileDataFrmApi?.profile_picture} // Pass the initial image URL
                />
                {/* Personal Information */}
                <div className="grid gap-6 md:grid-cols-3">
                  <InputField label="First Name" name="firstName" />
                  <InputField label="Middle Name" name="middleName" />
                  <InputField label="Last Name" name="lastName" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <InputField label="Email Address" name="email" type="email" isReadOnly={true} />
                  <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    isReadOnly={true}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <InputField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                  />
                  <DropDown
                    label="Gender"
                    name="gender"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                  <DropDown
                    label="Marital Status"
                    name="maritalStatus"
                    options={[
                      { label: "Single", value: "single" },
                      { label: "Married", value: "married" },
                      { label: "Divorced", value: "divorced" },
                    ]}
                  />
                </div>

                {/* Address Section */}
                <div className="grid gap-6 md:grid-cols-2">
                  <InputField label="Address Line 1" name="addressLine1" />
                  <DropDown
                    label="Country"
                    name="country"
                    options={[
                      { label: "India", value: "IN" },
                      { label: "United States", value: "US" },
                      { label: "United Kingdom", value: "UK" },
                    ]}
                  />
                  <InputField label="State/Province" name="state" />
                  <InputField label="City" name="city" />
                  <InputField label="ZIP/Postal Code" name="zipCode" />
                </div>

                {/* Total Experince  */}
                <p className="font-medium text-gray-700">
                  Total Experience
                  <span className="text-red-500">*</span>
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                  <DropDown
                    label="Years"
                    name="totalExpYear"
                    options={[
                      { label: "0 Years", value: "0" }, // Start from 0
                      ...Array.from({ length: 30 }, (_, i) => ({
                        label: `${i + 1} ${i + 1 === 1 ? "Year" : "Years"}`,
                        value: `${i + 1}`,
                      })),
                      { label: "30+ Years", value: "30+" }, // Special case for 30+
                    ]}
                  />

                  <DropDown
                    label="Months"
                    name="totalExpMonth"
                    options={[
                      { label: "0 Months", value: "0" }, // Start from 0
                      ...Array.from({ length: 11 }, (_, i) => ({
                        label: `${i + 1} ${i + 1 === 1 ? "Month" : "Months"}`,
                        value: `${i + 1}`,
                      })),
                    ]}
                  />
                </div>

                {/* Education & Specialization */}
                <div className="grid gap-6 md:grid-cols-2">
                  <InputField label="Course" name="course" />
                  <InputField
                    label="Primary Specialization"
                    name="specialization"
                  />
                </div>

                {/* Additional Information */}
                <div className="grid gap-6 md:grid-cols-2">
                  <DropDown
                    label="Blood Group"
                    name="bloodGroup"
                    options={[
                      { label: "A+", value: "A+" },
                      { label: "B+", value: "B+" },
                      { label: "O+", value: "O+" },
                    ]}
                  />
                  <DropDown
                    label="Disability"
                    name="disability"
                    options={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                  />
                </div>

                {/* Multi-Select */}
                <MultiSelectField
                  label="Known Languages"
                  name="knownLanguages"
                  options={[
                    { label: "English", value: "english" },
                    { label: "Hindi", value: "hindi" },
                    { label: "Marathi", value: "marathi" },
                  ]}
                />

                {/* Text Area */}
                <TextAreaField label="Medical History" name="medicalHistory" />

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                   disabled={isSubmitting || Object.keys(errors).length > 0}
                    type="submit"
                    // disabled={isSubmitting || !isValid}
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    <FaSave />
                    Save
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>}
    </div>
  );
}

export default PersonalInfoForm;
