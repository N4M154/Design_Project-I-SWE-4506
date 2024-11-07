// src/pages/CLanguagePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function CLanguagePage() {
  const [completedQuizzes, setCompletedQuizzes] = useState(["hello-world"]);
  
  useEffect(() => {
    if (window.location.pathname === "/courses/c") {
      const scriptConfig = document.createElement("script");
      scriptConfig.innerHTML = `
        window.embeddedChatbotConfig = {
          chatbotId: "2q4GTxw4DnGGcyJB1GxGi",
          domain: "www.chatbase.co"
        };
      `;
      document.body.appendChild(scriptConfig);

      const scriptEmbed = document.createElement("script");
      scriptEmbed.src = "https://www.chatbase.co/embed.min.js";
      scriptEmbed.setAttribute("chatbotId", "2q4GTxw4DnGGcyJB1GxGi");
      scriptEmbed.setAttribute("domain", "www.chatbase.co");
      scriptEmbed.defer = true;
      document.body.appendChild(scriptEmbed);

      return () => {
        document.body.removeChild(scriptConfig);
        document.body.removeChild(scriptEmbed);
      };
    }
  }, []);

  const contentList = [
    { id: "hello-world", title: "Hello World", quizCompleted: true },
    { id: "variables", title: "Variables", quizCompleted: false },
    { id: "data-types", title: "Data Types", quizCompleted: false },
    { id: "control-structures", title: "Control Structures", quizCompleted: false },
    { id: "functions", title: "Functions", quizCompleted: false },
    { id: "arrays", title: "Arrays", quizCompleted: false },
    { id: "pointers", title: "Pointers", quizCompleted: false },
    { id: "strings", title: "Strings", quizCompleted: false },
    { id: "structures", title: "Structures", quizCompleted: false },
    { id: "file-io", title: "File I/O", quizCompleted: false },
    { id: "memory-management", title: "Memory Management", quizCompleted: false },
    { id: "dynamic-memory", title: "Dynamic Memory Allocation", quizCompleted: false },
    { id: "multithreading", title: "Multithreading", quizCompleted: false },
    { id: "preprocessors", title: "Preprocessors", quizCompleted: false },
    { id: "bitwise-operations", title: "Bitwise Operations", quizCompleted: false },
    { id: "recursion", title: "Recursion", quizCompleted: false },
    { id: "linked-lists", title: "Linked Lists", quizCompleted: false },
    { id: "advanced-pointers", title: "Advanced Pointers", quizCompleted: false },
    { id: "graphics-programming", title: "Graphics Programming", quizCompleted: false },
    { id: "network-programming", title: "Network Programming", quizCompleted: false }
  ];

  const handleQuizCompletion = (id) => {
    if (!completedQuizzes.includes(id)) {
      setCompletedQuizzes([...completedQuizzes, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-700 p-8">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400 text-center">C Language Course</h1>
      <ul className="space-y-4 max-w-3xl mx-auto">
        {contentList.map((content) => (
          <li key={content.id} className={`p-4 rounded-lg shadow-lg bg-gray-800 border ${content.quizCompleted ? 'border-green-500' : 'border-yellow-500'}`}>
            <Link
              to={`/courses/c/${content.id}`}
              className={`text-yellow-300 hover:text-yellow-400 font-semibold transition duration-300 ${content.quizCompleted ? 'line-through' : ''}`}
              onClick={() => handleQuizCompletion(content.id)}
            >
              {content.title}
            </Link>
            {content.quizCompleted && <span className="text-green-400 ml-2">✔</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
