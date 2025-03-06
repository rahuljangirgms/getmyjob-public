import React, { useState } from 'react'
import TopicCard from './../components/TopicCard';
import topics from './../data/TestTopics';
import { useDispatch } from 'react-redux';
import {setTopic} from './../../../../store/slices/quizSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function QuizTopics() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedName,setSelectedName] = useState('');

  const handleTopicSelect = (topicId, topicName) => {
    setSelectedTopic(topicId);
    setSelectedName(topicName)
  }

  const handleContinue = () => {
    if (selectedTopic) {
      console.log(`Starting quiz with topic ID: ${selectedTopic}`)
      console.log(`Starting quiz with topic Name: ${selectedName}`);
      dispatch(setTopic(selectedName));
      navigate('/jobseeker/trail-quiz/quiz-page')
    }
    else{
      toast.error("Please Select One Topic to Proceed")
    }
  }

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-8">
      <ToastContainer/>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          WELCOME TO <span className="text-blue-700">JobVerse Skill Test</span>
        </h1>
        <p className="mt-2 text-lg">Select topic below to start your Quiz.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {topics.slice(0, 5).map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            isSelected={selectedTopic === topic.id}
            onSelect={()=> handleTopicSelect(topic.id, topic.name)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {topics.slice(5, 10).map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            isSelected={selectedTopic === topic.id}
            onSelect={()=> handleTopicSelect(topic.id, topic.name)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          className="px-8 py-3 text-white font-medium rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all"
        >
          Continue To Test 
        </button>
      </div>
    </div>
  )
}

export default QuizTopics
