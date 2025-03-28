import { Award, BarChart, BookOpen, Bot, Box, Braces, Rows as Browser, CheckCircle, ChevronRight, Cloud, Code2, Database, FlaskRound as Flask, Globe, Laptop, Layers, Library, Network, Smartphone, Terminal, Workflow } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideButtons from "../components/SideButtons";

export default function JavaScriptLanguagePage() {
  const [completedQuizzes, setCompletedQuizzes] = useState(["hello-world"]);
  const [isExpanded, setIsExpanded] = useState(true);

  const contentList = [
    {
      id: "hello-world",
      title: "Hello World",
      icon: <Terminal size={20} />,
      quizCompleted: true,
    },
    {
      id: "variables-datatypes",
      title: "Variables & Data Types",
      icon: <Code2 size={20} />,
      quizCompleted: true,
    },
    {
      id: "control-flow",
      title: "Control Flow",
      icon: <Workflow size={20} />,
      quizCompleted: false,
    },
    {
      id: "functions",
      title: "Functions",
      icon: <Braces size={20} />,
      quizCompleted: false,
    },
    {
      id: "arrays-objects",
      title: "Arrays & Objects",
      icon: <Database size={20} />,
      quizCompleted: false,
    },
    {
      id: "dom-manipulation",
      title: "DOM Manipulation",
      icon: <Browser size={20} />,
      quizCompleted: false,
    },
    {
      id: "events",
      title: "Events",
      icon: <Laptop size={20} />,
      quizCompleted: false,
    },
    {
      id: "async-programming",
      title: "Async Programming",
      icon: <Network size={20} />,
      quizCompleted: false,
    },
    {
      id: "promises",
      title: "Promises",
      icon: <Box size={20} />,
      quizCompleted: false,
    },
    {
      id: "es6-features",
      title: "ES6+ Features",
      icon: <Code2 size={20} />,
      quizCompleted: false,
    },
    {
      id: "modules",
      title: "Modules",
      icon: <Library size={20} />,
      quizCompleted: false,
    },
    {
      id: "error-handling",
      title: "Error Handling",
      icon: <Code2 size={20} />,
      quizCompleted: false,
    },
    {
      id: "local-storage",
      title: "Local Storage",
      icon: <Database size={20} />,
      quizCompleted: false,
    },
    {
      id: "api-fetch",
      title: "API & Fetch",
      icon: <Cloud size={20} />,
      quizCompleted: false,
    },
    {
      id: "responsive-design",
      title: "Responsive Design",
      icon: <Smartphone size={20} />,
      quizCompleted: false,
    },
    {
      id: "testing",
      title: "Testing",
      icon: <Flask size={20} />,
      quizCompleted: false,
    },
    {
      id: "frameworks-intro",
      title: "Frameworks Intro",
      icon: <Layers size={20} />,
      quizCompleted: false,
    },
    {
      id: "performance",
      title: "Performance",
      icon: <BarChart size={20} />,
      quizCompleted: false,
    },
    {
      id: "security",
      title: "Security",
      icon: <Bot size={20} />,
      quizCompleted: false,
    },
    {
      id: "deployment",
      title: "Deployment",
      icon: <Globe size={20} />,
      quizCompleted: false,
    },
  ];

  const handleQuizCompletion = (id) => {
    if (!completedQuizzes.includes(id)) {
      setCompletedQuizzes([...completedQuizzes, id]);
    }
  };

  const progress = (completedQuizzes.length / contentList.length) * 100;

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-50 dark:from-black dark:to-[#18181b] to-yellow-100 py-16 px-8 rounded-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-yellow-200 mb-4">
                  Master JavaScript
                </h1>
                <p className="text-xl text-gray-600 dark:text-[#f5f5f5] mb-6">
                  From fundamentals to full-stack development, learn JavaScript through
                  interactive lessons and real-world projects.
                </p>
                <div className="flex gap-4">
                   <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center gap-2">
                                                         Start Learning <ChevronRight size={20} />
                                                       </button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-md bg-white dark:bg-gray-500/20 rounded-xl shadow-lg dark:shadow-yellow-200/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Your Progress
                    </h3>
                    <span className="text-yellow-600 font-bold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-[#f5f5f5]">
                    <span>{completedQuizzes.length} completed</span>
                    <span>{contentList.length} total lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-transparent dark:border dark:border-yellow-200 dark:rounded-2xl py-12 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-yellow-50 dark:bg-yellow-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <BookOpen className="text-yellow-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    20 Lessons
                  </h3>
                  <p className="text-gray-600 dark:text-yellow-100">
                    Comprehensive curriculum
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <Code2 className="text-yellow-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Interactive
                  </h3>
                  <p className="text-gray-600 dark:text-yellow-100">
                    Hands-on exercises
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <Award className="text-yellow-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Certificate
                  </h3>
                  <p className="text-gray-600 dark:text-yellow-100">
                    Upon completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="py-12 px-8 bg-gray-50 dark:bg-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Course Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentList.map((content) => (
                <Link
                  key={content.id}
                  to={`/courses/javascript/${content.id}`}
                  onClick={() => handleQuizCompletion(content.id)}
                  className="group"
                >
                  <div
                    className={`bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 ${
                      content.quizCompleted
                        ? "border-green-500"
                        : "border-yellow-200"
                    } hover:border-yellow-500 transition duration-300`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-yellow-600">{content.icon}</span>
                        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                          {content.title}
                        </h3>
                      </div>
                      {content.quizCompleted && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {content.quizCompleted ? "Completed" : "Not started"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}