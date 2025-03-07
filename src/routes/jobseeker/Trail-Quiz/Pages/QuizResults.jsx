import React from "react";
import { IoReloadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";

const QuizResults = ({ questions, selectedAnswers, score }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-gray-600 my-4">
          Test Completed!
        </h2>

        <div className="flex items-center justify-center flex-col lg:flex-row gap-2">
          <span className="bg-green-100 text-green-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded-md border border-green-400">
            You scored {score} <strong>/</strong> {questions.length}
          </span>
        </div>
        <div className="flex flex-col mt-6 lg:mt-0 lg:flex-row gap-2 justify-end">
        <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-2 items-center"
            onClick={() => navigate("/jobseeker/trail-quiz/quiz-topic")}
          >
            <IoReloadOutline size={20} />
            Retake Test
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-600 to-violet-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-2 items-center"
            onClick={() => navigate("/jobseeker/dashboard")}
          >
        
            Start Applying for Jobs
            <IoBagOutline size={20} />
          </button>
        </div>
      </div>

      <div className="mt-6">
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const correctAnswer = question.answer;
          const isCorrect = userAnswer === correctAnswer;

          return (
            <div key={index} className="p-4 border rounded-md my-2 bg-gray-100">
              <p className="font-semibold">
                {index + 1}. {question.text}
              </p>

              {/* User Answer with color coding */}
              <p
                className={`mt-2 ${
                  isCorrect ? "text-green-600" : "text-red-500 font-bold"
                }`}
              >
                Your Answer: {userAnswer || "Not Answered"}
              </p>

              {/* Show Correct Answer only if wrong */}
              {!isCorrect && (
                <p className="text-blue-600 font-semibold">
                  Correct Answer: {correctAnswer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResults;
