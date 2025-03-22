import React from "react";
import { IoMdClose } from "react-icons/io";
import InputField from "./../ReusableComponents/InputField";
import { Form, Formik, Field } from "formik";
import ChipsComponent from "./../ReusableComponents/ChipsComponent";
import * as Yup from "yup";
import { useDispatch } from "react-redux";


import {saveTempResearchPaperDetails} from './../../../store/slices/jobSeeker/Profile_Form/researchPaperSlice';

// ✅ Validation Schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Research Paper Name is required"),
  publicationName: Yup.string().required("Publication Name is required"),
  publicationDate: Yup.date().required("Publication Date is required"),
  mentor: Yup.string().nullable(),
  authorsCount: Yup.number()
    .typeError("Authors count must be a number")
    .positive("Must be a positive number")
    .required("Number of authors is required"),
  status: Yup.string().required("Status of publication is required"),
  skills: Yup.array()
    .min(1, "At least one skill is required")
    .required("Skills are required"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description must be at most 500 characters"),
});

function ResearchPaperModal({
  onClose,
  onSubmit,
  initialValues,
  isEditing,
  isEditingTemp,
  editIndex,
}) {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isEditing ? "Edit Research Paper" : "Add Research Paper"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <Formik
              enableReinitialize
              initialValues={initialValues || {
                name: "",
                publicationName: "",
                publicationDate: "",
                mentor: "",
                authorsCount: "",
                statuys: "",
                skills: [],
                description: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                try {
                  if (isEditing) {
                    onSubmit(values);
                  } else {
                    // ✅ Save new research paper
                    dispatch(saveTempResearchPaperDetails(values));
                  }
                  setSubmitting(false);
                  onClose(); // ✅ Close modal
                } catch (error) {
                  console.error("Error submitting form:", error);
                }
              }}
            >
              {({ handleSubmit }) => (
                <Form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                  <Field name="name">
                    {({ field }) => <InputField label="Research Paper Name" {...field} />}
                  </Field>
                  <Field name="publicationName">
                    {({ field }) => <InputField label="Publication Name" {...field} />}
                  </Field>
                  <Field name="publicationDate">
                    {({ field }) => <InputField label="Publication Date" type="date" {...field} />}
                  </Field>
                  <Field name="mentor">
                    {({ field }) => <InputField label="Mentor" {...field} />}
                  </Field>
                  <Field name="authorsCount">
                    {({ field }) => <InputField label="No. of Authors" {...field} />}
                  </Field>
                  <Field name="status">
                    {({ field }) => <InputField label="Status" {...field} />}
                  </Field>
                  <div className="col-span-2 grid grid-cols-1 gap-4 items-center">
                    <Field name="skills">
                      {({ field, form }) => (
                        <ChipsComponent
                          label="Key Skills / Expertise Involved"
                          name="skills"
                          placeholder="Enter Your Skills Here"
                          form={form}
                        />
                      )}
                    </Field>
                    <Field name="description">
                      {({ field }) => <InputField label="Description" {...field} />}
                    </Field>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ms-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {isEditing ? "Update" : "Save"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchPaperModal;
