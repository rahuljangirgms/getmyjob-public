import React from "react";
import { IoMdClose } from "react-icons/io";
import InputField from "./InputField";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChipsComponent from "./ChipsComponent";
import { saveTempProfessionalDetails } from "./../../store/slices/profileFormsSlice";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  designation: Yup.string().required("Designation is required"),
  organisation: Yup.string().required("Organisation is required"),
  industrySector: Yup.string().required("Industry Sector is required"),
  department: Yup.string().required("Department is required"),
  ctc: Yup.number()
    .typeError("CTC must be a number")
    .positive("CTC must be a positive number")
    .required("CTC is required"),
  from: Yup.date().required("Start date is required"),
  to: Yup.date()
    .nullable()
    .test("is-required", "End date is required", function (value) {
      const { currentlyWorking } = this.parent;
      return currentlyWorking ? true : !!value;
    }),
  currentlyWorking: Yup.boolean(),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  skills: Yup.array()
    .min(1, "At least one skill is required")
    .required("Skills are required"),
  description: Yup.string().required("Description is required"),
});

function ProfessionalExperienceModal({ onClose, onSubmit, initialValues }) {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Professional Experience
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
              enableReinitialize // ✅ This ensures the form updates when `initialValues` change
              initialValues={initialValues} // ✅ Pass the object directly
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form Submitted: ", values);

                onSubmit(values);
                dispatch(saveTempProfessionalDetails(values));
                onClose();
              }}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <Form
                  className="grid grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  {/* Designation */}
                  <div>
                    <Field name="designation">
                      {({ field }) => (
                        <InputField label="Designation" {...field} />
                      )}
                    </Field>
                  </div>

                  {/* Organisation */}
                  <div>
                    <Field name="organisation">
                      {({ field }) => (
                        <InputField label="Organisation" {...field} />
                      )}
                    </Field>
                  </div>

                  {/* Industry Sector */}
                  <div>
                    <Field name="industrySector">
                      {({ field }) => (
                        <InputField label="Industry Sector" {...field} />
                      )}
                    </Field>
                  </div>

                  {/* Department */}
                  <div>
                    <Field name="department">
                      {({ field }) => (
                        <InputField label="Department" {...field} />
                      )}
                    </Field>
                  </div>

                  {/* CTC */}
                  <div>
                    <Field name="ctc">
                      {({ field }) => (
                        <InputField label="CTC (in INR)" {...field} />
                      )}
                    </Field>
                  </div>

                  {/* Dates */}
                  <div className="col-span-2 grid grid-cols-3 gap-4 items-center">
                    <div>
                      <Field name="from">
                        {({ field }) => (
                          <InputField label="From" type="date" {...field} />
                        )}
                      </Field>
                    </div>

                    <div>
                      <Field name="to">
                        {({ field }) => (
                          <InputField
                            label="To"
                            type="date"
                            {...field}
                            disabled={values.currentlyWorking}
                          />
                        )}
                      </Field>
                    </div>

                    <label className="flex items-center">
                      <Field
                        type="checkbox"
                        name="currentlyWorking"
                        className="mr-2"
                        onChange={(e) =>
                          setFieldValue("currentlyWorking", e.target.checked)
                        }
                      />
                      I am currently working here
                    </label>
                  </div>

                  {/* Location Fields */}
                  <div>
                    <Field name="country">
                      {({ field }) => <InputField label="Country" {...field} />}
                    </Field>
                  </div>

                  <div>
                    <Field name="state">
                      {({ field }) => <InputField label="State" {...field} />}
                    </Field>
                  </div>

                  <div>
                    <Field name="city">
                      {({ field }) => <InputField label="City" {...field} />}
                    </Field>
                  </div>

                  {/* Skills */}
                  <div className="col-span-2">
                    <Field name="skills">
                      {({ field, form }) => (
                        <ChipsComponent
                          label="Skills"
                          name="skills"
                          placeholder="Enter Your Skills Here"
                          form={form}
                        />
                      )}
                    </Field>
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <Field name="description">
                      {({ field }) => (
                        <InputField label="Description" {...field} />
                      )}
                    </Field>
                  </div>

                  {/* Buttons */}
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ms-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Save
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

export default ProfessionalExperienceModal;
