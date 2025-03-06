import React from "react";

const QuestionCard = ({ question, onAnswer, selectedAnswer, totalQuestions }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-blue-600 text-lg font-semibold">Question {question.id} / {totalQuestions}</h3>
      <p className="text-gray-700 mt-2">{question.text}</p>

      {question.image && (
        <img src={question.image} alt="Question" className="my-4 rounded-lg shadow-md w-full" />
      )}

      <div className="mt-4 space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full p-3 border border-gray-300 rounded-md text-left ${
              selectedAnswer === option ? "bg-blue-200" : "hover:bg-blue-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
