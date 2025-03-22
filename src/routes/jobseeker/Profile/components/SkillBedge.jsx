import React from "react";
import { TiStar } from "react-icons/ti";

function SkillBedge({ title }) {
  return (
    <button
      type="button"
      className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-center text-blue-700 bg-blue-50 rounded-full hover:bg-blue-50 focus:ring-4 focus:outline-none"
    >
      {title}
      <span className="inline-flex items-center justify-center w-8 h-8 ms-2 text-xs font-bold text-white bg-blue-500 rounded-full">
        <TiStar size={22} />
      </span>
    </button>
  );
}

export default SkillBedge;
