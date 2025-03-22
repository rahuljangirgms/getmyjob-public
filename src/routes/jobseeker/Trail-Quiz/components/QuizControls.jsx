import { toast } from "react-toastify";

const QuizControls = ({ onNext, onPrevious, onFinish, showNext, isLastQuestion, selectedAnswer }) => {
  const handleFinishClick = () => {
    if (isLastQuestion && !selectedAnswer) {
      toast.warn("Please attempt the last question before submitting!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    onFinish();
  };
  return (
    <div className="flex justify-end mt-4">
      {isLastQuestion ? (
        <button
          onClick={handleFinishClick}
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
            Next Question
          </button>
        )
      )}
    </div>
  );
};

export default QuizControls;
