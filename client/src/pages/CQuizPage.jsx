// src/pages/CQuizPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const questions = [
  { id: 1, question: "What does 'C' in C language stand for?", options: ["Code", "Compiled", "Computer", "Circuit"], answer: "Compiled" },
  { id: 2, question: "Which operator is used to include a header file in C?", options: ["#", "include", ":", "->"], answer: "#" },
  { id: 3, question: "What is the correct syntax for declaring an integer?", options: ["int x;", "integer x;", "num x;", "x int;"], answer: "int x;" },
  { id: 4, question: "Which keyword is used to return a value from a function?", options: ["give", "return", "break", "exit"], answer: "return" },
  { id: 5, question: "What is the standard method for outputting data in C?", options: ["cout", "System.out.println", "printf", "print"], answer: "printf" }
];

function CQuizPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(120); // 120 seconds for the quiz

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds <= 0) {
      clearInterval(timer);
      submitQuiz(); // Auto-submit when time is up
    }

    return () => clearInterval(timer);
  }, [seconds]);

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const submitQuiz = () => {
    const score = questions.reduce((acc, question) => {
      if (answers[question.id] === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const passed = score >= questions.length * 0.8;
    navigate(`/courses/c/${lessonId}/results`, { state: { passed } });
  };

  return (
    <div className="quiz-container">
      <h1 className="text-center">Quiz for {lessonId}</h1>
      <div className="timer">Time Remaining: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          {question.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={() => handleOptionChange(question.id, option)}
                checked={answers[question.id] === option}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submitQuiz}>Submit Quiz</button>
    </div>
  );
}

export default CQuizPage;
