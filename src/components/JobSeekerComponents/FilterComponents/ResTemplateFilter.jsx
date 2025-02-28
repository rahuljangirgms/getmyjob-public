import { useState } from "react";

function ResTemplateFilter() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [headshot, setHeadshot] = useState("with");
  const [columns, setColumns] = useState("1");

  const colors = [
    { name: "blue", hex: "#3b82f6" },
    { name: "gray", hex: "#6b7280" },
    { name: "navy", hex: "#1e3a8a" },
    { name: "purple", hex: "#8b5cf6" },
    { name: "light-blue", hex: "#38bdf8" },
    { name: "teal", hex: "#14b8a6" },
    { name: "green", hex: "#16a34a" },
    { name: "red", hex: "#b91c1c" },
    { name: "pink", hex: "#f472b6" },
    { name: "yellow", hex: "#facc15" },
  ];

  const handleClearFilters = () => {
    setSelectedColor("blue");
    setHeadshot("with");
    setColumns("1");
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg w-full ">
      {/* Color Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">COLOR</h3>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color.name ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.hex)} 
              aria-label={`Select ${color.name} color`}
            >
              {selectedColor === color.name && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-500">FILTERS</h3>
        <button className="text-blue-500 text-sm hover:text-blue-600" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Headshot Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">HEADSHOT</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="headshot"
              value="with"
              checked={headshot === "with"}
              onChange={(e) => setHeadshot(e.target.value)}
              className="mr-2 accent-blue-500"
            />
            <span className="text-sm">With Photo</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="headshot"
              value="without"
              checked={headshot === "without"}
              onChange={(e) => setHeadshot(e.target.value)}
              className="mr-2 accent-blue-500"
            />
            <span className="text-sm">Without Photo</span>
          </label>
        </div>
      </div>

      {/* Columns Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">COLUMNS</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="columns"
              value="1"
              checked={columns === "1"}
              onChange={(e) => setColumns(e.target.value)}
              className="mr-2 accent-blue-500"
            />
            <span className="text-sm">1 Column</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="columns"
              value="2"
              checked={columns === "2"}
              onChange={(e) => setColumns(e.target.value)}
              className="mr-2 accent-blue-500"
            />
            <span className="text-sm">2 Columns</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ResTemplateFilter;
