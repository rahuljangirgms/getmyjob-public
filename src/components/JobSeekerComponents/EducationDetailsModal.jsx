import React from "react";
import InputField from "./InputField";
import DropDown from "./DropDown";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { saveEducationalDetails } from "./../../store/slices/profileFormsSlice";
import { IoMdClose } from "react-icons/io";
  
function EducationDetailsModal({ onClose, title, onSubmit, initialData }) {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {initialData ? `Edit ${title} Details` : `Add ${title} Details`}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <IoMdClose size={30}/>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <Formik
              initialValues={{
                degree: initialData?.degree || "",
                stream: initialData?.stream || "",
                college: initialData?.college || "",
                collegeCity: initialData?.collegeCity || "",
                joiningYear: initialData?.joiningYear || "",
                completionYear: initialData?.completionYear || "",
                graduationType: initialData?.graduationType || "",
                aggregateType: initialData?.aggregateType || "",
                aggregate: initialData?.aggregate || "",
                max: initialData?.max || "",
                activeBacklogs: initialData?.activeBacklogs || "",
              }}
              onSubmit={(values) => {
                console.log("Form Submitted: ", values);

                // Determine which field to update based on title
                const updatedEducation = {
                  [title === "Degree / Graduation"
                    ? "degreeGraduation"
                    : title === "12th Standard (Higher / Senior Secondary)"
                    ? "twelfthDetails"
                    : "tenthDetails"]: values,
                };

                dispatch(saveEducationalDetails(updatedEducation));
                onSubmit(values);
                onClose();
              }}
            >
              {({ handleSubmit }) => (
                <Form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                  <Field name="degree">
                    {({ field }) => <InputField label="Degree" {...field} />}
                  </Field>
                  <Field name="stream">
                    {({ field }) => <InputField label="Stream" {...field} />}
                  </Field>
                  <Field name="college">
                    {({ field }) => <InputField label="College / School" {...field} />}
                  </Field>
                  <Field name="collegeCity">
                    {({ field }) => <InputField label="College City" {...field} />}
                  </Field>
                  <Field name="joiningYear">
                    {({ field }) => <InputField label="Joining Year" type="number" {...field} />}
                  </Field>
                  <Field name="completionYear">
                    {({ field }) => <InputField label="Completion Year" type="number" {...field} />}
                  </Field>
                  <Field name="graduationType">
                    {({ field }) => (
                      <DropDown
                        label="Graduation Type"
                        {...field}
                        options={[
                          { label: "Full-time", value: "fulltime" },
                          { label: "Part-time", value: "parttime" },
                          { label: "Correspondence", value: "correspondence" },
                        ]}
                      />
                    )}
                  </Field>
                  <Field name="aggregateType">
                    {({ field }) => (
                      <DropDown
                        label="Aggregate Type"
                        {...field}
                        options={[
                          { label: "Percentage", value: "percentage" },
                          { label: "CGPA", value: "cgpa" },
                        ]}
                      />
                    )}
                  </Field>
                  <Field name="aggregate">
                    {({ field }) => <InputField label="Aggregate" type="number" {...field} />}
                  </Field>
                  <Field name="max">
                    {({ field }) => <InputField label="Max" type="number" {...field} />}
                  </Field>
                  <Field name="activeBacklogs">
                    {({ field }) => <InputField label="Active Backlogs" type="number" {...field} />}
                  </Field>
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
                      {initialData ? "Update" : "Save"}
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

export default EducationDetailsModal;
