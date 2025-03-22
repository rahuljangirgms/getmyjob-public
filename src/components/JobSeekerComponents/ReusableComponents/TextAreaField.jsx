import { useField } from "formik";

const TextAreaField = ({ label, name, rows = 4, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <textarea
        {...field}
        {...props}
        rows={rows}
        className={`rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {meta.touched && meta.error ? (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default TextAreaField;
