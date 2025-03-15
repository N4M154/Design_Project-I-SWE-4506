import { jsPDF } from "jspdf";
import {
  BookOpen,
  ChevronLeft,
  Download,
  ExternalLink,
  GraduationCap,
  Play,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SideButtons from "../components/SideButtons";

export default function CControl() {
  const location = useLocation();
  const navigate = useNavigate();
  const [completedQuizzes, setCompletedQuizzes] = useState(["control-structures"]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Define the learning content for the "C Control Structures" lesson
  const learningContent = {
    "control-structures": {
      title: "C Language Control Structures",
      intro:
        "Control structures in C are used to make decisions, repeat code, and more. In this lesson, you'll learn about the different types of control structures in C, including if-else, loops, and switch statements.",
      sections: [
        {
          title: "What Are Control Structures?",
          content: `Control structures are the blocks that manage the flow of control in a program. They allow you to perform tasks based on conditions (if-else) or repeat tasks (loops). Common types include:

• Conditional statements (if, if-else, switch)
• Looping statements (for, while, do-while)
• Jump statements (break, continue, return)`,
        },
        {
          title: "If-Else Statement",
          content: `The if-else statement allows you to make decisions based on conditions.

Syntax:

\`\`\`
if (condition) {
    // Code to execute if the condition is true
} else {
    // Code to execute if the condition is false
}
\`\`\`
Example:

\`\`\`
int age = 20;
if (age >= 18) {
    printf("Adult");
} else {
    printf("Minor");
}
\`\`\``,
        },
        {
          title: "Switch Statement",
          content: `The switch statement allows you to select one of many code blocks to be executed.

Syntax:

\`\`\`
switch (variable) {
    case value1:
        // Code to execute if variable == value1
        break;
    case value2:
        // Code to execute if variable == value2
        break;
    default:
        // Code to execute if none of the cases match
}
\`\`\`
Example:

\`\`\`
int day = 2;
switch (day) {
    case 1:
        printf("Sunday");
        break;
    case 2:
        printf("Monday");
        break;
    default:
        printf("Invalid day");
}
\`\`\``,
        },
        {
          title: "Loops in C",
          content: `Loops are used to repeat a block of code multiple times.

• For Loop: Used when the number of iterations is known.
• While Loop: Used when the number of iterations is not known but a condition is true.
• Do-While Loop: Similar to while, but executes at least once.

Example of a for loop:

\`\`\`
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
\`\`\``,
        },
      ],
      practice: [
        "Write a program to check whether a number is even or odd using an if-else statement.",
        "Create a switch-case statement to display the name of a day based on a number (1 for Sunday, 2 for Monday, etc.).",
        "Use a for loop to print numbers from 1 to 10.",
      ],
    },
  };

  // Fetch related videos and articles
  useEffect(() => {
    setRelatedVideos([
      {
        id: "1",
        title: "C Control Structures Explained",
        thumbnail:
          "data:image/jpeg;base64,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",
        duration: "14:30",
        url: "https://www.youtube.com/watch?v=YiPoFeWrSYY&pp=ygUTYyBjb250cm9sIHN0cnVjdHVyZQ%3D%3D",  // BroCode video link
        author: "Simplilearn",
      },
      
    ]);

    setRelatedArticles([
      {
        id: "1",
        title: "Understanding C Control Structures",
        source: "GeeksForGeeks",
        url: "#",
        readTime: "7 min",
      },
      {
        id: "2",
        title: "A Beginner's Guide to C Control Structures",
        source: "TutorialsPoint",
        url: "#",
        readTime: "8 min",
      },
    ]);
  }, []);

  // Get the current lesson based on the path
  const lessonId = location.pathname.split("/").pop();
  const lesson = learningContent[lessonId];

  const handleQuizCompletion = () => {
    navigate(`/courses/c/${lessonId}/quiz`);
  };

  const downloadPDF = () => {
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
  };

  const handleMarkAsRead = () => {
    const user = JSON.parse(localStorage.getItem("persist:root"));
    const currentUser = user ? JSON.parse(user.user).currentUser : null;
    const userId = currentUser ? currentUser._id : null;

    if (userId) {
      // Update progress by making a POST request to mark the lesson as read
      fetch("http://localhost:3000/api/progress/mark-as-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, lessonId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.progress) {
            console.log("Progress updated:", data.progress);
            // You can update local progress state here if needed
          }
        })
        .catch((error) => {
          console.error("Error updating progress:", error);
        });
    }
  };

  if (!lesson) {
    return <div className="text-center p-8">Lesson not found.</div>;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="min-h-screen bg-white dark:bg-[#18181b]">
          <div className="bg-yellow-50 dark:bg-black border-b border-yellow-100 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link
                to="/courses/c"
                className="flex items-center text-yellow-600 hover:text-yellow-700 dark:text-yellow-300 dark:hover:text-yellow-500 transition-colors"
              >
                <ChevronLeft className="mr-2" />
                Back to Course
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={handleQuizCompletion}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
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
                <button
                  onClick={handleMarkAsRead}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  Mark as Read
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Lesson Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-transparent rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-200/20 p-8">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    {lesson.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {lesson.intro}
                  </p>

                  {lesson.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-yellow-100 mb-4">
                        {section.title}
                      </h2>
                      {section.content && (
                        <div className="text-gray-600 dark:text-white whitespace-pre-line mb-4">
                          {section.content}
                        </div>
                      )}
                    </div>
                  ))}

                  {lesson.practice && (
                    <div className="bg-yellow-50 dark:bg-yellow-200/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Practice Exercises
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
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
                <div className="bg-white dark:bg-yellow-200/20 rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-800/40 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Play size={20} className="text-yellow-600" />
                    Related Videos
                  </h3>
                  <div className="space-y-4">
                    {relatedVideos.map((video) => (
                      <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                      >
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
                        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-300 mt-2 group-hover:text-yellow-600">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {video.author}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white dark:bg-yellow-200/20 rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-800/40 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-yellow-600" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        className="block p-4 rounded-lg hover:bg-yellow-50 dark:hover:bg-black/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-300">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
