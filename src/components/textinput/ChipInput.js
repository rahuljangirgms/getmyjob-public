import React, { useState } from "react";
import { useField } from "formik";
// import locations from "../../dummydata/locations";
// import industries from "../../dummydata/industries";

const ChipInput = ({ label, placeholder, name, type }) => {
  if (!name || typeof name !== "string") {
    throw new Error(`ChipInput requires a valid "name" prop, but received: ${name}`);
  }

  const [field, , helpers] = useField(name);
  const { value = [] } = field; // Ensure value is always an array
  const { setValue } = helpers;

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (val.trim()) {
      const dataSource =
        type === "location"
          ? locations.flatMap(({ state, cities }) => [state, ...cities])
          : industries;

      const filteredSuggestions = dataSource
        .filter((item) => item.toLowerCase().startsWith(val.toLowerCase()))
        .slice(0, 5); // Limit to 5 suggestions

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // ✅ Handle Enter Key to Add Chip
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (value.length < 5 && !value.includes(inputValue.trim())) {
        setValue([...value, inputValue.trim()]);
        setInputValue("");
        setSuggestions([]);
      }
    }
  };

  // ✅ Handle Click on Suggestion
  const handleSuggestionClick = (suggestion) => {
    if (value.length < 5 && !value.includes(suggestion)) {
      setValue([...value, suggestion]);
      setInputValue("");
      setSuggestions([]);
    }
  };

  // ✅ Handle Chip Removal
  const removeChip = (index) => {
    const updatedValues = value.filter((_, i) => i !== index);
    setValue(updatedValues);
  };

  return (
    <div className="relative">
      <label className="block text-gray-700 font-medium">{label} (Max 5)</label>

      {/* Render Selected Chips */}
      <div className="flex flex-wrap gap-2 mt-2">
        {value.length > 0 &&
          value.map((item, index) => (
            <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
              {item}
              <button type="button" onClick={() => removeChip(index)} className="text-white font-bold">
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
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full border rounded-md p-2 mt-2 focus:ring focus:ring-blue-400"
      />

      {/* Dropdown Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 w-full rounded-md shadow-md z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipInput;
