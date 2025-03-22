import React, { useState } from "react";

const withChipInput = (WrappedComponent) => {
  return ({ values, setFieldValue, fieldName, placeholder, label }) => {
    const [inputValue, setInputValue] = useState("");

    // When user presses Enter, add the chip (if input is not empty)
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        // Only add if there are fewer than 5 chips and the chip isn't already added
        if (values[fieldName].length < 5 && !values[fieldName].includes(inputValue.trim())) {
          const newValues = [...(values[fieldName] || []), inputValue.trim()];
          setFieldValue(fieldName, newValues);
          console.log(`Field: ${fieldName}, Value: ${newValues}`);
          setInputValue("");
        }
      }
    };

    // Remove chip on button click
    const removeChip = (index) => {
      const updatedValues = values[fieldName].filter((_, i) => i !== index);
      setFieldValue(fieldName, updatedValues);
    };

    return (
      <div className="relative">
        <label className="block text-gray-700 font-medium">
          {label} (Max 5)
        </label>

        {/* Render chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          {values[fieldName]?.map((item, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
            >
              {item}
              <button
                type="button"
                onClick={() => removeChip(index)}
                className="text-white font-bold"
              >
                ✖
              </button>
            </span>
          ))}
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border rounded-md p-2 mt-2 focus:ring focus:ring-blue-400"
        />
      </div>
    );
  };
};

export default withChipInput;
