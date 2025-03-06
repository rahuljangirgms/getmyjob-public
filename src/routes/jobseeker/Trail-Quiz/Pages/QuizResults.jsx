import React from "react";

const QuizResults = ({ questions, selectedAnswers, score }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold text-green-600">Quiz Completed!</h2>
      <p className="text-gray-700 mt-2">
        You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
      </p>

      <div className="mt-6">
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const correctAnswer = question.answer;
          const isCorrect = userAnswer === correctAnswer;

          return (
            <div key={index} className="p-4 border rounded-md my-2 bg-gray-100">
              <p className="font-semibold">{index + 1}. {question.text}</p>
              
              {/* User Answer with color coding */}
              <p className={`mt-2 ${isCorrect ? "text-green-600" : "text-red-500 font-bold"}`}>
                Your Answer: {userAnswer || "Not Answered"}
              </p>
              
              {/* Show Correct Answer only if wrong */}
              {!isCorrect && (
                <p className="text-blue-600 font-semibold">Correct Answer: {correctAnswer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResults;
