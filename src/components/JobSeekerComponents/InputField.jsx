import { useField } from "formik";

function InputField({ label, name, type = "text", error,optional,...props }) {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {!optional && <span className="text-red-500">*</span>}
      </label>
      <input
        {...field}
        {...props}
        type={type}
        name={name}
        id={name}
        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}`}
      />
      {meta.touched && meta.error && (
        <div className="mt-1 text-sm text-red-600">{meta.error}</div>
      )}
    </div>
  );
}

export default InputField;
