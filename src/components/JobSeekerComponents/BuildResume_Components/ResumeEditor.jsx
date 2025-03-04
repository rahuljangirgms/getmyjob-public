import { useState } from "react";
import { MdColorLens } from "react-icons/md";
import { RiFontSizeAi } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";


const ResumeEditor = ({ onUpdate }) => {
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");

  const navigation = useNavigate();

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Customize Resume</h2>
      <div className="flex items-center gap-2 py-4">
        <MdColorLens size={20} />
        <label className="font-semibold">Pick a Color:</label>
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          onUpdate({ color: e.target.value, fontFamily: font });
        }}
        className="h-20  w-20 cursor-pointer "
      />
      <div className="flex items-center gap-2 py-4">
        <RiFontSizeAi size={20} />
        <label className="font-semibold">Choose Font:</label>
      </div>

      <select
        value={font}
        onChange={(e) => {
          setFont(e.target.value);
          onUpdate({ color, fontFamily: e.target.value });
        }}
        className="border p-2 w-full"
      >
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
        <option value="Times-Roman">Times-Roman</option>
      </select>

      <div className="flex gap-2 py-4 flex-col">
        <div className="flex gap-2 items-center">
          <CiEdit size={20} />
          <p className="font-semibold">Edit My Resume:</p>
        </div>
        <button
          type="button"
          class="text-white flex items-center justify-center gap-2 bg-gradient-to-r my-2 from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={()=>  navigation('/jobseeker/complete-profile-form/personal-info')}
       >
         
          Go to Edit
          <IoIosArrowForward size={20} color="#fff" className="mx-2"/>
        </button>
      </div>
    </div>
  );
};

export default ResumeEditor;
