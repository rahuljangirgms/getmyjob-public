import React from 'react'
import { Outlet } from 'react-router-dom';


function QuizHomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 flex-col">
         <Outlet /> 
    </div>
  )
}

export default QuizHomePage
 