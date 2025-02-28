import React from "react";
import { IoMdClose } from "react-icons/io";
import InputField from "./../ReusableComponents/InputField";
import { Form, Formik, Field } from "formik";
import ChipsComponent from "./../ReusableComponents/ChipsComponent";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  saveTempTraining,
  editTempTraining,
  editFinalTraining,
} from "./../../../store/slices/profileFormsSlice";

// ✅ Validation Schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Training Name is required"),
  instituteName: Yup.string().required("Institute Name is required"),
  from: Yup.date()
     .required("Start date is required"),
   
   to: Yup.date()
     .nullable()
     .min(Yup.ref('from'), "End date should be greater than Start date"), 
  skills: Yup.array().min(1, "At least one skill is required"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description must be at most 500 characters"),
});

function TrainingModal({
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
              {isEditing ? "Edit Training Details" : "Add Training Details"}
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
              initialValues={{
                name: initialValues?.name || "",
                instituteName: initialValues?.instituteName || "",
                from: initialValues?.from || "",
                to: initialValues?.to || "",
                skills: initialValues?.skills || [],
                description: initialValues?.description || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                try {
                  // If editing
                  if (isEditing) {
                    if (isEditingTemp) {
                      dispatch(
                        editTempTraining({
                          index: editIndex,
                          updatedData: values,
                        })
                      );
                    } else {
                      dispatch(
                        editFinalTraining({
                          index: editIndex,
                          updatedData: values,
                        })
                      );
                    }
                  } else {
                    // If adding new training
                    dispatch(saveTempTraining(values));
                  }

                  setSubmitting(false);
                  onSubmit(values);
                  onClose(); // Close modal after submission
                } catch (error) {
                  console.error("Error submitting form:", error);
                }
              }}
            >
              {({ handleSubmit }) => (
                <Form
                  className="grid grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  {/* Training Name */}
                  <Field name="name">
                    {({ field }) => <InputField label="Training Name" {...field} />}
                  </Field>

                  {/* Institute Name */}
                  <Field name="instituteName">
                    {({ field }) => <InputField label="Institute Name / Platform Name" {...field} />}
                  </Field>

                  {/* Start Date */}
                  <Field name="from">
                    {({ field }) => <InputField label="Start Date" type="date" {...field} />}
                  </Field>

                  {/* End Date */}
                  <Field name="to">
                    {({ field }) => <InputField label="End Date" type="date" {...field} />}
                  </Field>

                  {/* Skills */}
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
                  </div>

                  {/* Description */}
                  <div className="col-span-2 grid grid-cols-1 gap-4 items-center">
                    <Field name="description">
                      {({ field }) => <InputField label="Description" {...field} />}
                    </Field>
                  </div>

                  {/* Buttons */}
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

export default TrainingModal;
