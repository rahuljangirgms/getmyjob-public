import React, { useEffect } from "react";
import InputField from "../ReusableComponents/InputField";
import DropDown from "./../ReusableComponents/DropDown";
import { Form, Formik, Field, useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import * as Yup from "yup";
// import {saveTempEducationalDetails, editTempEducationalDetails, editFinalEducationalDetails} from './../../../store/slices/profileFormsSlice';

const validationSchema = Yup.object().shape({
  stream: Yup.string().required("Stream is required"),
  college: Yup.string().required("College is required"),
  collegeCity: Yup.string().required("College City is required"),
  joiningYear: Yup.number()
    .required("Joining Year is required")
    .test(
      "is-less-than-completion",
      "Joining Year must be less than Completion Year",
      function (value) {
        const { completionYear } = this.parent;
        return !completionYear || value < completionYear;
      }
    ),
  completionYear: Yup.number()
    .nullable()
    .test(
      "is-greater-than-joining",
      "Completion Year must be greater than Joining Year",
      function (value) {
        const { joiningYear } = this.parent;
        return !value || value > joiningYear;
      }
    ),
  graduationType: Yup.string().required("Graduation Type is required"),
  aggregateType: Yup.string().required("Aggregate Type is required"),
  aggregate: Yup.number()
    .required("Aggregate is required")
    .test(
      "is-less-than-max",
      "Aggregate must be less than Max marks",
      function (value) {
        const { max } = this.parent;
        return !max || value < max;
      }
    ),
  max: Yup.number()
    .required("Max marks are required")
    .test(
      "is-greater-than-aggregate",
      "Max marks must be greater than Aggregate",
      function (value) {
        const { aggregate } = this.parent;
        return !aggregate || value > aggregate;
      }
    ),
  activeBacklogs: Yup.number().required("Active Backlogs is required"),
  currentlyStudying: Yup.boolean(),
});

function EducationDetailsModal({
  onClose,
  onSubmit,
  initialValues,
  isEditing,
  title,
}) {
  const dispatch = useDispatch();


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isEditing ? `Edit ${title} Details` : `Add ${title} Details`}
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
              initialValues={{
                qualification: title   || "",
                stream: initialValues?.stream || "",
                college: initialValues?.college || "",
                collegeCity: initialValues?.collegeCity || "",
                joiningYear: initialValues?.joiningYear || "",
                completionYear: initialValues?.completionYear || "",
                graduationType: initialValues?.graduationType || "",
                aggregateType: initialValues?.aggregateType || "",
                aggregate: initialValues?.aggregate || "",
                max: initialValues?.max || "",
                activeBacklogs: initialValues?.activeBacklogs || "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit }) => (
                <Form
                  className="grid grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  <Field name="qualification">
                    {({ field }) => (
                      <InputField
                        label="Qualification"
                        {...field}
                        value={field.value}  // Set default value from prop
                        readOnly={true} // Make it readonly
                      />
                    )}
                  </Field>

                  <Field name="stream">
                    {({ field }) => <InputField label="Stream" {...field} />}
                  </Field>

                  <Field name="college">
                    {({ field }) => (
                      <InputField label="College / School" {...field} />
                    )}
                  </Field>

                  <Field name="collegeCity">
                    {({ field }) => (
                      <InputField label="College City" {...field} />
                    )}
                  </Field>

                  <Field name="joiningYear">
                    {({ field }) => (
                      <InputField
                        label="Joining Year"
                        type="number"
                        {...field}
                      />
                    )}
                  </Field>

                  <Field name="completionYear">
                    {({ field }) => (
                      <InputField
                        label="Completion Year"
                        type="number"
                        {...field}
                      />
                    )}
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
                    {({ field }) => (
                      <InputField label="Aggregate" type="number" {...field} />
                    )}
                  </Field>

                  <Field name="max">
                    {({ field }) => (
                      <InputField label="Max" type="number" {...field} />
                    )}
                  </Field>

                  <Field name="activeBacklogs">
                    {({ field }) => (
                      <InputField
                        label="Active Backlogs"
                        type="number"
                        {...field}
                      />
                    )}
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
                      className="ms-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
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

export default EducationDetailsModal;
