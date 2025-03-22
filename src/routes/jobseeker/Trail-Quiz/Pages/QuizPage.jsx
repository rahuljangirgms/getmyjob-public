import React, { useEffect } from 'react'
import QuizInstructions from './QuizInstrctions';
import { useSelector } from 'react-redux';
import QuestionsSection from './QuestionsSection';
import {setIsInstrctRead} from './../../../../store/slices/quizSlice';
import { useDispatch } from 'react-redux';


function QuizPage() {

  const dispatch = useDispatch();

  const isInstrctionsRead = useSelector(state => state.quiz.isInstrctionsRead);
  
  useEffect(()=>{
    dispatch(setIsInstrctRead(false));
  },[])

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col w-full">
      {!isInstrctionsRead ? 
        <div className="flex justify-center items-center">
          <QuizInstructions/>
        </div>
        
      : <QuestionsSection/> }
    </div>
  )
}

export default QuizPage
