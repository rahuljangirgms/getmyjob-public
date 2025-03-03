import { useState } from "react";

const ResumeEditor = ({ onUpdate }) => {
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-xl font-bold">Customize Resume</h2>
      
      <label className="block mt-2">Pick a Color:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          onUpdate({ color: e.target.value, fontFamily: font });
        }}
      />

      <label className="block mt-2">Choose Font:</label>
      <select
        value={font}
        onChange={(e) => {
          setFont(e.target.value);
          onUpdate({ color, fontFamily: e.target.value });
        }}
        className="border p-2"
      >
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
      </select>
    </div>
  );
};

export default ResumeEditor;
