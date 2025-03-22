import React from "react";
import { IoClose } from "react-icons/io5";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function ResumeChoiceModal({
  modalIsOpen,
  closeModal,
  profileData,
  selectedFields,
  setSelectedFields,
  toggleSection,
  expandedSections,
  handleCheckboxChange,
  handleSectionSelect,
  validateSelectionBeforeApplying,
  formatLabel,
}) {
  if (!modalIsOpen) return null; // Don't render if modal is closed

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
    >
      <div className="relative p-4 pb-0 w-full max-w-2xl max-h-[750px] bg-white rounded-lg shadow-md overflow-y-scroll">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Select Fields for Resume
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-900"
            onClick={closeModal}
          >
            <IoClose size={30} color="#000" />
          </button>
        </div>

        {/* Modal Body: Sections and Subsections */}
        <div className="p-4 space-y-4">
          {Object.keys(profileData).map((section) => {
            const sectionData = profileData[section];

            // Check if all items in a section are selected
            const allSelected =
              selectedFields[section] &&
              Object.values(selectedFields[section]).every(Boolean);

            return (
              <div key={section} className="border-b pb-2">
                {/* Section Header with Expand Toggle */}
                <div className="flex justify-between items-center cursor-pointer">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={() => handleSectionSelect(section)}
                      className="w-5 h-5 accent-blue-500"
                    />
                    <h4 className="font-bold text-gray-900">
                      {formatLabel(section)}
                    </h4>
                  </label>
                  <button
                    type="button"
                    className="text-gray-500"
                    onClick={() => toggleSection(section)}
                  >
                    {expandedSections[section] ? (
                      <GoChevronUp size={25} className="text-gray-700" />
                    ) : (
                      <GoChevronDown size={25} className="text-gray-700" />
                    )}
                  </button>
                </div>

                {/* Subsection Fields */}
                {expandedSections[section] && (
                  <div className="mt-2 pl-6 space-y-1">
                    {Array.isArray(sectionData)
                      ? sectionData.map((item, index) => {
                          let itemLabel = `Item ${index + 1}`;

                          if (section === "professionalDetails")
                            itemLabel = item.organisation || itemLabel;
                          if (section === "educationDetails")
                            itemLabel = item.data?.qualification || itemLabel;
                          if (section === "internshipDetails")
                            itemLabel = item.organisation || itemLabel;
                          if (section === "projectDetails")
                            itemLabel = item.name || itemLabel;
                          if (section === "certificationDetails")
                            itemLabel = item.name || itemLabel;
                          if (section === "researchPapers")
                            itemLabel = item.name || itemLabel;
                          if (section === "trainingDetails")
                            itemLabel = item.name || itemLabel;

                          return (
                            <div key={index} className="ml-4">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={selectedFields[section]?.[index] || false}
                                  onChange={() => handleCheckboxChange(section, index)}
                                  className="w-4 h-4"
                                />
                                <span className="text-gray-700">
                                  {formatLabel(itemLabel)}
                                </span>
                              </label>
                            </div>
                          );
                        })
                      : Object.entries(sectionData || {}).map(
                          ([fieldKey]) => (
                            <label
                              key={fieldKey}
                              className="flex items-center space-x-2 ml-6"
                            >
                              <input
                                type="checkbox"
                                checked={selectedFields[section]?.[fieldKey] || false}
                                onChange={() => handleCheckboxChange(section, fieldKey)}
                                className="w-4 h-4"
                              />
                              <span className="text-gray-700">
                                {formatLabel(fieldKey)}
                              </span>
                            </label>
                          )
                        )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center p-4 border-t sticky bg-white bottom-0 justify-end">
          <button
            className="text-white bg-blue-600 px-5 py-2.5 rounded-lg"
            onClick={validateSelectionBeforeApplying} // ✅ Now validates required fields
          >
            Apply
          </button>
          <button
            className="px-5 py-2.5 ms-3 rounded-lg border bg-gray-200"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeChoiceModal;
