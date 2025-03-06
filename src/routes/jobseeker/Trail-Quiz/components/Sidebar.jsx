import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const Sidebar = ({ questions, currentIndex, answeredQuestions }) => {
  return (
    <div className="w-64 bg-black text-white p-4 h-screen sticky top-0 overflow-y-auto shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="mt-20">
        {questions.map((q, index) => (
          <div
            key={index}
            className={`w-full text-left px-4 py-2 my-1 flex items-center justify-between rounded-md font-semibold ${
              index === currentIndex ? "bg-white text-black" : "bg-gray-800"
            }`}
          >
            <span>Question {index + 1}</span>
            {answeredQuestions.includes(index) && <span className="text-green-600"><FaRegCheckCircle size={20}/></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
