import React, { useEffect, useState } from "react";
import ResumeEditor from "./ResumeEditor";
import Template1 from "./ResumeTemplates/Template1";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { toast } from "react-toastify";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import { FaRegSave } from "react-icons/fa";
import SaveResumeModal from "./SaveResumeModal";
import { addResume } from "./../../../store/slices/resumeSlice";

function ViewMyResume({ template, onSaveComplete }) {
  // profileData follows your provided structure
  const profileData = useSelector((state) => state.profileForms.finalData);
  console.log("PROFILE DATA: ", profileData);

  const dispatch = useDispatch();

  const [style, setStyle] = useState({ color: "#000", fontFamily: "Arial" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formattedData, setFormattedData] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedFields, setSelectedFields] = useState({});

  // Outer draggable order for sections and inner order for subsections
  const [sectionOrder, setSectionOrder] = useState([]);
  const [subSectionOrder, setSubSectionOrder] = useState({});

  // State for Save Resume Modal
  const [modalResOpen, setModalResOpen] = useState(false);
  const [savedName, setSavedName] = useState("");

  // Callback when resume is saved (with a name)
  const handleSave = (name) => {
    setSavedName(name);
    setModalResOpen(false);
    dispatch(
      addResume({
        name: name,
        data: formattedData,
      })
    );
    toast.success("Resume Stored Successfully");
    if (typeof onSaveComplete === "function") {
      onSaveComplete();
    }
  };

  const requiredFields = [
    "firstName",
    "middleName",
    "lastName",
    "email",
    "phoneNumber",
  ];
  const requiredSections = [
    "contactDetails",
    "professionalDetails",
    "projectDetails",
    "educationDetails",
    "otherDetails",
  ];

  // Open the fields modal on mount
  useEffect(() => {
    setModalIsOpen(true);
  }, []);

  // Initialize outer and inner orders when profileData is available
  useEffect(() => {
    if (profileData) {
      const sections = Object.keys(profileData);
      setSectionOrder(sections);
      const initialSubOrders = {};
      sections.forEach((section) => {
        const data = profileData[section];
        if (Array.isArray(data)) {
          // For array sections, order by indices
          initialSubOrders[section] = data.map((_, index) => index);
        } else if (data && typeof data === "object") {
          // For object sections, order by keys
          initialSubOrders[section] = Object.keys(data);
        }
      });
      setSubSectionOrder(initialSubOrders);
      console.log("Initial subSectionOrder:", initialSubOrders);
    }
  }, [profileData]);

  const openModal = () => {
    setSelectedFields({});
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle a checkbox for a given field in a section
  const handleCheckboxChange = (section, field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section]?.[field],
      },
    }));
  };

  // Toggle select/deselect all fields within a section
  const handleSectionSelect = (section) => {
    const allSelected =
      selectedFields[section] &&
      Object.values(selectedFields[section]).every((value) => value);

    const updatedFields = {};
    const data = profileData[section];
    if (Array.isArray(data)) {
      data.forEach((_, idx) => {
        updatedFields[idx] = !allSelected;
      });
    } else if (data && typeof data === "object") {
      Object.keys(data).forEach((key) => {
        updatedFields[key] = !allSelected;
      });
    }

    setSelectedFields((prev) => ({
      ...prev,
      [section]: updatedFields,
    }));
  };

  // Generate formatted resume data based on selected fields and the dragged order
  const generateResume = () => {
    let filteredData = {};

    // Loop over each section that has selections
    Object.keys(selectedFields).forEach((section) => {
      const data = profileData[section];

      if (Array.isArray(data)) {
        if (subSectionOrder[section]) {
          // Use the subSectionOrder to filter and reorder the array.
          const filteredArray = subSectionOrder[section]
            .filter((origIndex) => selectedFields[section]?.[origIndex])
            .map((origIndex) => data[origIndex]);
          if (filteredArray.length > 0) {
            filteredData[section] = filteredArray;
          }
        } else {
          const filteredArray = data.filter(
            (_, idx) => selectedFields[section]?.[idx]
          );
          if (filteredArray.length > 0) {
            filteredData[section] = filteredArray;
          }
        }
      } else if (data && typeof data === "object") {
        const orderedKeys = subSectionOrder[section] || Object.keys(data);
        const obj = {};
        orderedKeys.forEach((key) => {
          if (selectedFields[section]?.[key]) {
            obj[key] = data[key];
          }
        });
        if (Object.keys(obj).length > 0) {
          filteredData[section] = obj;
        }
      }
    });

    // Reorder the outer sections using sectionOrder
    let orderedFilteredData = {};
    sectionOrder.forEach((section) => {
      if (filteredData[section]) {
        orderedFilteredData[section] = filteredData[section];
      }
    });

    console.log("Formatted Resume Data:", orderedFilteredData);
    setFormattedData(orderedFilteredData);
    setModalIsOpen(false);
  };

  // Utility to format field/section labels
  const formatLabel = (text) => {
    return text
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Validate required selections before applying changes
  const validateSelectionBeforeApplying = () => {
    let missingFields = [];
    requiredFields.forEach((field) => {
      if (!selectedFields.personalInformation?.[field]) {
        missingFields.push(formatLabel(field));
      }
    });
    const requiredContactFields = ["linkedInUrl", "githubUrl"];
    requiredContactFields.forEach((field) => {
      if (!selectedFields.contactDetails?.[field]) {
        missingFields.push(formatLabel(field));
      }
    });
    requiredSections.forEach((section) => {
      if (
        !selectedFields[section] ||
        Object.values(selectedFields[section]).every((val) => !val)
      ) {
        missingFields.push(formatLabel(section));
      }
    });
    if (missingFields.length > 0) {
      toast.error(
        `Please select the required fields: ${missingFields.join(", ")}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        }
      );
      return;
    }
    generateResume();
  };

  // Outer drag handler for sections
  const onOuterSortEnd = (oldIndex, newIndex) => {
    setSectionOrder(arrayMoveImmutable(sectionOrder, oldIndex, newIndex));
  };

  // Inner drag handler for subsections (per section)
  const onInnerSortEnd = (section, oldIndex, newIndex) => {
    setSubSectionOrder((prev) => {
      const newOrder = arrayMoveImmutable(prev[section], oldIndex, newIndex);
      console.log(`New subSection order for ${section}:`, newOrder);
      return { ...prev, [section]: newOrder };
    });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full px-4 md:px-6 lg:px-8 gap-6 justify-center">
      {/* Editor Panel */}
      <div className="w-full lg:w-1/4">
        <ResumeEditor onUpdate={setStyle} />
      </div>

      {/* Resume Preview and Save Button */}
      <div className="w-full lg:w-3/4 flex flex-col">
        <div className="flex flex-col lg:flex-row justify-end items-center gap-2 mb-4">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={openModal}
          >
            Select Resume Fields
          </button>
          {!modalIsOpen && (
            <button
              type="button"
              className="flex items-center gap-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => setModalResOpen(true)}
            >
              <FaRegSave size={20} />
              Save My Resume
            </button>
          )}
        </div>
        {template?.id === "template1" && (
          <Template1 data={formattedData} style={style} />
        )}
      </div>

      {/* Save Resume Modal */}
      {modalResOpen && (
        <SaveResumeModal
          onSave={handleSave}
          onClose={() => setModalResOpen(false)}
        />
      )}

      {/* Fields and Arrange Modal */}
      {modalIsOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          <div className="relative p-4 pb-0 w-full max-w-2xl max-h-[750px] bg-white rounded-lg shadow-md overflow-y-scroll select-none">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Select Fields for Resume &amp; Arrange Sections
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-900"
                onClick={closeModal}
              >
                <IoClose size={30} color="#000" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4">
              <SortableList
                onSortEnd={onOuterSortEnd}
                className="space-y-4"
                draggedItemClassName="dragged"
                lockAxis="y"
              >
                {sectionOrder.map((section) => {
                  const sectionData = profileData[section];
                  const allSelected =
                    selectedFields[section] &&
                    Object.values(selectedFields[section]).every(Boolean);

                  return (
                    <SortableItem
                      key={section}
                      style={{ display: "block" }}
                    >
                      <div className="border-b pb-2">
                        <div className="flex justify-between items-center cursor-move">
                          <label className="flex items-center space-x-2 cursor-move">
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
                            className="text-gray-500 cursor-pointer"
                            onClick={() => toggleSection(section)}
                          >
                            {expandedSections[section] ? (
                              <GoChevronUp
                                size={25}
                                className="text-gray-700"
                              />
                            ) : (
                              <GoChevronDown
                                size={25}
                                className="text-gray-700"
                              />
                            )}
                          </button>
                        </div>
                        {expandedSections[section] && (
                          <div className="mt-2 pl-6 space-y-1 cursor-move">
                            <SortableList
                              onSortEnd={(oldIndex, newIndex) =>
                                onInnerSortEnd(section, oldIndex, newIndex)
                              }
                              className="space-y-1 cursor-move"
                              draggedItemClassName="dragged"
                              lockAxis="y"
                            >
                              {Array.isArray(sectionData)
                                ? subSectionOrder[section]?.map(
                                    (subIndex) => {
                                      const item = sectionData[subIndex];
                                      let itemLabel = `Item ${
                                        subIndex + 1
                                      }`;
                                      if (section === "professionalDetails")
                                        itemLabel =
                                          item.organisation || itemLabel;
                                      if (section === "educationDetails")
                                        itemLabel =
                                          item.data?.qualification ||
                                          itemLabel;
                                      if (section === "projectDetails")
                                        itemLabel =
                                          item.name || itemLabel;
                                      if (section === "certificationDetails")
                                        itemLabel =
                                          item.name || itemLabel;
                                      if (section === "researchPapers")
                                        itemLabel =
                                          item.name || itemLabel;
                                      if (section === "trainingDetails")
                                        itemLabel =
                                          item.name || itemLabel;
                                      return (
                                        <SortableItem
                                          key={subIndex}
                                          style={{ display: "block" }}
                                        >
                                          <div className="ml-4">
                                            <label className="flex items-center space-x-2 cursor-move">
                                              <input
                                                type="checkbox"
                                                checked={
                                                  selectedFields[section]?.[
                                                    subIndex
                                                  ] || false
                                                }
                                                onChange={() =>
                                                  handleCheckboxChange(
                                                    section,
                                                    subIndex
                                                  )
                                                }
                                                className="w-4 h-4"
                                              />
                                              <span className="text-gray-700 cursor-move">
                                                {formatLabel(itemLabel)}
                                              </span>
                                            </label>
                                          </div>
                                        </SortableItem>
                                      );
                                    }
                                  )
                                : subSectionOrder[section]?.map(
                                    (fieldKey) => (
                                      <SortableItem
                                        key={fieldKey}
                                        style={{ display: "block" }}
                                      >
                                        <label className="flex items-center space-x-2 ml-6 cursor-move">
                                          <input
                                            type="checkbox"
                                            checked={
                                              selectedFields[section]?.[
                                                fieldKey
                                              ] || false
                                            }
                                            onChange={() =>
                                              handleCheckboxChange(
                                                section,
                                                fieldKey
                                              )
                                            }
                                            className="w-4 h-4 cursor-move"
                                          />
                                          <span className="text-gray-700 cursor-move">
                                            {formatLabel(fieldKey)}
                                          </span>
                                        </label>
                                      </SortableItem>
                                    )
                                  )}
                            </SortableList>
                          </div>
                        )}
                      </div>
                    </SortableItem>
                  );
                })}
              </SortableList>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center p-4 border-t sticky bg-white bottom-0 justify-end">
              <button
                className="text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ms-2"
                onClick={validateSelectionBeforeApplying}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewMyResume;
  