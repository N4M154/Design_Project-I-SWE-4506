// src/pages/CLearningMaterial.jsx
import { jsPDF } from "jspdf";

import React, { useState } from "react";
import { FaCheck, FaDownload, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function CLearningMaterial() {
  const { lessonId } = useParams(); // Get the current lesson ID from URL parameters
  const navigate = useNavigate();
  const location = useLocation();
  const [completedQuizzes, setCompletedQuizzes] = useState(["hello-world"]); // Assuming the Hello World quiz has been completed

  const learningContent = {
    "hello-world": {
      title: "Hello World in C",
      intro:
        "This module introduces you to the very basics of C programming. You will learn how to set up a C environment and write your first C program that outputs 'Hello, World!' to the console.",
      example: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    },
  };

  const contentList = [
    { id: "hello-world", title: "Hello World", unlocked: true },
    { id: "variables", title: "Variables", unlocked: false },
    { id: "data-types", title: "Data Types", unlocked: false },
    { id: "control-structures", title: "Control Structures", unlocked: false },
    { id: "functions", title: "Functions", unlocked: false },
    { id: "arrays", title: "Arrays", unlocked: false },
    { id: "pointers", title: "Pointers", unlocked: false },
    { id: "strings", title: "Strings", unlocked: false },
    { id: "structures", title: "Structures", unlocked: false },
    { id: "file-io", title: "File I/O", unlocked: false },
  ];

  const lesson = learningContent[lessonId];
  const quizResult = location.state?.passed;

  if (quizResult) {
    // Mark the lesson as completed and unlock the next content if not already unlocked
    if (!completedQuizzes.includes(lessonId)) {
      const newCompletedQuizzes = [...completedQuizzes, lessonId];
      setCompletedQuizzes(newCompletedQuizzes);
      const nextContentIndex =
        contentList.findIndex((content) => content.id === lessonId) + 1;
      if (nextContentIndex < contentList.length) {
        contentList[nextContentIndex].unlocked = true;
      }
    }
  }

  function handleQuizCompletion() {
    navigate(`/courses/c/${lessonId}/quiz`);
  }

  function downloadPDF() {
    const doc = new jsPDF();
    const marginX = 20;
    const lineSpacing = 10;

    doc.setFontSize(16);
    doc.text(lesson.title, marginX, 20);

    doc.setFontSize(12);
    const introText = doc.splitTextToSize(lesson.intro, 170); // 170 adjusts width to fit on page
    doc.text(introText, marginX, 30);

    doc.setFontSize(12);
    doc.text("Code Example:", marginX, 30 + introText.length * lineSpacing);

    doc.setFont("courier"); // Set font to Courier for code example
    doc.setFontSize(11);

    // Wrap code example too
    const exampleCode = doc.splitTextToSize(lesson.example, 170);
    doc.text(exampleCode, marginX, 40 + introText.length * lineSpacing);

    doc.save(`${lesson.title.replace(/\s+/g, "_").toLowerCase()}.pdf`);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-yellow-700 text-yellow-50">
      <aside className="w-1/4 p-4 bg-gray-900 border-r border-yellow-600">
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">
          C Language Topics
        </h2>
        <ul className="divide-y divide-yellow-600">
          {contentList.map((content) => (
            <li
              key={content.id}
              className={`flex items-center justify-between p-2 rounded hover:bg-yellow-600 transition-colors ${
                content.id === lessonId
                  ? "bg-yellow-600 text-black"
                  : "text-yellow-200"
              }`}
            >
              {content.unlocked ? (
                <Link to={`/courses/c/${content.id}`} className="flex-1">
                  {content.title}
                </Link>
              ) : (
                <div className="flex-1 flex items-center">
                  <FaLock className="mr-2" />
                  {content.title}
                </div>
              )}
              {completedQuizzes.includes(content.id) && (
                <FaCheck className="text-green-500" />
              )}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-8">
        {lesson ? (
          <div className="max-w-3xl mx-auto bg-black border border-yellow-500 rounded-lg shadow-lg p-6">
            <h1 className="text-4xl font-bold mb-4 text-yellow-400">
              {lesson.title}
            </h1>
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
                Introduction
              </h2>
              <p className="text-yellow-200 mb-4">{lesson.intro}</p>
              <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
                Code Example
              </h2>
              <pre className="bg-yellow-100 text-black p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {lesson.example}
              </pre>
            </section>
            <div className="mt-6 text-center">
              <button
                onClick={handleQuizCompletion}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 mx-2"
              >
                Take the Quiz
              </button>
              <button
                onClick={downloadPDF}
                className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 mx-2"
              >
                <FaDownload className="inline mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center text-2xl">Lesson not found.</p>
        )}
      </main>
    </div>
  );
}
