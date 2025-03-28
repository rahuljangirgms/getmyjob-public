import React from "react";
import { IoSparklesSharp } from "react-icons/io5";

function AIButton({btnTxt, onClick}) {
  return (
    <button className="w-full flex items-center px-6 py-2 border rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-700 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300"
      onClick={onClick}
    >
      <IoSparklesSharp className="mr-2 w-5 h-5 text-yellow-300" />
      {btnTxt}
    </button>
  );
}

export default AIButton;
