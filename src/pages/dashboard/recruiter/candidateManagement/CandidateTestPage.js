// CandidateTestPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CandidateTestPage = () => {
  const { testSessionId } = useParams();
  const [testSession, setTestSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchTestSession = async () => {
      try {
        // 1) Fetch the test session
        const res = await axios.get(`${BASE_URL}/candidateTests/${testSessionId}`);
        const sessionData = res.data;
        setTestSession(sessionData);

        // 2) Fetch question details
        const questionIds = sessionData.questions.map((q) => q.questionId);
        // you can do multiple GETs or a single GET with a _in query:
        // e.g. GET /questions?id=1&id=2&id=3
        const questionRes = await axios.get(
          `${BASE_URL}/questions?${questionIds.map((id) => `id=${id}`).join("&")}`
        );
        setQuestions(questionRes.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTestSession();
  }, [testSessionId]);

  if (loading) return <p>Loading Test...</p>;
  if (!testSession) return <p>Test Session Not Found</p>;

  const handleAnswerChange = (questionId, answer) => {
    // Update the local testSession state
    const updatedQuestions = testSession.questions.map((q) =>
      q.questionId === questionId ? { ...q, answer } : q
    );
    setTestSession({ ...testSession, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    try {
      // Simple auto-scoring logic for MCQ
      let totalScore = 0;
      const updatedQuestions = testSession.questions.map((q) => {
        const questionObj = questions.find((ques) => ques.id === q.questionId);
        let score = 0;
        if (questionObj && questionObj.correctAnswer === q.answer) {
          score = 1; // or your scoring logic
        }
        return { ...q, score };
      });

      // Calculate total
      totalScore = updatedQuestions.reduce((acc, curr) => acc + curr.score, 0);

      // Patch the candidateTests record
      await axios.patch(`${BASE_URL}/candidateTests/${testSessionId}`, {
        questions: updatedQuestions,
        status: "Completed",
        totalScore
      });

      alert("Test Submitted!");
      navigate("/candidate/dashboard"); // or wherever
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Candidate Test</h1>
      {questions.map((question) => {
        const candidateAnswer = testSession.questions.find(
          (q) => q.questionId === question.id
        )?.answer;

        return (
          <div key={question.id} className="mb-6 border p-3 rounded">
            <p className="font-medium">{question.questionText}</p>
            {question.questionType === "MCQ" && (
              <div className="mt-2">
                {question.options.map((opt, i) => (
                  <label key={i} className="block">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={opt}
                      checked={candidateAnswer === opt}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                    <span className="ml-2">{opt}</span>
                  </label>
                ))}
              </div>
            )}
            {/* If you had other question types, handle them here */}
          </div>
        );
      })}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Test
      </button>
    </div>
  );
};

export default CandidateTestPage;
