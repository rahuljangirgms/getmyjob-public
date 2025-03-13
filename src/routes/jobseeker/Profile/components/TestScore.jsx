import React from 'react'

function TestScore({Skill,Score}) {
  return (
    <div className="flex justify-between items-center my-2">
    <p className="text-lg font-medium text-gray-900 dark:text-white">{Skill}</p>  
    <p className="text-xl font-bold text-gray-900 dark:text-white">{Score}%</p>
    </div>
  )
}

export default TestScore
