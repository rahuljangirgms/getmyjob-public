import React, { useState } from "react";
import ResumeEditor from "./ResumeEditor";
import Template1 from "./ResumeTemplates/Template1";
import { useSelector } from "react-redux";
import { IoClose } from 'react-icons/io5';
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

function ViewMyResume({ template }) {
  const profileData = useSelector((state) => state.profileForms.finalData);
  console.log("PROFILE DATA: ", profileData);

  const [style, setStyle] = useState({ color: "#000", fontFamily: "Arial" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState({});
  const [formattedData, setFormattedData] = useState({}); // Processed data for resume
  const [expandedSections, setExpandedSections] = useState({}); // Track expanded sections

  // ✅ Open and Close Modal
  const openModal = () => {
    setSelectedFields({});
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  // ✅ Handle Section Expand/Collapse
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // ✅ Handle Checkbox Change (for Individual Fields)
  const handleCheckboxChange = (section, field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section]?.[field],
      },
    }));
  };

  // ✅ Handle Section Selection (Select/Deselect All Fields in a Section)
  const handleSectionSelect = (section) => {
    const allFieldsSelected = selectedFields[section]
      ? Object.values(selectedFields[section]).every((value) => value)
      : false;

    const updatedFields = Object.keys(profileData[section] || {}).reduce(
      (acc, field) => {
        acc[field] = !allFieldsSelected;
        return acc;
      },
      {}
    );

    setSelectedFields((prev) => ({
      ...prev,
      [section]: updatedFields,
    }));
  };

  // ✅ Generate Formatted Data for Resume
  const generateResume = () => {
    let filteredData = {};

    Object.keys(selectedFields).forEach((section) => {
      const sectionData = profileData[section];

      // Check if section data is an array
      if (Array.isArray(sectionData)) {
        filteredData[section] = sectionData.filter((_, index) => selectedFields[section]?.[index]);
      } else {
        // Otherwise, pick only selected fields
        filteredData[section] = {};
        Object.keys(selectedFields[section]).forEach((field) => {
          if (selectedFields[section][field]) {
            filteredData[section][field] = profileData[section][field];
          }
        });
      }

      // Remove empty sections
      if (Object.keys(filteredData[section]).length === 0) {
        delete filteredData[section];
      }
    });

    console.log("Formatted Resume Data:", filteredData);
    setFormattedData(filteredData);
    setModalIsOpen(false);
  };

  // ✅ Render Resume with Formatted Data
  const renderTemplate = () => {
    switch (template?.id) {
      case "template1":
        return <Template1 data={formattedData} style={style} />;
      default:
        return <h2 className="text-center text-xl">No Template Selected</h2>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full px-6 gap-6 justify-center">
      {/* Left Side: Customization Options */}
      <div className="lg:w-1/4 md:w-1/3 sm:w-full flex flex-col">
        <ResumeEditor onUpdate={setStyle} />
      </div>

      {/* Right Side: Resume Preview */}
      <div className="w-full flex justify-center flex-col">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={openModal}
          >
            Select Resume Fields
          </button>
        </div>

        {/* Render Resume */}
        {renderTemplate()}
      </div>

      {/* ✅ Custom Modal for Field Selection */}
      {modalIsOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          <div className="relative p-4  pb-0 w-full max-w-2xl max-h-[650px] bg-white rounded-lg shadow-md overflow-y-scroll">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Select Fields for Resume</h3>
              <button type="button" className="text-gray-400 hover:text-gray-900" onClick={closeModal}>
                <IoClose size={30} color="#000"/>
              </button>
            </div>

            {/* Modal Body: Sections and Subsections */}
            <div className="p-4 space-y-4">
              {Object.keys(profileData).map((section) => (
                <div key={section} className="border-b pb-2">
                  {/* Section Header with Expand Toggle */}
                  <div className="flex justify-between items-center cursor-pointer">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedFields[section] ? Object.values(selectedFields[section]).every(Boolean) : false}
                        onChange={() => handleSectionSelect(section)}
                        className="w-5 h-5 accent-blue-500 blue-400"
                      />
                      <h4 className="font-bold text-gray-900">{section.replace(/([A-Z])/g, " $1").trim()}</h4>
                    </label>
                    <button
                      type="button"
                      className="text-gray-500"
                      onClick={() => toggleSection(section)}
                    >
                      {expandedSections[section] ? <GoChevronUp size={25} className="text-gray-700"/> : <GoChevronDown size={25} className="text-gray-700"/>}
                    </button>
                  </div>

                  {/* Subsection Fields */}
                  {expandedSections[section] && (
                    <div className="mt-2 pl-6 space-y-1">
                      {Array.isArray(profileData[section])
                        ? profileData[section].map((item, index) => (
                            <div key={index} className="ml-4">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={selectedFields[section]?.[index] || false}
                                  onChange={() => handleCheckboxChange(section, index)}
                                  className="w-4 h-4"
                                />
                                <span className="text-gray-700">{item.name || `Item ${index + 1}`}</span>
                              </label>
                            </div>
                          ))
                        : Object.keys(profileData[section] || {}).map((field) => (
                            <label key={field} className="flex items-center space-x-2 ml-6">
                              <input
                                type="checkbox"
                                checked={selectedFields[section]?.[field] || false}
                                onChange={() => handleCheckboxChange(section, field)}
                                className="w-4 h-4"
                              />
                              <span className="text-gray-700">{field}</span>
                            </label>
                          ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center p-4 border-t sticky bg-white bottom-0">
              <button className="text-white bg-purple-600 px-5 py-2.5 rounded-lg" onClick={generateResume}>
                Apply
              </button>
              <button className="px-5 py-2.5 ms-3 rounded-lg border bg-gray-200" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewMyResume;
