import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import withChipInput from "../../../../components/textinput/withChipInput";
// Use updateCompanyRequest instead of createCompanyRequest:
import { updateCompanyRequest } from "../../../../store/slices/recruiter/companySlice";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const ChipInput = withChipInput();
  // Note: our updated slice is now under state.company (singular)
  const { loading, error } = useSelector((state) => state.company);
  const [logoPreview, setLogoPreview] = useState(null);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Must be at least 3 characters").required("Company Name is required"),
    locations: Yup.array()
      .of(Yup.string().required("Location is required"))
      .min(1, "At least one location is required")
      .max(5, "Max 5 locations allowed")
      .test("unique", "Locations must be unique", (value) => new Set(value).size === value.length),
    industries: Yup.array()
      .of(Yup.string().required("Industry is required"))
      .min(1, "At least one industry is required")
      .max(5, "Max 5 industries allowed")
      .test("unique", "Industries must be unique", (value) => new Set(value).size === value.length),
    website: Yup.string().url("Enter a valid URL").required("Website is required"),
    about: Yup.string().min(10, "Minimum 10 characters").required("Company Description is required"),
    size: Yup.string().matches(/^\d+$/, "Enter a valid number").required("Company Size is required"),
    logo: Yup.mixed().required("Company Logo is required"),
  });

  // Handle Logo Upload
  const handleLogoChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800">Create a New Company</h2>
      <p className="text-sm text-gray-600 mb-4">Fill out the form to register a new company.</p>

      <Formik
        initialValues={{
          name: "",
          locations: [],
          industries: [],
          website: "",
          about: "",
          size: "",
          logo: null,
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          console.log("🚀 Form Submitted!");
          console.log("Company Data:", values);
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            if (key === "logo" && values.logo) {
              formData.append("logo", values.logo);
            } else {
              formData.append(key, values[key]);
            }
          });
          // Dispatch updateCompanyRequest (it will work as a create if no profile exists)
          dispatch(updateCompanyRequest(formData));
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Form className="space-y-4">
            {/* Company Logo Upload */}
            <div>
              <label className="block text-gray-700 font-medium">Company Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange(e, setFieldValue)}
                className="w-full border p-2 rounded-md"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Company Logo Preview"
                  className="mt-3 w-28 h-28 object-fill rounded-md border"
                />
              )}
              {touched.logo && errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-gray-700 font-medium">Company Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={values.name}
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-400"
              />
              {touched.name && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Locations (With Chip Input) */}
            <div>
              <ChipInput
                values={values}
                setFieldValue={setFieldValue}
                fieldName="locations"
                label="Locations"
                placeholder="Enter a location and press Enter"
                type="location"
              />
              {touched.locations && errors.locations && <p className="text-red-500 text-sm">{errors.locations}</p>}
            </div>

            {/* Industries (With Chip Input) */}
            <div>
              <ChipInput
                values={values}
                setFieldValue={setFieldValue}
                fieldName="industries"
                label="Industries"
                placeholder="Enter an industry and press Enter"
                type="industry"
              />
              {touched.industries && errors.industries && <p className="text-red-500 text-sm">{errors.industries}</p>}
            </div>

            {/* Company Website */}
            <div>
              <label className="block text-gray-700 font-medium">Company Website</label>
              <input
                type="text"
                name="website"
                onChange={handleChange}
                value={values.website}
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-400"
              />
              {touched.website && errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-gray-700 font-medium">Company Size</label>
              <input
                type="text"
                name="size"
                onChange={handleChange}
                value={values.size}
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-400"
              />
              {touched.size && errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
            </div>

            {/* About Company */}
            <div>
              <label className="block text-gray-700 font-medium">About Company</label>
              <textarea
                name="about"
                rows="4"
                onChange={handleChange}
                value={values.about}
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-400"
              ></textarea>
              {touched.about && errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Company"}
            </button>

            {/* Error Handling */}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCompany;
