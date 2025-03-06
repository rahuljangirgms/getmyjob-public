import React from "react";

const QuizControls = ({ onNext, onPrevious, onFinish, showNext, isLastQuestion }) => {
  return (
    <div className="flex justify-end mt-4">
      {/* <button
        onClick={onPrevious}
        className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-200"
      >
        Previous question
      </button> */}

      {isLastQuestion ? (
        <button
          onClick={onFinish}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Finish Quiz
        </button>
      ) : (
        showNext && (
          <button
            onClick={onNext}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Next question
          </button>
        )
      )}
    </div>
  );
};

export default QuizControls;
