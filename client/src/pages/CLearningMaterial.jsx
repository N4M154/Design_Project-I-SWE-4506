// // src/pages/CLearningMaterial.jsx
// import { jsPDF } from "jspdf";

// import React, { useState } from "react";
// import { FaCheck, FaDownload, FaLock } from "react-icons/fa";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import SideButtons from "../components/SideButtons";

// export default function CLearningMaterial() {
//   const { lessonId } = useParams(); // Get the current lesson ID from URL parameters
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [completedQuizzes, setCompletedQuizzes] = useState(["hello-world"]); // Assuming the Hello World quiz has been completed
//    const [isExpanded, setIsExpanded] = useState(true);

//   const learningContent = {
//     "hello-world": {
//       title: "Hello World in C",
//       intro:
//         "This module introduces you to the very basics of C programming. You will learn how to set up a C environment and write your first C program that outputs 'Hello, World!' to the console.",
//       example: `#include <stdio.h>

// int main() {
//     printf("Hello, World!\\n");
//     return 0;
// }`,
//     },
//   };

//   const contentList = [
//     { id: "hello-world", title: "Hello World", unlocked: true },
//     { id: "variables", title: "Variables", unlocked: false },
//     { id: "data-types", title: "Data Types", unlocked: false },
//     { id: "control-structures", title: "Control Structures", unlocked: false },
//     { id: "functions", title: "Functions", unlocked: false },
//     { id: "arrays", title: "Arrays", unlocked: false },
//     { id: "pointers", title: "Pointers", unlocked: false },
//     { id: "strings", title: "Strings", unlocked: false },
//     { id: "structures", title: "Structures", unlocked: false },
//     { id: "file-io", title: "File I/O", unlocked: false },
//   ];

//   const lesson = learningContent[lessonId];
//   const quizResult = location.state?.passed;

//   if (quizResult) {
//     // Mark the lesson as completed and unlock the next content if not already unlocked
//     if (!completedQuizzes.includes(lessonId)) {
//       const newCompletedQuizzes = [...completedQuizzes, lessonId];
//       setCompletedQuizzes(newCompletedQuizzes);
//       const nextContentIndex =
//         contentList.findIndex((content) => content.id === lessonId) + 1;
//       if (nextContentIndex < contentList.length) {
//         contentList[nextContentIndex].unlocked = true;
//       }
//     }
//   }

//   function handleQuizCompletion() {
//     navigate(`/courses/c/${lessonId}/quiz`);
//   }

//   function downloadPDF() {
//     const doc = new jsPDF();
//     const marginX = 20;
//     const lineSpacing = 10;

//     doc.setFontSize(16);
//     doc.text(lesson.title, marginX, 20);

//     doc.setFontSize(12);
//     const introText = doc.splitTextToSize(lesson.intro, 170); // 170 adjusts width to fit on page
//     doc.text(introText, marginX, 30);

//     doc.setFontSize(12);
//     doc.text("Code Example:", marginX, 30 + introText.length * lineSpacing);

//     doc.setFont("courier"); // Set font to Courier for code example
//     doc.setFontSize(11);

//     // Wrap code example too
//     const exampleCode = doc.splitTextToSize(lesson.example, 170);
//     doc.text(exampleCode, marginX, 40 + introText.length * lineSpacing);

//     doc.save(`${lesson.title.replace(/\s+/g, "_").toLowerCase()}.pdf`);
//   }

//   return (
//     <div className="flex min-h-screen bg-white font-['Poppins']">
//     <SideButtons />
//     <div
//       id="main-content"
//       className="flex-1 transition-all duration-300"
//       style={{ marginLeft: isExpanded ? "260px" : "80px" }}
//     >
//     <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-yellow-700 text-yellow-50">
//       <aside className="w-1/4 p-4 bg-gray-900 border-r border-yellow-600">
//         <h2 className="text-2xl font-bold mb-4 text-yellow-300">
//           C Language Topics
//         </h2>
//         <ul className="divide-y divide-yellow-600">
//           {contentList.map((content) => (
//             <li
//               key={content.id}
//               className={`flex items-center justify-between p-2 rounded hover:bg-yellow-600 transition-colors ${
//                 content.id === lessonId
//                   ? "bg-yellow-600 text-black"
//                   : "text-yellow-200"
//               }`}
//             >
//               {content.unlocked ? (
//                 <Link to={`/courses/c/${content.id}`} className="flex-1">
//                   {content.title}
//                 </Link>
//               ) : (
//                 <div className="flex-1 flex items-center">
//                   <FaLock className="mr-2" />
//                   {content.title}
//                 </div>
//               )}
//               {completedQuizzes.includes(content.id) && (
//                 <FaCheck className="text-green-500" />
//               )}
//             </li>
//           ))}
//         </ul>
//       </aside>
//       <main className="flex-1 p-8">
//         {lesson ? (
//           <div className="max-w-3xl mx-auto bg-black border border-yellow-500 rounded-lg shadow-lg p-6">
//             <h1 className="text-4xl font-bold mb-4 text-yellow-400">
//               {lesson.title}
//             </h1>
//             <section>
//               <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
//                 Introduction
//               </h2>
//               <p className="text-yellow-200 mb-4">{lesson.intro}</p>
//               <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
//                 Code Example
//               </h2>
//               <pre className="bg-yellow-100 text-black p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
//                 {lesson.example}
//               </pre>
//             </section>
//             <div className="mt-6 text-center">
//               <button
//                 onClick={handleQuizCompletion}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 mx-2"
//               >
//                 Take the Quiz
//               </button>
//               <button
//                 onClick={downloadPDF}
//                 className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 mx-2"
//               >
//                 <FaDownload className="inline mr-2" />
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p className="text-red-500 text-center text-2xl">Lesson not found.</p>
//         )}
//       </main>
//     </div>
//     </div>
//     </div>
//   );
// }

//-----------------------------------------

import { jsPDF } from "jspdf";
import {
  BookOpen,
  ChevronLeft,
  Download,
  ExternalLink,
  GraduationCap,
  Play,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SideButtons from "../components/SideButtons";

export default function CLearningMaterial() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [completedQuizzes, setCompletedQuizzes] = useState(["hello-world"]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const learningContent = {
    "hello-world": {
      title: "Hello World in C",
      intro:
        "Welcome to your first step in C programming! This comprehensive guide will walk you through creating your first C program. You'll learn about the basic structure of a C program, how to write and compile code, and understand the fundamental concepts behind the famous 'Hello, World!' program.",
      sections: [
        {
          title: "Understanding the Basics",
          content: `Before we dive into coding, let's understand what makes C special:
          
• C is a compiled language
• It's widely used in system programming
• It provides low-level access to computer memory
• It's the foundation for many modern programming languages`,
        },
        {
          title: "Program Structure",
          content: `Every C program consists of these basic elements:

• Header files (#include statements)
• The main() function
• Program statements
• Return statement`,
        },
        {
          title: "Code Example",
          code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
          explanation: `Let's break down each line:

1. #include <stdio.h> - Includes the standard input/output library
2. int main() - The main function where program execution begins
3. printf() - Function to print text to the console
4. return 0 - Indicates successful program completion`,
        },
        {
          title: "Common Mistakes to Avoid",
          content: `• Forgetting to include stdio.h
• Missing semicolons
• Incorrect quotation marks
• Forgetting the return statement`,
        },
      ],
      practice: [
        "Try changing the message inside printf()",
        "Add multiple printf() statements",
        "Experiment with different escape sequences (\\n, \\t, etc.)",
      ],
    },
  };

  // Simulated API responses (replace with actual API calls)
  useEffect(() => {
    // Simulated video data (replace with actual YouTube API call)
    setRelatedVideos([
      {
        id: "1",
        title: "C Programming Tutorial for Beginners",
        thumbnail:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format",
        duration: "12:34",
        author: "CodeMaster",
      },
      {
        id: "2",
        title: "Understanding Hello World in C",
        thumbnail:
          "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&auto=format",
        duration: "8:21",
        author: "Programming Basics",
      },
      {
        id: "3",
        title: "C Programming Fundamentals",
        thumbnail:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format",
        duration: "15:45",
        author: "Tech Education",
      },
    ]);

    // Simulated articles data (replace with actual API call)
    setRelatedArticles([
      {
        id: "1",
        title: "Getting Started with C Programming",
        source: "Dev.to",
        url: "#",
        readTime: "5 min",
      },
      {
        id: "2",
        title: "Understanding C Program Structure",
        source: "Medium",
        url: "#",
        readTime: "7 min",
      },
      {
        id: "3",
        title: "Best Practices for C Programming",
        source: "FreeCodeCamp",
        url: "#",
        readTime: "10 min",
      },
    ]);
  }, []);

  const lesson = learningContent[lessonId];
  const quizResult = location.state?.passed;

  useEffect(() => {
    if (quizResult && !completedQuizzes.includes(lessonId)) {
      setCompletedQuizzes([...completedQuizzes, lessonId]);
    }
  }, [quizResult, lessonId]);

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
    const introText = doc.splitTextToSize(lesson.intro, 170);
    doc.text(introText, marginX, 30);

    lesson.sections.forEach((section, index) => {
      const yPosition = 50 + index * 40;
      doc.setFontSize(14);
      doc.text(section.title, marginX, yPosition);

      doc.setFontSize(12);
      const content = doc.splitTextToSize(section.content, 170);
      doc.text(content, marginX, yPosition + 10);
    });

    doc.save(`${lesson.title.replace(/\s+/g, "_").toLowerCase()}.pdf`);
  }

  if (!lesson) {
    return <div className="text-center p-8">Lesson not found.</div>;
  }

  return (
    <div className="flex min-h-screen bg-white font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="min-h-screen bg-white">
          {/* Navigation Bar */}
          <div className="bg-yellow-50 border-b border-yellow-100 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link
                to="/courses/c"
                className="flex items-center text-yellow-600 hover:text-yellow-700 transition-colors"
              >
                <ChevronLeft className="mr-2" />
                Back to Course
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={handleQuizCompletion}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                >
                  <GraduationCap size={20} />
                  Take Quiz
                </button>
                <button
                  onClick={downloadPDF}
                  className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors flex items-center gap-2"
                >
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Lesson Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-8">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    {lesson.title}
                  </h1>
                  <p className="text-gray-600 mb-8">{lesson.intro}</p>

                  {lesson.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {section.title}
                      </h2>
                      {section.content && (
                        <div className="text-gray-600 whitespace-pre-line mb-4">
                          {section.content}
                        </div>
                      )}
                      {section.code && (
                        <div className="bg-yellow-50 rounded-lg p-6 mb-4">
                          <pre className="text-gray-800 font-mono text-sm">
                            {section.code}
                          </pre>
                          {section.explanation && (
                            <div className="mt-4 text-gray-600 text-sm">
                              {section.explanation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {lesson.practice && (
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Practice Exercises
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {lesson.practice.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-8">
                {/* Related Videos */}
                <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Play size={20} className="text-yellow-600" />
                    Related Videos
                  </h3>
                  <div className="space-y-4">
                    {relatedVideos.map((video) => (
                      <div key={video.id} className="group cursor-pointer">
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <span className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-800 mt-2 group-hover:text-yellow-600">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500">{video.author}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-yellow-600" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        className="block p-4 rounded-lg hover:bg-yellow-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {article.source} • {article.readTime} read
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-gray-400" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
