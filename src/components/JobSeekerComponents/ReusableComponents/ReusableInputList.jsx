import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { FieldArray, Field } from "formik";

function ReusableInputList({ title, btnText, name, form }) {
  const { values, setFieldValue } = form;

  return (
    <div className="w-full">
      <h3 className="block text-gray-700 font-medium mb-2">Add {title}</h3>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div className="w-full">
            {values[name].map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Field
                  name={`${name}[${index}]`}
                  type="text"
                  placeholder={`Please enter any ${title.toLowerCase()}`}
                  className="border p-2 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => arrayHelpers.remove(index)} // Remove the field
                  className="text-gray-600 hover:text-red-600"
                >
                  <AiTwotoneDelete size={20} />
                </button>
              </div>
            ))}
            <div className="flex justify-end items-center w-full">
              <button
                type="button"
                onClick={() => arrayHelpers.push("")} // Add a new empty field
                className="text-blue-600 hover:text-blue-700 mt-2 font-semibold py-2 flex items-center"
              >
                <IoMdAddCircleOutline size={18} className="mr-1" /> {btnText}
              </button>
            </div>

           
          </div>
        )}
      />
    </div>
  );
}

export default ReusableInputList;
