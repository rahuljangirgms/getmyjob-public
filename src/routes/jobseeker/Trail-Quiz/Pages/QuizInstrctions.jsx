import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setIsInstrctRead } from './../../../../store/slices/quizSlice';
import { reactQuestions } from './../data/React-Questions';
import { pythonQuestions } from './../data/pythonQuestions';

const QuizInstructions = () => {
  const dispatch = useDispatch();
  const topic = useSelector(state => state.quiz.selectedTopic);
  const [questionsLen, setQuestionsLen] = useState(0);

  // ✅ Use useEffect to prevent infinite re-renders
  useEffect(() => {
    switch (topic) {
      case 'React':
        setQuestionsLen(reactQuestions.length);
        break; 
      case 'Python':
        setQuestionsLen(pythonQuestions.length);
      default:
        setQuestionsLen(0);
    }
  }, [topic]); 

  const handleStartTest = () => {
    dispatch(setIsInstrctRead(true));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 border border-gray-300 m-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">JobVerse Skill Test</h2>

        <p className="text-gray-700">
          <span className="font-semibold">Selected Quiz Topic:</span>
          <span className="text-blue-600 font-semibold"> {topic}</span>
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Total questions to attempt:</span>
          <span className="text-blue-600 font-semibold"> {questionsLen}</span>
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Score in total:</span>
          <span className="text-blue-600 font-semibold"> 95</span>
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Total time:</span>
          <span className="text-blue-600 font-semibold"> 10 minutes</span>
        </p>

        <p className="text-gray-600 mt-4 text-sm">
          To save time, you can skip questions. Skipped questions will show up at the end of the quiz.
        </p>

        <button
          className="mt-5 px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center w-full"
          onClick={handleStartTest}
        >
          Start Test <FaArrowRight className="mx-2" />
        </button>
      </div>
    </div>
  );
};

export default QuizInstructions;
