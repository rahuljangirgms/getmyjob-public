import Select from "react-select";
import { useField } from "formik";

const MultiSelectField = ({ label, name, options }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;

  const handleChange = (selectedOptions) => {
    setValue(selectedOptions ? selectedOptions.map((option) => option.value) : []);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label} <span className="text-red-500">*</span></label>
      <Select
        isMulti
        name={name}
        options={options}
        className={`basic-multi-select border ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}`}
        classNamePrefix="select"
        onChange={handleChange}
        value={options.filter((option) => field.value.includes(option.value))}
        onBlur={() => setTouched(true)} // Ensure Formik registers the touch event
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default MultiSelectField;
