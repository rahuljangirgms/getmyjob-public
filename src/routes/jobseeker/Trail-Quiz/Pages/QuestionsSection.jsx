import React, { useState, useEffect } from 'react';
import Sidebar from './../components/Sidebar';
import Timer from './../components/Timer';
import QuestionCard from './../components/QuestionCard';
import QuizControls from './../components/QuizControls';
import QuizHeader from './../components/QuizHeader';
import { reactQuestions } from './../data/React-Questions';
import { useSelector } from 'react-redux';
import { pythonQuestions } from './../data/pythonQuestions';
import QuizResults from './QuizResults';


function QuestionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const topic = useSelector(state => state.quiz.selectedTopic);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (topic === 'React') {
      setQuestions(reactQuestions);
    }
    // if(topic === "Python"){
    //   setQuestions(pythonQuestions);
    // }
    else {
      setQuestions([]);
    }
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setAnsweredQuestions([]);
    setQuizFinished(false);
    setScore(0);
  }, [topic]);

  const handleAnswerSelection = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentIndex] = answer;
    setSelectedAnswers(updatedAnswers);

    if (!answeredQuestions.includes(currentIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setQuizFinished(true);
  };

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <h2 className="text-xl font-bold text-gray-600">No questions available for this topic.</h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar questions={questions} currentIndex={currentIndex} answeredQuestions={answeredQuestions} />
      <div className="flex-1 p-6 my-20">
        <div className="flex my-2 justify-between">
          <QuizHeader title={topic || "Quiz"} />
         {!quizFinished && <Timer />}
        </div>

        {quizFinished ? (
          <QuizResults questions={questions} selectedAnswers={selectedAnswers} score={score} />
        ) : (
          <>
            <QuestionCard 
              question={questions[currentIndex]} 
              onAnswer={handleAnswerSelection} 
              selectedAnswer={selectedAnswers[currentIndex]} 
              totalQuestions={questions.length  }
            />
            <QuizControls 
              onNext={handleNext} 
              onPrevious={handlePrevious} 
              onFinish={handleFinish} 
              showNext={!!selectedAnswers[currentIndex]} 
              isLastQuestion={currentIndex === questions.length - 1} 
            />
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionsSection;
